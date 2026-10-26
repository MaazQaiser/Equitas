/**
 * Public pages live on the same host as this app.
 * A path like `/pricing` stays on the current origin, so Vercel and local
 * both work without a localhost URL.
 */
export function marketingUrl(path = "/") {
  return path.startsWith("/") ? path : `/${path}`;
}

/** Absolute URL for a product route, including the /product base. */
export function productAbsolute(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${window.location.origin}${base}${p}`;
}
