import { FileText } from "lucide-react";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Security", href: "#security" },
  { label: "Use cases", href: "#use-cases" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-blue-300">
            <FileText size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-50">
              PDF Workspace
            </p>
            <p className="text-xs text-zinc-500">
              Private document chat for source-backed answers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-zinc-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
