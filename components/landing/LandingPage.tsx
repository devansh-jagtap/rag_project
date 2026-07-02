import { CTA } from "./CTA";
import { FAQ } from "./FAQ";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Navbar } from "./Navbar";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { TrustedBy } from "./TrustedBy";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#101010] text-zinc-100">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
