import { BriefcaseBusiness, GraduationCap, ScrollText } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const useCases = [
  {
    title: "Research packets",
    body: "Compare papers, notes, reports, and supporting PDFs without losing source context.",
    icon: GraduationCap,
  },
  {
    title: "Policy review",
    body: "Summarize handbook changes, compliance documents, and operating procedures.",
    icon: ScrollText,
  },
  {
    title: "Client workspaces",
    body: "Keep contracts, discovery notes, proposals, and follow-up questions in one chat.",
    icon: BriefcaseBusiness,
  },
];

export function LandingUseCases() {
  return (
    <section id="use-cases" className="border-y border-white/70 bg-white/35 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Use cases"
          title="Built for documents that need careful answers"
          body="The product is quiet and focused: no marketing maze, just a structured place to ask useful questions of uploaded PDFs."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/80 bg-white/65 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl"
              >
                <Icon size={24} className="text-blue-600" />
                <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
