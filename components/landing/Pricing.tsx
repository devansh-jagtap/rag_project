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
            className="rounded-lg border border-zinc-800 bg-[#151515] p-6"
          >
            <h3 className="text-xl font-semibold text-zinc-50">{plan.name}</h3>
            <p className="mt-4 text-3xl font-semibold text-zinc-50">
              {plan.price}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{plan.body}</p>

            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex gap-3 text-sm text-zinc-300">
                  <CheckCircle2 size={17} className="text-emerald-300" />
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
