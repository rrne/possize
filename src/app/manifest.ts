import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PosSize — Free Trading Calculators",
    short_name: "PosSize",
    description:
      "Free, no-signup trading calculators: position size, risk/reward, compound interest, profit/loss, pip and margin.",
    start_url: "/",
    display: "standalone",
    background_color: "#090e14",
    theme_color: "#090e14",
    categories: ["finance", "productivity", "utilities"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
