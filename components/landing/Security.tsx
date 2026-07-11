import { CheckCircle2, LockKeyhole } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const points = [
  "Authentication protects API routes before data loads.",
  "Chats and documents are scoped by the active workspace.",
  "Delete actions remove stored documents and vector entries.",
  "Upload controls stay unavailable until a chat exists.",
];

export function LandingSecurity() {
  return (
    <section id="security" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <SectionHeading
          eyebrow="Security"
          title="A private workspace before the first upload"
          body="The signed-out page explains the product, while the actual chat, upload, document, and profile controls remain behind authentication."
        />

        <div className="rounded-[1.5rem] border border-white/80 bg-white/65 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl border border-white/80 bg-white/80 text-amber-600 shadow-sm">
              <LockKeyhole size={21} />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-950">
                Workspace controls
              </h3>
              <p className="text-sm text-slate-500">
                Uploads and retrieval are available after sign-in.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm"
              >
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                <p className="text-sm leading-6 text-slate-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
