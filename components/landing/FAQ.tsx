import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    question: "Does this change the existing RAG pipeline?",
    answer:
      "No. The landing and dashboard structure is separated from embeddings, Pinecone retrieval, prompts, and query rewriting.",
  },
  {
    question: "Is the dashboard protected?",
    answer:
      "Yes. The dashboard route and API routes stay behind Clerk middleware while the marketing page remains public.",
  },
  {
    question: "Can this support billing later?",
    answer:
      "Yes. The route and component structure leaves clean places for pricing, usage limits, Stripe, teams, and workspaces.",
  },
  {
    question: "What happens before uploading PDFs?",
    answer:
      "The chat stays hidden and the dashboard shows a centered empty state prompting the user to upload a first PDF.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-y border-white/70 bg-white/35 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Clear product expectations"
          body="The public page explains how the app works before users enter the authenticated workspace."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-3">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.5rem] border border-white/80 bg-white/65 p-6 shadow-sm backdrop-blur-xl"
            >
              <h3 className="font-extrabold text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
