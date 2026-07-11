import { CheckCircle2 } from "lucide-react";
import { AuthButtons } from "./AuthButtons";
import { SectionHeading } from "./SectionHeading";

const plans = [
  {
    name: "Starter",
    price: "$0",
    body: "For trying the document workflow locally.",
    features: ["PDF uploads", "Chat history", "Source cards"],
  },
  {
    name: "Pro",
    price: "Soon",
    body: "Ready for usage limits, billing, and larger workspaces.",
    features: ["Everything in Starter", "Usage tracking", "Priority processing"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple now, ready for Stripe later"
        body="The structure leaves room for plans, usage limits, and workspace billing without changing the RAG core."
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="rounded-[1.5rem] border border-white/80 bg-white/65 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
          >
            <h3 className="text-xl font-extrabold text-slate-950">{plan.name}</h3>
            <p className="mt-4 text-3xl font-extrabold text-slate-950">
              {plan.price}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{plan.body}</p>

            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  {feature}
                </div>
              ))}
            </div>

            {plan.name === "Starter" && <AuthButtons placement="cta" />}
          </article>
        ))}
      </div>
    </section>
  );
}
