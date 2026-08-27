/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Google Places API (New) key, restricted by HTTP referrer to this site's
  // domains — used client-side to refresh the homepage rating live.
  // Optional: the badge silently keeps the static fallback when unset.
  readonly PUBLIC_GOOGLE_PLACES_API_KEY?: string;
  readonly PUBLIC_GOOGLE_PLACE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
