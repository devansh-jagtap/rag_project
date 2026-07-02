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
    <section id="use-cases" className="border-y border-zinc-900 bg-[#151515]">
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
                className="rounded-lg border border-zinc-800 bg-[#101010] p-6"
              >
                <Icon size={24} className="text-blue-300" />
                <h3 className="mt-6 text-xl font-semibold text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
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
