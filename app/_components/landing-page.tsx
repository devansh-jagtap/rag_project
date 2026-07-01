import {
  FileText,
  LockKeyhole,
  MessagesSquare,
  PanelLeft,
  Search,
} from "lucide-react";
import { AuthButtons } from "./auth-buttons";
import { LandingPreview } from "./landing-preview";

const featureTiles = [
  {
    label: "PDF upload",
    icon: FileText,
    className: "text-blue-300",
  },
  {
    label: "Source search",
    icon: Search,
    className: "text-emerald-300",
  },
  {
    label: "Saved chats",
    icon: MessagesSquare,
    className: "text-violet-300",
  },
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#101010] text-zinc-100">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-blue-300">
            <PanelLeft size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              PDF Workspace
            </p>
            <p className="text-xs text-zinc-500">Private RAG for your docs</p>
          </div>
        </div>

        <AuthButtons placement="header" />
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-7xl items-center gap-10 px-6 pb-12 pt-4 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-400">
            <LockKeyhole size={14} className="text-blue-300" />
            Sign in required before uploads, chats, and retrieval
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Chat with your PDFs in a private workspace.
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-400">
            Upload documents, search across sources, and keep every chat saved
            to your account. The product unlocks after sign-in, so your PDFs,
            messages, and citations stay tied to your session.
          </p>

          <AuthButtons placement="hero" />

          <div className="mt-8 grid gap-3 text-sm text-zinc-400 sm:grid-cols-3">
            {featureTiles.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.label}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
                >
                  <Icon size={18} className={`mb-3 ${feature.className}`} />
                  {feature.label}
                </div>
              );
            })}
          </div>
        </div>

        <LandingPreview />
      </section>
    </main>
  );
}
