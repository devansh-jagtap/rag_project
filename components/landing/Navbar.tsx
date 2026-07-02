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
    <header className="sticky top-0 z-40 border-b border-zinc-900/80 bg-[#101010]/90 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-blue-300">
            <FileText size={20} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-zinc-50">
              PDF Workspace
            </span>
            <span className="block text-xs text-zinc-500">
              Private RAG for documents
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-zinc-400 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-zinc-100"
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
