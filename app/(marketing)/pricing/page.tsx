import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-zinc-100">
      <Navbar />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
