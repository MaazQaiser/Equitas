import type { NextConfig } from "next";

const PRODUCT = "/product";

const MODULE_ROUTES: Record<string, string> = {
  "funding-discovery": "/dashboard/discovery",
  "regulatory-compliance": "/dashboard/compliance",
  "pre-award-review": "/dashboard/pre-award",
  "k-award-suite": "/dashboard/k-award",
  "trainee-gra-tools": "/dashboard/trainee",
  "international-research": "/dashboard/international",
  "study-section-simulator": "/dashboard/study-section",
  "resubmission-strategy": "/dashboard/resubmission",
  "post-award-management": "/dashboard/post-award",
  "subaward-invoicing": "/dashboard/subaward",
  "budget-finance": "/dashboard/budget",
  "institutional-intelligence": "/dashboard/institutional",
};

const moduleRedirects = Object.entries(MODULE_ROUTES).map(([slug, dest]) => ({
  source: "/app/tool",
  has: [{ type: "query" as const, key: "module", value: slug }],
  destination: `${PRODUCT}${dest}`,
  permanent: false,
}));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/researchers/trainees", destination: "/researchers", permanent: false },
      { source: "/researchers/investigators", destination: "/researchers", permanent: false },
      {
        source: "/resources/glossary",
        destination: "/resources/how-grant-review-works#glossary",
        permanent: false,
      },
      {
        source: "/learn",
        destination: "/resources/how-grant-review-works",
        permanent: false,
      },
      { source: "/resources", destination: "/resources/guides", permanent: false },
      {
        source: "/resources/guides/how-grant-review-works",
        destination: "/resources/how-grant-review-works",
        permanent: false,
      },
      { source: "/contact", destination: "/about#contact", permanent: false },
      { source: "/about/reviewer", destination: "/about#credibility", permanent: false },
      { source: "/institutions/leaders", destination: "/institutions/what-leaders-see", permanent: false },
      { source: "/see-how-it-works", destination: "/how-it-works", permanent: false },
      { source: "/app/admin", destination: "/app/seats", permanent: false },
      { source: "/app/pipeline", destination: "/app/chair", permanent: false },
      { source: "/pricing/paywall", destination: "/pricing/upgrade", permanent: false },
      { source: "/legal", destination: "/legal/privacy", permanent: false },

      // Legacy entry paths stay on this host and open the product app.
      { source: "/signin", destination: `${PRODUCT}/sign-in`, permanent: false },
      { source: "/signin/:path*", destination: `${PRODUCT}/sign-in`, permanent: false },
      { source: "/signup", destination: `${PRODUCT}/sign-up`, permanent: false },
      { source: "/onboarding", destination: `${PRODUCT}/sign-up`, permanent: false },
      { source: "/onboarding/:path*", destination: `${PRODUCT}/sign-up`, permanent: false },
      ...moduleRedirects,
      { source: "/app/tool", destination: `${PRODUCT}/tools`, permanent: false },
      { source: "/app", destination: `${PRODUCT}/dashboard`, permanent: false },
      { source: "/app/:path*", destination: `${PRODUCT}/dashboard`, permanent: false },
    ];
  },
  async rewrites() {
    // In dev, Next proxies /product to the Vite server so sign-in stays on this origin.
    // In production, the Vite build is static files under public/product.
    if (process.env.NODE_ENV === "development") {
      const vite = (process.env.EQUITAS_APP_DEV_ORIGIN || "http://127.0.0.1:5173").replace(/\/$/, "");
      return {
        beforeFiles: [
          { source: "/product", destination: `${vite}/product/` },
          { source: "/product/:path*", destination: `${vite}/product/:path*` },
        ],
      };
    }
    return [
      { source: "/product", destination: "/product/index.html" },
      { source: "/product/:path*", destination: "/product/index.html" },
    ];
  },
};

export default nextConfig;
