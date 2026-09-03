import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

/* ------------------------------------------------------------------ */
/*  Dictionaries — Arabic (original) and English (LTR mirror).         */
/* ------------------------------------------------------------------ */

const ar = {
  dir: "rtl" as const,
  brand: {
    name: "رُقي",
    tagline: "قصص مصوّرة باسم طفلك",
    taglineLong: "رُقي للأطفال — قصص مصوّرة باسم طفلك وصورته",
  },
  langToggleLabel: "التبديل إلى الإنجليزية",
  nav: {
    stories: "الحكايات",
    steps: "الخطوات",
    sizes: "المقاسات",
    packages: "الباقات",
    testimonials: "تجارب العملاء",
  },
  navLabel: "التنقل الرئيسي",
  headerCta: "✦ اصنع قصة طفلك",
  menu: { open: "فتح القائمة", close: "إغلاق القائمة", label: "قائمة الجوال" },
  cart: {
    buttonLabel: "فتح سلة المشتريات",
    emptyBadge: "فارغة",
    title: "سلة المشتريات",
    empty: "لا توجد منتجات بعد",
    drawerLabel: "سلة المشتريات",
    close: "إغلاق السلة",
    emptyTitle: "سلتك فارغة",
    emptyBody: "أضف باقة موفّرة وامنح طفلك ذكرى لا تُنسى.",
    explore: "استكشف الباقات",
    remove: "حذف",
    fromCart: "من السلة",
    decrease: "إنقاص الكمية",
    increase: "زيادة الكمية",
    subtotal: "المجموع الفرعي",
    savings: "إجمالي التوفير",
    shipping: "الشحن",
    free: "مجاني",
    checkout: "إتمام الطلب",
    checkoutNote: "سيتم تحويلك إلى المتجر لإكمال الدفع.",
    checkoutOpened: "تم فتح المتجر لإكمال الدفع",
    added: (title: string) => `أُضيفت «${title}» إلى السلة`,
    increased: (title: string) => `تمت زيادة كمية «${title}»`,
    removed: (title: string) => `أُزيلت «${title}» من السلة`,
    count: (n: number) => {
      if (n === 1) return "منتج واحد";
      if (n === 2) return "منتجان";
      if (n <= 10) return `${arNum(n)} منتجات`;
      return `${arNum(n)} منتجًا`;
    },
  },
  hero: {
    pill: "هدية لن تكون مثل أي هدية",
    h1a: "تخيّل فرحة طفلك عندما يفتح الكتاب ويكتشف…",
    h1b: "أنه هو بطل القصة!",
    body: "ليست مجرد كتاب أطفال. نحوّل اسمه وصورته إلى مغامرة مصوّرة صُنعت خصيصًا له، ليقرأ عن نفسه ويشاهد شخصيته داخل عالم يحبه.",
    checklist: [
      "اسمه داخل الحكاية",
      "شخصية مستوحاة من ملامحه",
      "أحداث ومغامرات حقيقية",
      "شحن مجاني للقصة الواحدة",
    ],
    cta1: "✦ اصنع قصة طفلك الآن",
    cta2: "شاهد كيف نصنعها",
    covers: [
      "غلاف قصة الأميرة الشجاعة",
      "غلاف قصة القبطان الصغير",
      "غلاف قصة رحلة الديناصورات",
      "غلاف قصة رحلة إلى مدينة الأحلام",
    ],
    trust: [
      { title: "توصيل حتى بابك", sub: "داخل السعودية 7-8 أيام" },
      { title: "طباعة فاخرة", sub: "مناسبة للإهداء" },
      { title: "بملامحه", sub: "شخصية مستوحاة منه" },
      { title: "ذكرى تدوم", sub: "هدية مختلفة لطفلك" },
    ],
  },
  steps: {
    pill: "● من الصورة إلى القصة",
    title: "4 خطوات… وطفلك يصبح البطل",
    sub: "أنت ترسل التفاصيل الأساسية، ونحن نصنع باقي المغامرة.",
    items: [
      { title: "اختر قصة طفلك", body: "اختر المغامرة والمقاس المناسبين لعمر طفلك واهتماماته." },
      { title: "أرسل الاسم والصورة", body: "صورة وجه واحدة واضحة تكفي لنصمم شخصية مستوحاة من ملامحه." },
      { title: "تأكيد الطلب ودفع العربون", body: "لأنها قصة مخصصة لطفلك وحده، يبدأ التنفيذ بعد التأكيد." },
      { title: "نصنع قصته وتصلك", body: "نكتب الأحداث ونطبع القصة ونشحنها إلى بابك خلال 7-8 أيام." },
    ],
  },
  stories: {
    pill: "● حكاياتنا",
    title: "اختر المغامرة التي يحبها طفلك",
    sub: "كل قصة تُرسم من جديد لطفلك — باسمه، وبوجهه، وبعالمه.",
    price: "تبدأ من ٦٥ ر.س",
    details: "التفاصيل",
    coverOf: "غلاف قصة",
    all: "شاهد كل الحكايات",
    items: [
      { title: "الأميرة الشجاعة", sub: "مغامرة في قصر الورود", tags: ["شجاعة", "ثقة بالنفس"], alt: "غلاف قصة الأميرة الشجاعة" },
      { title: "القبطان الصغير", sub: "رحلة بحرية إلى جزيرة الفنار", tags: ["مغامرة", "بحر"], alt: "غلاف قصة القبطان الصغير" },
      { title: "رحلة الديناصورات", sub: "استكشاف الوادي المفقود", tags: ["مغامرة", "استكشاف"], alt: "غلاف قصة رحلة الديناصورات" },
      { title: "رحلة إلى مدينة الأحلام", sub: "ليلة الفوانيس المضيئة", tags: ["خيال", "قبل النوم"], alt: "غلاف قصة رحلة إلى مدينة الأحلام" },
      { title: "الفنانة الصغيرة", sub: "لوحة القصر السحري", tags: ["إبداع", "فنون"], alt: "غلاف قصة الفنانة الصغيرة" },
      { title: "الأميرة الجميلة", sub: "حديقة القصر والتاج الذهبي", tags: ["كلاسيكية", "أميرات"], alt: "غلاف قصة الأميرة الجميلة" },
    ],
  },
  why: {
    pill: "● أكثر من مجرد كتاب",
    title: "ليه طفلك هيحب قصته؟",
    sub: "لأن أكثر بطل يريد الطفل معرفة ماذا سيحدث له… هو نفسه.",
    items: [
      { title: "يشوف نفسه بطلًا", body: "اسمه وشخصيته داخل الأحداث تجعل المغامرة أقرب له." },
      { title: "يتحمس للقراءة", body: "كل صفحة تجعله ينتظر ما سيحدث له في الصفحة التالية." },
      { title: "هدية لها معنى", body: "ذكرى شخصية من طفولته يحتفظ بها لسنوات." },
    ],
  },
  sizes: {
    pill: "● اختر الحجم المناسب",
    title: "متاحة بمقاسي A4 و A5",
    sub: "نفس القصة ونفس الجودة، الفرق في الحجم وتجربة المشاهدة.",
    note: "الشحن مجاني عند طلب قصة واحدة · القصة بالإنجليزية أو أي لغة أجنبية +5 ريال.",
    items: [
      { title: "الحجم الصغير", price: "٦٥ ر.س", note: "خفيف وعملي وسهل للطفل.", cta: "اختر قصة بمقاس A5" },
      { title: "الحجم الكبير", price: "١٠٠ ر.س", note: "صور أكبر وتجربة أكثر فخامة.", cta: "اختر قصة بمقاس A4" },
    ],
    specs: [
      { title: "الداخلي", sub: "كوشيه 150 جرام" },
      { title: "الغلاف", sub: "كوشيه 300 جرام" },
      { title: "مقاومة للماء", sub: "عملية أكثر مع الأطفال" },
      { title: "20 صفحة", sub: "قصة مصورة كاملة" },
    ],
  },
  testimonials: {
    pill: "● تجارب العملاء",
    title: "أجمل رد فعل؟ «ده أنا!»",
    sub: "تجارب أهالٍ عاش أطفالهم لحظة اكتشاف أنهم أبطال القصة.",
    rating: "تقييم 5 من 5",
    items: [
      { quote: "أول ما شاف نفسه على الغلاف قال: «ده أنا!» وفضل يقلب الصفحات علشان يعرف هيعمل إيه في المغامرة.", name: "أم يوسف", initial: "ي" },
      { quote: "القصة مختلفة فعلًا، مش مجرد صور؛ فيها أحداث وحركة وتفاصيل خلّتها تتابع القصة للآخر.", name: "والدة ليان", initial: "ل" },
      { quote: "كانت هدية مختلفة جدًا، وأجمل حاجة كانت فرحته لما لقى اسمه وشخصيته جوه القصة.", name: "ماما آدم", initial: "آ" },
    ],
  },
  packages: {
    pill: "● باقات رُقي الموفّرة",
    title: "اختر الباقة الأنسب ووفّر أكثر",
    sub: "ثلاث قصص مخصصة يمكن تنفيذها لنفس الطفل أو لأطفال مختلفين.",
    save: "وفّر",
    riyal: "ريال",
    items: [
      { badge: "الأوفر للحجم الصغير", title: "باقة 3 قصص صغيرة", desc: "مقاس A5 · 3 قصص مختلفة", features: ["3 قصص مختلفة", "لنفس الطفل أو أطفال مختلفين", "مقاس A5"], cta: "أضف الباقة إلى السلة — ١٣٠ ر.س" },
      { badge: "الأكثر طلبًا", title: "باقة 3 قصص كبيرة", desc: "مقاس A4 · 3 قصص مختلفة", features: ["3 قصص مختلفة", "لنفس الطفل أو أطفال مختلفين", "مقاس A4"], cta: "أضف الباقة إلى السلة — ٢٠٠ ر.س" },
    ],
  },
  final: {
    kicker: "✦ الآن جاء دور طفلك",
    title: "جاهز تخلي طفلك بطل قصته؟",
    body: "اختر الحكاية والمقاس المناسب، أضفها إلى السلة، وأكمل طلبك في أقل من 3 دقائق.",
    cta: "ابدأ قصة طفلك",
  },
  footer: {
    navLabel: "روابط سفلية",
    rights: "جميع الحقوق محفوظة.",
    love: "قصص مخصصة تُصنع بحب، صفحة بصفحة.",
  },
  backToTop: "العودة إلى الأعلى",
};

