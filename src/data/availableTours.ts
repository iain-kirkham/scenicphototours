import type { ImageMetadata } from "astro";
import tourImage1 from "../assets/galleryImages/IMG_20250101_131337.jpg";
import tourImage2 from "../assets/galleryImages/IMG_20241226_145358.jpg";
import tourImage3 from "../assets/galleryImages/IMG_20240812_205239.jpg";
import tourImage4 from "../assets/galleryImages/IMG_20230709_132543.jpg";

export type AvailableTour = {
  title: string;
  subtitle: string;
  image: ImageMetadata;
  details: string;
  season: string;
};

export const availableTours: AvailableTour[] = [
  {
    title: "Iceland Winter Lights",
    subtitle: "Snowy landscapes, waterfalls, and aurora-filled nights.",
    image: tourImage1,
    details: "Reykjavik, Iceland",
    season: "Winter 2026",
  },
  {
    title: "Lofoten Coastline",
    subtitle: "Fjord views, fishing villages, and dramatic coastal light.",
    image: tourImage2,
    details: "Lofoten, Norway",
    season: "Spring 2026",
  },
  {
    title: "Patagonia Peaks",
    subtitle: "Mountain vistas, wide-open spaces, and changing weather.",
    image: tourImage3,
    details: "Patagonia, Chile",
    season: "Autumn 2026",
  },
  {
    title: "Namibia Desert Horizons",
    subtitle: "Golden dunes, stark textures, and unforgettable sunrise scenes.",
    image: tourImage4,
    details: "Namib Desert, Namibia",
    season: "Late 2026",
  },
];
