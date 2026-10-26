/**
 * The public site and the product app ship as one host.
 * Auth and the signed-in product live under /product.
 * Do not prefix these with localhost. A relative path stays on whatever
 * host is serving the site, including Vercel.
 */
export const PRODUCT_BASE = "/product";

const ENTRY_PREFIXES = [PRODUCT_BASE, "/signin", "/signup", "/onboarding", "/app"];

/** True when a click must load a full document (the product app, or a legacy path that redirects into it). */
export function isProductEntry(href: string) {
  const path = href.split(/[?#]/)[0];
  return ENTRY_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function appUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${PRODUCT_BASE}${p}`;
}
