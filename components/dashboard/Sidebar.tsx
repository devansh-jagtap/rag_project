"use client";

import { MessageSquarePlus, PanelLeft, Trash2 } from "lucide-react";
import type { Chat } from "@/types/workspace";

type ChatSidebarProps = {
  chatId: string;
  chats: Chat[];
  onChatSelect: (chatId: string) => void;
  onCreateChat: () => void;
  onDeleteChat: (chatId: string) => void;
};

export function Sidebar({
  chatId,
  chats,
  onChatSelect,
  onCreateChat,
  onDeleteChat,
}: ChatSidebarProps) {
  return (
    <aside className="flex max-h-72 w-full shrink-0 flex-col border-b border-white/70 bg-white/55 shadow-xl shadow-slate-200/60 backdrop-blur-2xl md:max-h-none md:w-80 md:border-b-0 md:border-r">
      <div className="border-b border-white/70 p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <PanelLeft size={18} />
          PDF Workspace
        </div>

        <button
          onClick={onCreateChat}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-bold text-white shadow-lg shadow-slate-300/70 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <MessageSquarePlus size={18} />
          New Chat
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-2 text-xs font-extrabold uppercase text-slate-400">
          Chats
        </p>

        <div className="space-y-1">
          {chats.length === 0 ? (
            <p className="px-2 py-3 text-sm text-slate-500">
              Create a chat to begin.
            </p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`group flex cursor-pointer items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-sm transition ${
                  chat.id === chatId
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:bg-white/70 hover:text-slate-950"
                }`}
              >
                <span className="min-w-0 truncate">{chat.title}</span>

                <button
                  type="button"
                  title="Delete chat"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="rounded-xl p-1 text-slate-400 opacity-0 transition hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
