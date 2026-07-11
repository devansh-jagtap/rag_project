import { SectionHeading } from "./SectionHeading";

const testimonials = [
  {
    quote:
      "The workflow feels like a real research desk: upload, ask, verify sources, move on.",
    name: "Aarav Mehta",
    role: "Graduate researcher",
  },
  {
    quote:
      "Having chat history and document cards in one place makes contract review much less chaotic.",
    name: "Maya Rao",
    role: "Operations lead",
  },
  {
    quote:
      "The source cards are the difference. Answers are useful because the evidence is right there.",
    name: "Neil Kapoor",
    role: "Product consultant",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-white/70 bg-white/35 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Testimonials"
          title="Built around trust in the source"
          body="A production SaaS landing page should sell the real value: faster PDF review without losing the evidence behind each answer."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-[1.5rem] border border-white/80 bg-white/65 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl"
            >
              <p className="text-sm leading-7 text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-slate-200/80 pt-4">
                <p className="text-sm font-extrabold text-slate-950">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
