import type { NextConfig } from "next";

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
      { source: "/signup", destination: "/onboarding", permanent: false },
      { source: "/legal", destination: "/legal/privacy", permanent: false },
    ];
  },
};

export default nextConfig;
