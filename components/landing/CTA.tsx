import { FileText } from "lucide-react";
import { AuthButtons } from "./AuthButtons";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-[2rem] border border-white/80 bg-white/65 px-6 py-14 text-center shadow-2xl shadow-slate-200/70 backdrop-blur-2xl sm:px-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/80 bg-white/80 text-blue-600 shadow-sm">
          <FileText size={24} />
        </div>
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
          Start a workspace before your next PDF review.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          Sign in, create a chat, upload your files, and ask questions with the
          original documents close at hand.
        </p>
        <AuthButtons placement="cta" />
      </div>
    </section>
  );
}
