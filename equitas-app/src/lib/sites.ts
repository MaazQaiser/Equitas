/** Marketing site origin. Public pages and brand home live there; this app is the signed-in product. */
export const MARKETING_ORIGIN =
  (import.meta.env.VITE_MARKETING_ORIGIN as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:3003";

export function marketingUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${MARKETING_ORIGIN}${p}`;
}
