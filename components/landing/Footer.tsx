import { FileText } from "lucide-react";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/80 bg-white/80 text-blue-600 shadow-sm">
            <FileText size={20} />
          </span>
          <div>
            <p className="text-sm font-extrabold text-slate-950">
              PDF Workspace
            </p>
            <p className="text-xs text-slate-500">
              Private document chat for source-backed answers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
