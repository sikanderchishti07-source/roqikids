import { MotionConfig } from "framer-motion";
import { LangProvider } from "./lib/i18n";
import { CartProvider } from "./lib/cart";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Steps from "./components/Steps";
import Stories from "./components/Stories";
import Stats from "./components/Stats";
import WhyLove from "./components/WhyLove";
import Sizes from "./components/Sizes";
import Testimonials from "./components/Testimonials";
import Packages from "./components/Packages";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ScrollUI from "./components/ScrollUI";
import CartDrawer, { CartToasts } from "./components/CartDrawer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <CartProvider>
          <div id="top" className="relative flex min-h-screen flex-col">
            {/* layered ambient background */}
            <div className="page-ambient" aria-hidden="true" />
            <div className="page-noise" aria-hidden="true" />

            <Header />

            <main className="relative z-10 flex-1">
              <Hero />
              <Steps />
              <Stories />
              <Stats />
              <WhyLove />
              <Sizes />
              <Testimonials />
              <Packages />
              <FinalCTA />
            </main>

            <div className="relative z-10">
              <Footer />
            </div>

            <CartDrawer />
            <CartToasts />
            <ScrollUI />
          </div>
        </CartProvider>
      </LangProvider>
    </MotionConfig>
  );
}
