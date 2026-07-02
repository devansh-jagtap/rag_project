import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SectionHeading } from "@/components/landing/SectionHeading";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-zinc-100">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeading
          eyebrow="Contact"
          title="Ready for the next product layer"
          body="The project is now arranged so support, billing, teams, and workspace administration can be added without disturbing the core document pipeline."
        />
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
