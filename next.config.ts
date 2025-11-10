import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https", // El protocolo de tu URL (http o https)
        hostname: "pub-6a5cb6d849a44154bf47b48930e9e9ff.r2.dev",
        port: "", // Dejalo vacío si no usás un puerto específico
        pathname: "**", // Permite cualquier path dentro de ese bucket (ej. /dev/**)
      },
      {
        protocol: "https",
        hostname: "d16v4wpqyuresn.cloudfront.net", // El nuevo dominio
        port: "",
        pathname: "**", // Permitimos cualquier path dentro de ese CDN
      },
    ],
    // o, si preferís corto:
    // domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
