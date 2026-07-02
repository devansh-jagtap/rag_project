import {
  FileUp,
  History,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  {
    title: "PDF upload pipeline",
    body: "The interface shows upload, extraction, embedding, vector saving, and completion states clearly.",
    icon: FileUp,
    tone: "text-blue-300",
  },
  {
    title: "Retrieval-first answers",
    body: "Questions search the active chat documents before producing a concise answer.",
    icon: Search,
    tone: "text-emerald-300",
  },
  {
    title: "Saved conversations",
    body: "Chats, messages, documents, and generated titles stay organized in the sidebar.",
    icon: History,
    tone: "text-violet-300",
  },
  {
    title: "Readable citations",
    body: "Sources are deduplicated so each answer lists the useful PDFs without repeated noise.",
    icon: MessageSquareText,
    tone: "text-amber-300",
  },
  {
    title: "Private access gate",
    body: "Uploads, chats, and retrieval stay behind Clerk sign-in before the workspace opens.",
    icon: ShieldCheck,
    tone: "text-rose-300",
  },
  {
    title: "Polished chat UX",
    body: "Loading steps, markdown answers, source cards, and keyboard sending make repeated work smooth.",
    icon: Sparkles,
    tone: "text-cyan-300",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Features"
        title="Everything needed for document Q&A"
        body="The landing page now reflects the actual product surface: upload PDFs, build retrieval context, ask questions, and manage source-backed chats."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="rounded-lg border border-zinc-800 bg-[#151515] p-5"
            >
              <div className={`mb-5 flex size-11 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 ${feature.tone}`}>
                <Icon size={21} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-50">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {feature.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
