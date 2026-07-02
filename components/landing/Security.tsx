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

        <div className="rounded-lg border border-zinc-800 bg-[#151515] p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-amber-300">
              <LockKeyhole size={21} />
            </span>
            <div>
              <h3 className="font-semibold text-zinc-50">
                Workspace controls
              </h3>
              <p className="text-sm text-zinc-500">
                Uploads and retrieval are available after sign-in.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-md border border-zinc-800 bg-zinc-950 p-4"
              >
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-300" />
                <p className="text-sm leading-6 text-zinc-400">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
