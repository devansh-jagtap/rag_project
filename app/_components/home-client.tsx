"use client";

import Questions from "../components/questions";
import { ChatSidebar } from "./chat-sidebar";
import { DocumentsSidebar } from "./documents-sidebar";
import { LandingPage } from "./landing-page";
import { LoadingWorkspace } from "./loading-workspace";
import { MobileDocuments } from "./mobile-documents";
import { ToastList } from "./toast-list";
import { WorkspaceHeader } from "./workspace-header";
import { usePdfWorkspace } from "../_hooks/use-pdf-workspace";

export default function HomeClient() {
  const workspace = usePdfWorkspace();

  if (!workspace.isLoaded) {
    return <LoadingWorkspace />;
  }

  if (!workspace.isSignedIn) {
    return <LandingPage />;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#111111] text-zinc-100 md:flex-row">
      <ChatSidebar
        chatId={workspace.chatId}
        chats={workspace.chats}
        onChatSelect={workspace.setChatId}
        onCreateChat={() => void workspace.createChat()}
        onDeleteChat={(chatId) => void workspace.deleteChat(chatId)}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <WorkspaceHeader
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

        <section className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden xl:grid-cols-[minmax(0,1fr)_340px]">
          <Questions
            chatId={workspace.chatId}
            documentsCount={workspace.documents.length}
            onChatsRefresh={workspace.refreshChats}
          />

          <DocumentsSidebar
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
