const metrics = [
  { value: "5", label: "Processing stages shown while PDFs index" },
  { value: "1", label: "Workspace per signed-in account" },
  { value: "0", label: "Duplicate citations in answers" },
];

export function TrustedBy() {
  return (
    <section className="border-y border-zinc-900 bg-[#151515]" aria-label="Trusted by">
      <div className="mx-auto grid max-w-7xl gap-px px-6 py-8 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="py-4 sm:px-8">
            <p className="text-3xl font-semibold text-zinc-50">{metric.value}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
