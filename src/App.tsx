import { MotionConfig } from "framer-motion";
import { LangProvider, useI18n } from "./lib/i18n";
import { CartProvider } from "./lib/cart";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Steps from "./components/Steps";
import BeforeAfter from "./components/BeforeAfter";
import Stories from "./components/Stories";
import WhyLove from "./components/WhyLove";
import Samples from "./components/Samples";
import Sizes from "./components/Sizes";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Packages from "./components/Packages";
import PaymentStrip from "./components/PaymentStrip";
import SiblingBuilder from "./components/SiblingBuilder";
import Occasions from "./components/Occasions";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ScrollUI from "./components/ScrollUI";
import StickyCTA from "./components/StickyCTA";
import WhatsAppButton from "./components/WhatsAppButton";
import CartDrawer, { CartToasts } from "./components/CartDrawer";

function Page() {
  const { lang, t } = useI18n();
  return (
    <div id="top" className="relative flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {t.skipLink}
      </a>

      {/* layered ambient background */}
      <div className="page-ambient" aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />

      <Header />

      <main id="main-content" key={lang} className="lang-fade relative z-10 flex-1">
        <Hero />
        <Ticker />
        <Steps />
        <BeforeAfter />
        <Stories />
        <WhyLove />
        <Samples />
        <Sizes />
        <Testimonials />
        <Stats />
        <Packages />
        <PaymentStrip />
        <SiblingBuilder />
        <Occasions />
        <FAQ />
        <FinalCTA />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <StickyCTA />
      <WhatsAppButton />
      <ScrollUI />
      <CartDrawer />
      <CartToasts />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          <Page />
        </CartProvider>
      </MotionConfig>
    </LangProvider>
  );
}
