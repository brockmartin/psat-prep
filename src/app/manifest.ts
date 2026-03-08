import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PSAT Prep",
    short_name: "PSAT Prep",
    description: "Free PSAT 8/9 Math Prep",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
  }
}
