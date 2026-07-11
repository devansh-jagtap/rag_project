import { CTA } from "@/components/landing/CTA";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen text-slate-950">
      <Navbar />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
