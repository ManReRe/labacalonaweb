// Prefixes an internal, root-relative path with Astro's configured base
// (empty in production, "/labacalonaweb" on the GitHub Pages CI build — see
// astro.config.mjs). Use for every internal href/src so links keep working
// under a project-page subpath. External URLs are returned unchanged.
export function withBase(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
