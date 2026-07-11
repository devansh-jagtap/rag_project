import Image from "next/image";
import {
  FileText,
  LockKeyhole,
  MessageSquarePlus,
  Search,
} from "lucide-react";

export function ProductPreview() {
  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/55 p-3 shadow-2xl shadow-slate-300/70 backdrop-blur-2xl">
      <div className="grid overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/70 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/70 bg-slate-50/55 p-3 md:block">
          <div className="mb-4 flex h-10 items-center gap-2 rounded-2xl bg-slate-950 px-3 text-sm font-bold text-white shadow-lg shadow-slate-300/70">
            <MessageSquarePlus size={16} />
            New Chat
          </div>
          <p className="mb-2 px-2 text-xs font-bold uppercase text-slate-400">
            Chats
          </p>
          <div className="space-y-1">
            <div className="rounded-2xl bg-white px-3 py-2 text-sm font-bold text-slate-950 shadow-sm">
              Benefits summary
            </div>
            <div className="rounded-2xl px-3 py-2 text-sm text-slate-500">
              Contract review
            </div>
            <div className="rounded-2xl px-3 py-2 text-sm text-slate-500">
              Research notes
            </div>
          </div>
        </aside>

        <div className="flex min-h-[440px] flex-col">
          <div className="flex items-center justify-between border-b border-white/70 p-5">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Preview</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                Chat with your PDFs
              </h2>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-2 text-xs font-bold text-slate-500 shadow-sm sm:flex">
              <Search size={14} />
              2 PDFs indexed
            </div>
          </div>

          <div className="flex-1 space-y-4 p-5">
            <div className="max-w-[78%] rounded-[1.25rem] border border-white/80 bg-white/80 p-4 text-sm text-slate-600 shadow-sm">
              Summarize the policy changes and cite the source.
            </div>
            <div className="ml-auto max-w-[86%] rounded-[1.25rem] border border-blue-200/70 bg-blue-600 p-4 text-sm leading-6 text-white shadow-xl shadow-blue-200/70">
              The updated policy changes the reimbursement window and adds a
              new approval step. Sources are shown once, with duplicate
              citations merged.
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <PreviewSource title="Policy.pdf" />
                <PreviewSource title="Handbook.pdf" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <PreviewDocument title="Policy.pdf" status="Ready" />
              <PreviewDocument title="Handbook.pdf" status="Ready" />
              <PreviewDocument title="Notes.pdf" status="Queued" />
            </div>
          </div>

          <div className="border-t border-white/70 p-4">
            <div className="flex h-12 items-center justify-between rounded-2xl border border-white/80 bg-white/80 px-4 text-sm font-semibold text-slate-500 shadow-sm">
              Sign in to upload a PDF and start chatting
              <LockKeyhole size={17} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewSource({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/30 bg-white/15 p-3 text-xs text-blue-50">
      <FileText size={15} className="mb-2 text-white" />
      {title}
    </div>
  );
}

function PreviewDocument({ title, status }: { title: string; status: string }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/80 p-3 shadow-sm">
      <Image
        src="/file.svg"
        alt=""
        width={24}
        height={24}
        className="mb-3 opacity-60"
      />
      <p className="truncate text-xs font-bold text-slate-800">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{status}</p>
    </div>
  );
}
