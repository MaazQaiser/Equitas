import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

// Playfair ships as a variable font, so the weight list does not change
// what is downloaded. Italic does: it is a second variable file, ~90KB,
// which is not a fair trade for one pull quote against the 3G budget.
// The quote is set roman rather than faux-italic. swap keeps text
// painted on a slow connection instead of blocking on the font.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// Geometric sans for the hero. Phonic (the face on the reference) is a
// paid family, so Outfit at weight 300 is the stand-in: light, tight,
// and the same role. The wordmark stays Playfair.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EQUITAS Intelligence — Every Researcher Deserves the Infrastructure",
  description:
    "EQUITAS teaches researchers how their grant applications will actually be reviewed and scored, so they can strengthen them before submitting. Calibrated by an active NIH study section reviewer.",
};

// Phase 0 fix (PLAN.md §11): the live site sets maximum-scale=1, which
// fails AA. This viewport intentionally omits maximumScale so pinch-zoom
// stays available.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#F2EEE5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
