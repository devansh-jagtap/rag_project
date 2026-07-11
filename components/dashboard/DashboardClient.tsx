"use client";

import ChatWindow from "./ChatWindow";
import { Sidebar } from "./Sidebar";
import { DocumentPanel } from "./DocumentPanel";
import { LoadingWorkspace } from "./LoadingWorkspace";
import { MobileDocuments } from "./MobileDocuments";
import { ToastList } from "./ToastList";
import { TopBar } from "./TopBar";
import { useDashboardWorkspace } from "@/hooks/use-dashboard-workspace";

export default function DashboardClient() {
  const workspace = useDashboardWorkspace();

  if (!workspace.isLoaded) {
    return <LoadingWorkspace />;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden text-slate-950 md:flex-row">
      <Sidebar
        chatId={workspace.chatId}
        chats={workspace.chats}
        onChatSelect={workspace.setChatId}
        onCreateChat={() => void workspace.createChat()}
        onDeleteChat={(chatId) => void workspace.deleteChat(chatId)}
      />

      <main className="flex min-w-0 flex-1 flex-col bg-white/35 backdrop-blur-xl">
        <TopBar
          activeChatTitle={workspace.activeChat?.title}
          file={workspace.file}
          fileInputRef={workspace.fileInputRef}
          isUploading={workspace.isUploading}
          onFileChange={workspace.handleFileChange}
          onUpload={() => void workspace.uploadDocument()}
          uploadStatus={workspace.uploadStatus}
        />

        <MobileDocuments
          documents={workspace.documents}
          onDeleteDocument={(docId) => void workspace.deleteDocument(docId)}
        />

        <section className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden xl:grid-cols-[minmax(0,1fr)_360px]">
          <ChatWindow
            chatId={workspace.chatId}
            documentsCount={workspace.documents.length}
            onChatsRefresh={workspace.refreshChats}
          />

          <DocumentPanel
            documents={workspace.documents}
            onDeleteDocument={(docId) => void workspace.deleteDocument(docId)}
          />
        </section>
      </main>

      <ToastList
        toasts={workspace.toasts}
        onDismiss={workspace.dismissToast}
      />
    </div>
  );
}
