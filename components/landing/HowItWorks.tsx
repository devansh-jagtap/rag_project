import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    number: "01",
    title: "Create a chat",
    body: "Start a focused workspace for a topic, client, paper, policy, or research bundle.",
  },
  {
    number: "02",
    title: "Upload PDFs",
    body: "Watch each processing stage as text is extracted and vectors are saved.",
  },
  {
    number: "03",
    title: "Ask with context",
    body: "The assistant searches only the current chat documents and returns source cards.",
  },
  {
    number: "04",
    title: "Keep or clean up",
    body: "Delete old chats or PDFs when a workspace is no longer needed.",
  },
];

export function HowItWorks() {
  return (
    <section id="workflow" className="border-y border-zinc-900 bg-[#141414]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Workflow"
          title="A simple loop for working through documents"
          body="The app is structured for repeated use: create a space, add files, ask questions, and return later with history intact."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-lg border border-zinc-800 bg-[#101010] p-5"
            >
              <p className="text-sm font-semibold text-blue-300">
                {step.number}
              </p>
              <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
