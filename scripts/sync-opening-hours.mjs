#!/usr/bin/env node
// Pulls the current opening hours from the Google Business Profile listing
// (via the Places API New) and, if they differ from what's checked into
// src/data/opening-hours.json, overwrites that file. Run on a schedule by
// .github/workflows/sync-opening-hours.yml — never called from the site
// itself (server-side only, uses a key that must NOT carry the PUBLIC_
// prefix so it never ships to the browser).
//
// Google Business Profile is always the source of truth here (client's
// explicit call, 2026-08-30), including when it reports different hours on
// different days — La Bacalona genuinely does open earlier some days than
// others. Days sharing identical hours are grouped together, both for the
// JSON-LD (an array of OpeningHoursSpecification, one per group — see
// Layout.astro) and for the human-readable display string.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DATA_PATH = fileURLToPath(new URL('../src/data/opening-hours.json', import.meta.url));
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEK_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_LABEL = {
  es: {
    Monday: 'lunes',
    Tuesday: 'martes',
    Wednesday: 'miércoles',
    Thursday: 'jueves',
    Friday: 'viernes',
    Saturday: 'sábado',
    Sunday: 'domingo',
  },
  en: {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
  },
};

function setOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) writeFileSync(outputFile, `${name}=${value}\n`, { flag: 'a' });
}

function format24(hour, minute) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function format12(time) {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour < 12 ? 'AM' : 'PM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:${String(minute).padStart(2, '0')} ${period}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ['Monday', 'Friday', 'Saturday'] -> 'lunes, viernes y sábado' (es) / 'Monday, Friday and Saturday' (en)
function joinDayNames(days, locale) {
  const names = days.map((day) => DAY_LABEL[locale][day]);
  const and = locale === 'es' ? 'y' : 'and';
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} ${and} ${names[names.length - 1]}`;
}

function buildDisplay(groups, locale) {
  if (groups.length === 1 && groups[0].days.length === 7) {
    const { opens, closes } = groups[0];
    return locale === 'es'
      ? `Todos los días, ${opens} – ${closes}`
      : `Every day, ${format12(opens)} – ${format12(closes)}`;
  }
  // One line per group — a single long sentence wraps badly in narrow
  // columns (footer, contact page sidebar), especially with 3+ groups.
  return groups
    .map((group) => {
      const dayList = capitalize(joinDayNames(group.days, locale));
      const hours =
        locale === 'es'
          ? `${group.opens} – ${group.closes}`
          : `${format12(group.opens)} – ${format12(group.closes)}`;
      return `${dayList}: ${hours}`;
    })
    .join('\n');
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

  // One entry per day the place opens: { Monday: { opens: '12:00', closes: '00:00' }, ... }.
  const byDay = new Map();
  for (const period of periods) {
    if (!period.open || !period.close) continue;
    byDay.set(DAY_NAMES[period.open.day], {
      opens: format24(period.open.hour, period.open.minute),
      closes: format24(period.close.hour, period.close.minute),
    });
  }

  if (byDay.size === 0) {
    console.log('regularOpeningHours.periods had no usable open/close pairs — skipping sync.');
    setOutput('changed', 'false');
    return;
  }

  // Group consecutive-or-not days that share identical hours, in week order.
  const groups = [];
  const groupBySignature = new Map();
  for (const day of WEEK_ORDER) {
    const hours = byDay.get(day);
    if (!hours) continue; // Not open that day — simply omitted from the JSON-LD.
    const signature = `${hours.opens}-${hours.closes}`;
    let group = groupBySignature.get(signature);
    if (!group) {
      group = { days: [], opens: hours.opens, closes: hours.closes };
      groupBySignature.set(signature, group);
      groups.push(group);
    }
    group.days.push(day);
  }

  const next = {
    groups,
    display: {
      es: buildDisplay(groups, 'es'),
      en: buildDisplay(groups, 'en'),
    },
  };

  const current = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));

  if (JSON.stringify(current) === JSON.stringify(next)) {
    console.log('Opening hours unchanged.');
    setOutput('changed', 'false');
    return;
  }

  writeFileSync(DATA_PATH, `${JSON.stringify(next, null, 2)}\n`);
  console.log('Opening hours updated:', JSON.stringify(next, null, 2));
  setOutput('changed', 'true');
}

main().catch((err) => {
  console.error(err);
  setOutput('changed', 'false');
  process.exit(1);
});
