import { FileText } from "lucide-react";
import { AuthButtons } from "./AuthButtons";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-blue-600 shadow-sm shadow-slate-200/80">
            <FileText size={20} />
          </span>
          <span>
            <span className="block text-sm font-extrabold text-slate-950">
              PDF Workspace
            </span>
            <span className="block text-xs text-slate-500">
              Private RAG for documents
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-500 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </div>

        <AuthButtons placement="nav" />
      </nav>
    </header>
  );
}
