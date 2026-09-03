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

export const heroChecklist = [
  "اسمه داخل الحكاية",
  "شخصية مستوحاة من ملامحه",
  "أحداث ومغامرات حقيقية",
  "شحن مجاني للقصة الواحدة",
];

export const trustItems = [
  { icon: "truck", title: "توصيل حتى بابك", sub: "داخل السعودية 7-8 أيام" },
  { icon: "sparkles", title: "طباعة فاخرة", sub: "مناسبة للإهداء" },
  { icon: "heart", title: "بملامحه", sub: "شخصية مستوحاة منه" },
  { icon: "star", title: "ذكرى تدوم", sub: "هدية مختلفة لطفلك" },
] as const;

export const steps = [
  {
    num: "01",
    title: "اختر قصة طفلك",
    body: "اختر المغامرة والمقاس المناسبين لعمر طفلك واهتماماته.",
  },
  {
    num: "02",
    title: "أرسل الاسم والصورة",
    body: "صورة وجه واحدة واضحة تكفي لنصمم شخصية مستوحاة من ملامحه.",
  },
  {
    num: "03",
    title: "تأكيد الطلب ودفع العربون",
    body: "لأنها قصة مخصصة لطفلك وحده، يبدأ التنفيذ بعد التأكيد.",
  },
  {
    num: "04",
    title: "نصنع قصته وتصلك",
    body: "نكتب الأحداث ونطبع القصة ونشحنها إلى بابك خلال 7-8 أيام.",
  },
];

export const stories = [
  {
    title: "الأميرة الشجاعة",
    sub: "مغامرة في قصر الورود",
    tags: ["شجاعة", "ثقة بالنفس"],
    img: COVERS.braveAseel,
    alt: "غلاف قصة الأميرة الشجاعة",
    url: pageUrl("/stories/brave-princess"),
  },
  {
    title: "القبطان الصغير",
    sub: "رحلة بحرية إلى جزيرة الفنار",
    tags: ["مغامرة", "بحر"],
    img: COVERS.captainKarim,
    alt: "غلاف قصة القبطان الصغير",
    url: pageUrl("/stories/little-captain"),
  },
  {
    title: "رحلة الديناصورات",
    sub: "استكشاف الوادي المفقود",
    tags: ["مغامرة", "استكشاف"],
    img: COVERS.dinoJourney,
    alt: "غلاف قصة رحلة الديناصورات",
    url: pageUrl("/stories/dino-journey"),
  },
  {
    title: "رحلة إلى مدينة الأحلام",
    sub: "ليلة الفوانيس المضيئة",
    tags: ["خيال", "قبل النوم"],
    img: COVERS.dreamCity,
    alt: "غلاف قصة رحلة إلى مدينة الأحلام",
    url: pageUrl("/stories/dream-city"),
  },
  {
    title: "الفنانة الصغيرة",
    sub: "لوحة القصر السحري",
    tags: ["إبداع", "فنون"],
    img: COVERS.littleArtist,
    alt: "غلاف قصة الفنانة الصغيرة",
    url: pageUrl("/stories/little-artist"),
  },
  {
    title: "الأميرة الجميلة",
    sub: "حديقة القصر والتاج الذهبي",
    tags: ["كلاسيكية", "أميرات"],
    img: COVERS.princessNoura,
    alt: "غلاف قصة الأميرة الجميلة",
    url: pageUrl("/stories/princess-story"),
  },
];

export const whyItems = [
  {
    icon: "heart",
    title: "يشوف نفسه بطلًا",
    body: "اسمه وشخصيته داخل الأحداث تجعل المغامرة أقرب له.",
  },
  {
    icon: "book",
    title: "يتحمس للقراءة",
    body: "كل صفحة تجعله ينتظر ما سيحدث له في الصفحة التالية.",
  },
  {
    icon: "gift",
    title: "هدية لها معنى",
    body: "ذكرى شخصية من طفولته يحتفظ بها لسنوات.",
  },
] as const;

export const sizes = [
  {
    tag: "A5",
    price: "٦٥ ر.س",
    title: "الحجم الصغير",
    dims: "14.8 × 21 سم",
    note: "خفيف وعملي وسهل للطفل.",
    cta: "اختر قصة بمقاس A5",
  },
  {
    tag: "A4",
    price: "١٠٠ ر.س",
    title: "الحجم الكبير",
    dims: "21 × 29.7 سم",
    note: "صور أكبر وتجربة أكثر فخامة.",
    cta: "اختر قصة بمقاس A4",
  },
];

export const sizeNote =
  "الشحن مجاني عند طلب قصة واحدة · القصة بالإنجليزية أو أي لغة أجنبية +5 ريال.";

export const specs = [
  { icon: "book", title: "الداخلي", sub: "كوشيه 150 جرام" },
  { icon: "sparkles", title: "الغلاف", sub: "كوشيه 300 جرام" },
  { icon: "droplets", title: "مقاومة للماء", sub: "عملية أكثر مع الأطفال" },
  { icon: "palette", title: "20 صفحة", sub: "قصة مصورة كاملة" },
] as const;

export const testimonials = [
  {
    quote:
      "أول ما شاف نفسه على الغلاف قال: «ده أنا!» وفضل يقلب الصفحات علشان يعرف هيعمل إيه في المغامرة.",
    name: "أم يوسف",
  },
  {
    quote:
      "القصة مختلفة فعلًا، مش مجرد صور؛ فيها أحداث وحركة وتفاصيل خلّتها تتابع القصة للآخر.",
    name: "والدة ليان",
  },
  {
    quote:
      "كانت هدية مختلفة جدًا، وأجمل حاجة كانت فرحته لما لقى اسمه وشخصيته جوه القصة.",
    name: "ماما آدم",
  },
];

export const packages = [
  {
    badge: "الأوفر للحجم الصغير",
    title: "باقة 3 قصص صغيرة",
    price: "130",
    oldPrice: "195",
    save: "65",
    features: ["3 قصص مختلفة", "لنفس الطفل أو أطفال مختلفين", "مقاس A5"],
    cta: "أضف الباقة إلى السلة — ١٣٠ ر.س",
  },
  {
    badge: "الأكثر طلبًا",
    title: "باقة 3 قصص كبيرة",
    price: "200",
    oldPrice: "300",
    save: "100",
    features: ["3 قصص مختلفة", "لنفس الطفل أو أطفال مختلفين", "مقاس A4"],
    cta: "أضف الباقة إلى السلة — ٢٠٠ ر.س",
  },
];

export const navLinks = [
  { label: "الحكايات", href: "#stories" },
  { label: "الخطوات", href: "#steps" },
  { label: "المقاسات", href: "#sizes" },
  { label: "الباقات", href: "#packages" },
  { label: "تجارب العملاء", href: "#testimonials" },
];
