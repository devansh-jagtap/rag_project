import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SectionHeading } from "@/components/landing/SectionHeading";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-zinc-100">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeading
          eyebrow="About"
          title="A RAG product shaped into a SaaS"
          body="PDF Workspace keeps the working retrieval pipeline intact and wraps it in a clean product architecture for marketing, authentication, dashboard workflows, and future billing."
        />
      </section>
      <Footer />
    </main>
  );
}
