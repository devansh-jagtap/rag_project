import Image from "next/image";
import {
  FileText,
  LockKeyhole,
  MessageSquarePlus,
  Search,
} from "lucide-react";

export function ProductPreview() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-[#151515] p-3 shadow-2xl shadow-black/30">
      <div className="grid overflow-hidden rounded-lg border border-zinc-800 bg-[#111111] md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-zinc-800 bg-[#171717] p-3 md:block">
          <div className="mb-4 flex h-9 items-center gap-2 rounded-md bg-zinc-100 px-3 text-sm font-semibold text-zinc-950">
            <MessageSquarePlus size={16} />
            New Chat
          </div>
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Chats
          </p>
          <div className="space-y-1">
            <div className="rounded-md bg-zinc-800 px-3 py-2 text-sm text-white">
              Benefits summary
            </div>
            <div className="rounded-md px-3 py-2 text-sm text-zinc-500">
              Contract review
            </div>
            <div className="rounded-md px-3 py-2 text-sm text-zinc-500">
              Research notes
            </div>
          </div>
        </aside>

        <div className="flex min-h-[440px] flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 p-5">
            <div>
              <p className="text-xs text-zinc-500">Preview</p>
              <h2 className="mt-1 text-xl font-semibold text-zinc-50">
                Chat with your PDFs
              </h2>
            </div>
            <div className="hidden items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-500 sm:flex">
              <Search size={14} />
              2 PDFs indexed
            </div>
          </div>

          <div className="flex-1 space-y-4 p-5">
            <div className="max-w-[78%] rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300">
              Summarize the policy changes and cite the source.
            </div>
            <div className="ml-auto max-w-[86%] rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm leading-6 text-zinc-200">
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

          <div className="border-t border-zinc-800 p-4">
            <div className="flex h-12 items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-500">
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
    <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
      <FileText size={15} className="mb-2 text-blue-300" />
      {title}
    </div>
  );
}

function PreviewDocument({ title, status }: { title: string; status: string }) {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
      <Image
        src="/file.svg"
        alt=""
        width={24}
        height={24}
        className="mb-3 opacity-80 invert"
      />
      <p className="truncate text-xs font-medium text-zinc-200">{title}</p>
      <p className="mt-1 text-xs text-zinc-500">{status}</p>
    </div>
  );
}
