import { FileText } from "lucide-react";
import { AuthButtons } from "./AuthButtons";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-lg border border-zinc-800 bg-[#151515] px-6 py-14 text-center sm:px-10">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-blue-300">
          <FileText size={24} />
        </div>
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Start a workspace before your next PDF review.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">
          Sign in, create a chat, upload your files, and ask questions with the
          original documents close at hand.
        </p>
        <AuthButtons placement="cta" />
      </div>
    </section>
  );
}
