import { LockKeyhole, SearchCheck } from "lucide-react";
import { AuthButtons } from "./AuthButtons";
import { ProductPreview } from "./ProductPreview";

export function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-400">
          <LockKeyhole size={14} className="text-blue-300" />
          Sign in required before uploads, chats, and retrieval
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          Turn every PDF into a searchable private workspace.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
          Upload documents, ask precise questions, and keep every chat tied to
          the source files that produced the answer.
        </p>

        <AuthButtons placement="hero" />

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-400">
          <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
            <SearchCheck size={16} className="text-emerald-300" />
            Source-backed answers
          </span>
          <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
            <LockKeyhole size={16} className="text-amber-300" />
            Account-scoped workspace
          </span>
        </div>
      </div>

      <ProductPreview />
    </section>
  );
}