function arNum(n: number) {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

const en = {
  dir: "ltr" as const,
  brand: {
    name: "Ruqi",
    tagline: "Picture books starring your child",
    taglineLong: "Ruqi for Kids — illustrated stories starring your child's name and face",
  },
  langToggleLabel: "Switch to Arabic",
  nav: {
    stories: "Stories",
    steps: "How It Works",
    sizes: "Sizes",
    packages: "Bundles",
    testimonials: "Reviews",
  },
  navLabel: "Main navigation",
  headerCta: "✦ Create your child's story",
  menu: { open: "Open menu", close: "Close menu", label: "Mobile menu" },
  cart: {
    buttonLabel: "Open shopping cart",
    emptyBadge: "empty",
    title: "Shopping Cart",
    empty: "No products yet",
    drawerLabel: "Shopping cart",
    close: "Close cart",
    emptyTitle: "Your cart is empty",
    emptyBody: "Add a saving bundle and give your child an unforgettable keepsake.",
    explore: "Explore bundles",
    remove: "Remove",
    fromCart: "from cart",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    subtotal: "Subtotal",
    savings: "Total savings",
    shipping: "Shipping",
    free: "Free",
    checkout: "Complete order",
    checkoutNote: "You will be redirected to the shop to complete payment.",
    checkoutOpened: "The shop was opened to complete payment",
    added: (title: string) => `“${title}” added to cart`,
    increased: (title: string) => `Increased quantity of “${title}”`,
    removed: (title: string) => `“${title}” removed from cart`,
    count: (n: number) => (n === 1 ? "1 item" : `${n} items`),
  },
  hero: {
    pill: "A gift like no other",
    h1a: "Imagine your child's joy when they open the book and discover…",
    h1b: "they're the hero of the story!",
    body: "It's not just a children's book. We turn their name and photo into an illustrated adventure made just for them — reading about themselves, watching their own character in a world they love.",
    checklist: [
      "Their name inside the story",
      "A character inspired by their features",
      "Real events and adventures",
      "Free shipping for a single story",
    ],
    cta1: "✦ Create your child's story now",
    cta2: "See how we make it",
    covers: [
      "Cover of The Brave Princess story",
      "Cover of The Little Captain story",
      "Cover of The Dinosaur Journey story",
      "Cover of Journey to Dream City story",
    ],
    trust: [
      { title: "Delivery to your door", sub: "Within Saudi Arabia in 7-8 days" },
      { title: "Premium printing", sub: "Perfect for gifting" },
      { title: "With their features", sub: "A character inspired by them" },
      { title: "A keepsake that lasts", sub: "A different gift for your child" },
    ],
  },
  steps: {
    pill: "● From photo to story",
    title: "4 steps… and your child becomes the hero",
    sub: "You send us the essential details, and we craft the rest of the adventure.",
    items: [
      { title: "Pick your child's story", body: "Choose the adventure and size that suit your child's age and interests." },
      { title: "Send the name and photo", body: "One clear face photo is enough for us to design a character inspired by their features." },
      { title: "Confirm the order and pay the deposit", body: "Because it's a story custom-made just for your child, production starts after confirmation." },
      { title: "We craft it and it reaches you", body: "We write the events, print the story, and ship it to your door within 7-8 days." },
    ],
  },
  stories: {
    pill: "● Our stories",
    title: "Choose the adventure your child will love",
    sub: "Every story is drawn fresh for your child — with their name, their face, and their world.",
    price: "Starting at SAR 65",
    details: "Details",
    coverOf: "Cover of",
    all: "View all stories",
    items: [
      { title: "The Brave Princess", sub: "An adventure in the Rose Palace", tags: ["Courage", "Confidence"], alt: "Cover of The Brave Princess story" },
      { title: "The Little Captain", sub: "A sea voyage to Lighthouse Island", tags: ["Adventure", "Sea"], alt: "Cover of The Little Captain story" },
      { title: "The Dinosaur Journey", sub: "Exploring the Lost Valley", tags: ["Adventure", "Discovery"], alt: "Cover of The Dinosaur Journey story" },
      { title: "Journey to Dream City", sub: "The Night of the Glowing Lanterns", tags: ["Imagination", "Bedtime"], alt: "Cover of Journey to Dream City story" },
      { title: "The Little Artist", sub: "The Enchanted Palace Painting", tags: ["Creativity", "Arts"], alt: "Cover of The Little Artist story" },
      { title: "The Beautiful Princess", sub: "The Palace Garden and the Golden Crown", tags: ["Classic", "Princesses"], alt: "Cover of The Beautiful Princess story" },
    ],
  },
  why: {
    pill: "● More than just a book",
    title: "Why will your child love their story?",
    sub: "Because the hero every child wants to know what happens to… is themselves.",
    items: [
      { title: "They see themselves as the hero", body: "Their name and character inside the events bring the adventure closer to them." },
      { title: "They get excited to read", body: "Every page makes them eager to find out what happens to them next." },
      { title: "A gift with meaning", body: "A personal childhood keepsake they will keep for years." },
    ],
  },
  sizes: {
    pill: "● Choose the right size",
    title: "Available in A4 and A5",
    sub: "Same story, same quality — the difference is the size and the viewing experience.",
    note: "Shipping is free when ordering one story · Stories in English or any foreign language are +5 SAR.",
    items: [
      { title: "The Small Size", price: "SAR 65", note: "Light, practical, and easy for a child.", cta: "Choose an A5 story" },
      { title: "The Large Size", price: "SAR 100", note: "Bigger pictures and a more luxurious experience.", cta: "Choose an A4 story" },
    ],
    specs: [
      { title: "Interior", sub: "150g coated paper" },
      { title: "Cover", sub: "300g coated paper" },
      { title: "Water resistant", sub: "More practical with kids" },
      { title: "20 pages", sub: "A full illustrated story" },
    ],
  },
  testimonials: {
    pill: "● Customer experiences",
    title: "The best reaction? “That's me!”",
    sub: "Experiences of parents whose children lived the moment of discovering they were the heroes of the story.",
    rating: "Rated 5 out of 5",
    items: [
      { quote: "The moment he saw himself on the cover, he said, “That's me!” and kept flipping the pages to find out what he would do in the adventure.", name: "Yousef's Mom", initial: "Y" },
      { quote: "The story is truly different, not just pictures; it has events, motion, and details that made her follow the story to the very end.", name: "Layan's Mom", initial: "L" },
      { quote: "It was a very different gift, and the best part was his joy when he found his name and character inside the story.", name: "Adam's Mom", initial: "A" },
    ],
  },
  packages: {
    pill: "● Ruqi's saving bundles",
    title: "Pick the right bundle and save more",
    sub: "Three custom stories that can be made for the same child or for different children.",
    save: "Save",
    riyal: "SAR",
    items: [
      { badge: "Best value for the small size", title: "Bundle of 3 Small Stories", desc: "A5 size · 3 different stories", features: ["3 different stories", "For the same child or different children", "A5 size"], cta: "Add bundle to cart — SAR 130" },
      { badge: "Most popular", title: "Bundle of 3 Large Stories", desc: "A4 size · 3 different stories", features: ["3 different stories", "For the same child or different children", "A4 size"], cta: "Add bundle to cart — SAR 200" },
    ],
  },
  final: {
    kicker: "✦ Now it's your child's turn",
    title: "Ready to make your child the hero of their story?",
    body: "Choose the story and size, add it to the cart, and complete your order in under 3 minutes.",
    cta: "Start your child's story",
  },
  footer: {
    navLabel: "Footer links",
    rights: "All rights reserved.",
    love: "Custom stories made with love, page by page.",
  },
  backToTop: "Back to top",
};

export type Dict = Omit<typeof ar, "dir"> & { dir: "rtl" | "ltr" };
export const LOCALES: Record<Lang, Dict> = { ar, en };

/* ------------------------------------------------------------------ */
/*  Provider                                                            */
/* ------------------------------------------------------------------ */

const LANG_KEY = "ruqi-lang-v1";
const I18nCtx = createContext<{
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (l: Lang) => void;
} | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  return "ar";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = LOCALES[lang].dir;
    root.setAttribute("data-lang", lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const value = useMemo(
    () => ({ lang, dir: LOCALES[lang].dir, t: LOCALES[lang], setLang }),
    [lang, setLang]
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within LangProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Locale-aware number & currency helpers                              */
/* ------------------------------------------------------------------ */

export function localNum(n: number, lang: Lang) {
  return lang === "ar" ? arNum(n) : String(n);
}

export function formatSAR(n: number, lang: Lang) {
  return lang === "ar" ? `${arNum(n)} ر.س` : `SAR ${n}`;
}
