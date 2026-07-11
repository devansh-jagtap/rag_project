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
    tone: "text-blue-600",
  },
  {
    title: "Retrieval-first answers",
    body: "Questions search the active chat documents before producing a concise answer.",
    icon: Search,
    tone: "text-emerald-600",
  },
  {
    title: "Saved conversations",
    body: "Chats, messages, documents, and generated titles stay organized in the sidebar.",
    icon: History,
    tone: "text-violet-600",
  },
  {
    title: "Readable citations",
    body: "Sources are deduplicated so each answer lists the useful PDFs without repeated noise.",
    icon: MessageSquareText,
    tone: "text-amber-600",
  },
  {
    title: "Private access gate",
    body: "Uploads, chats, and retrieval stay behind Clerk sign-in before the workspace opens.",
    icon: ShieldCheck,
    tone: "text-rose-600",
  },
  {
    title: "Polished chat UX",
    body: "Loading steps, markdown answers, source cards, and keyboard sending make repeated work smooth.",
    icon: Sparkles,
    tone: "text-cyan-600",
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
              className="rounded-[1.5rem] border border-white/80 bg-white/60 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
            >
              <div className={`mb-5 flex size-12 items-center justify-center rounded-2xl border border-white/80 bg-white/80 shadow-sm ${feature.tone}`}>
                <Icon size={21} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
