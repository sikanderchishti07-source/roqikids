/** Locale-independent  URLs, cover images, and numeric package data. */

export const SITE_URL = "https://ecom-renaissance.lovable.app";
export const pageUrl = (path: string) => `${SITE_URL}${path}`;

const asset = (id: string, name: string) =>
  `${SITE_URL}/__l5e/assets-v1/${id}/${name}`;

export const COVERS = {
  braveAseel: asset("fe40360b-6a62-4a2d-9ee7-58822444f932", "brave-aseel.jpg"),
  captainKarim: asset("b636f611-e3e0-4958-a768-124495cb539e", "captain-karim.jpg"),
  dinoJourney: asset("311b0245-4c25-4e55-b90e-1cf96ab4832b", "dino-journey.jpg"),
  dreamCity: asset("9b556dc5-4b12-4515-b646-398451d7ef97", "dream-city.jpg"),
  littleArtist: asset("990cd309-5901-4647-b43f-08855e23a8b3", "little-artist.jpg"),
  princessNoura: asset("4d38d85e-42b7-4692-86fb-0f000a9d9613", "princess-noura.jpg"),
};

export const heroCovers = [
  { src: COVERS.braveAseel, offset: true, eager: true },
  { src: COVERS.captainKarim, offset: false, eager: true },
  { src: COVERS.dinoJourney, offset: true, eager: false },
  { src: COVERS.dreamCity, offset: false, eager: false },
];

export const storyUrls = [
  pageUrl("/stories/brave-princess"),
  pageUrl("/stories/little-captain"),
  pageUrl("/stories/dino-journey"),
  pageUrl("/stories/dream-city"),
  pageUrl("/stories/little-artist"),
  pageUrl("/stories/princess-story"),
];

export const storyImgs = [
  COVERS.braveAseel,
  COVERS.captainKarim,
  COVERS.dinoJourney,
  COVERS.dreamCity,
  COVERS.littleArtist,
  COVERS.princessNoura,
];

export const stepNums = ["01", "02", "03", "04"];

export const sizeTags = ["A5", "A4"];
export const sizeDims = ["14.8 × 21 cm", "21 × 29.7 cm"];

export const specIconKeys = ["book", "sparkles", "droplets", "palette"];
export const trustIconKeys = ["truck", "sparkles", "heart", "star"];
export const whyIconKeys = ["heart", "book", "gift"];

export const packageData = [
  { id: "pkg-a5", price: 130, oldPrice: "195", save: 65, covers: [COVERS.braveAseel, COVERS.captainKarim, COVERS.dinoJourney] },
  { id: "pkg-a4", price: 200, oldPrice: "300", save: 100, covers: [COVERS.dreamCity, COVERS.littleArtist, COVERS.princessNoura] },
];

export const navHrefs = [
  { href: "#stories", key: "stories" },
  { href: "#steps", key: "steps" },
  { href: "#sizes", key: "sizes" },
  { href: "#packages", key: "packages" },
  { href: "#testimonials", key: "testimonials" },
] as const;
