import { LockKeyhole, SearchCheck } from "lucide-react";
import { AuthButtons } from "./AuthButtons";
import { ProductPreview } from "./ProductPreview";

export function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-bold text-slate-600 shadow-sm shadow-slate-200/70 backdrop-blur-xl">
          <LockKeyhole size={14} className="text-emerald-600" />
          Sign in required before uploads, chats, and retrieval
        </div>

        <h1 className="text-4xl font-extrabold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
          Turn every PDF into a searchable private workspace.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
          Upload documents, ask precise questions, and keep every chat tied to
          the source files that produced the answer.
        </p>

        <AuthButtons placement="hero" />

        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
            <SearchCheck size={16} className="text-blue-600" />
            Source-backed answers
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
            <LockKeyhole size={16} className="text-amber-600" />
            Account-scoped workspace
          </span>
        </div>
      </div>

      <ProductPreview />
    </section>
  );
}
