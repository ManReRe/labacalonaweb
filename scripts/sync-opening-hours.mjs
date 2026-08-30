#!/usr/bin/env node
// Pulls the current regular opening hours from the Google Business Profile
// listing (via the Places API New) and, if they differ from what's checked
// into src/data/opening-hours.json, overwrites that file. Run on a schedule
// by .github/workflows/sync-opening-hours.yml — never called from the site
// itself (server-side only, uses a key that must NOT carry the PUBLIC_
// prefix so it never ships to the browser).
//
// Scope: only handles the "same hours every day of the week" case, which is
// how La Bacalona actually operates (CLAUDE.md 5.1). If the listing ever
// reports different hours on different days, this script deliberately does
// nothing and logs why — src/data/opening-hours.json would then need a
// human to decide how to represent a non-uniform week, and the JSON-LD
// OpeningHoursSpecification in Layout.astro would need a second look too.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DATA_PATH = fileURLToPath(new URL('../src/data/opening-hours.json', import.meta.url));
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEK_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function setOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) writeFileSync(outputFile, `${name}=${value}\n`, { flag: 'a' });
}

function format24(hour, minute) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function format12(hour, minute) {
  const period = hour < 12 ? 'AM' : 'PM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:${String(minute).padStart(2, '0')} ${period}`;
}

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_SERVER_API_KEY;
  const placeId = process.env.PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.log('GOOGLE_PLACES_SERVER_API_KEY or PUBLIC_GOOGLE_PLACE_ID not set — skipping sync.');
    setOutput('changed', 'false');
    return;
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'regularOpeningHours',
    },
  });

  if (!res.ok) {
    console.error(`Places API request failed: ${res.status} ${await res.text()}`);
    setOutput('changed', 'false');
    return;
  }

  const data = await res.json();
  const periods = data.regularOpeningHours?.periods;

  if (!Array.isArray(periods) || periods.length === 0) {
    console.log('No regularOpeningHours.periods in the API response — skipping sync.');
    setOutput('changed', 'false');
    return;
  }

  // One entry per day the place opens: { day: 'Monday', opens: '12:30', closes: '00:30' }.
  const byDay = new Map();
  for (const period of periods) {
    if (!period.open || !period.close) continue;
    const dayName = DAY_NAMES[period.open.day];
    byDay.set(dayName, {
      opens: format24(period.open.hour, period.open.minute),
      closes: format24(period.close.hour, period.close.minute),
    });
  }

  const openDays = WEEK_ORDER.filter((day) => byDay.has(day));
  const signatures = new Set(openDays.map((day) => `${byDay.get(day).opens}-${byDay.get(day).closes}`));

  if (openDays.length !== 7 || signatures.size !== 1) {
    console.log(
      'Hours are not identical every day of the week — leaving src/data/opening-hours.json ' +
        'as-is. Update it by hand and see the comment in Layout.astro about ' +
        'OpeningHoursSpecification if this is a real, lasting change.'
    );
    console.log(Object.fromEntries(byDay));
    setOutput('changed', 'false');
    return;
  }

  const { opens, closes } = byDay.get('Monday');
  const [openHour, openMinute] = opens.split(':').map(Number);
  const [closeHour, closeMinute] = closes.split(':').map(Number);

  const next = {
    days: WEEK_ORDER,
    opens,
    closes,
    display: {
      es: `Todos los días, ${opens} – ${closes}`,
      en: `Every day, ${format12(openHour, openMinute)} – ${format12(closeHour, closeMinute)}`,
    },
  };

  const current = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));

  if (JSON.stringify(current) === JSON.stringify(next)) {
    console.log('Opening hours unchanged.');
    setOutput('changed', 'false');
    return;
  }

  writeFileSync(DATA_PATH, `${JSON.stringify(next, null, 2)}\n`);
  console.log('Opening hours updated:', next);
  setOutput('changed', 'true');
}

main().catch((err) => {
  console.error(err);
  setOutput('changed', 'false');
  process.exit(1);
});
