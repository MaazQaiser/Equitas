/** Product app origin. Marketing stays on this Next host; auth and dashboard live on the app. */
export const APP_ORIGIN =
  process.env.NEXT_PUBLIC_APP_ORIGIN?.replace(/\/$/, "") || "http://localhost:5173";

export function appUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${APP_ORIGIN}${p}`;
}

export function isAppUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith(APP_ORIGIN);
}
