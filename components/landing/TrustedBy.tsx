const metrics = [
  { value: "5", label: "Processing stages shown while PDFs index" },
  { value: "1", label: "Workspace per signed-in account" },
  { value: "0", label: "Duplicate citations in answers" },
];

export function TrustedBy() {
  return (
    <section className="border-y border-white/70 bg-white/40 backdrop-blur-xl" aria-label="Trusted by">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-[1.25rem] border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur-xl">
            <p className="text-3xl font-extrabold text-slate-950">{metric.value}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
