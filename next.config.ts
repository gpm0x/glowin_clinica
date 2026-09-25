import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Há um package-lock.json na pasta acima; sem isto o Turbopack elege a pasta
  // errada como raiz do workspace e emite um aviso a cada build.
  turbopack: { root: __dirname },
  images: {
    // Next 16: `images.domains` is deprecated — use remotePatterns.
    // `search` is intentionally omitted: Unsplash serves via query strings.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
