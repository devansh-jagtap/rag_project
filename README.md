# PDF Workspace (RAG)

A private Retrieval-Augmented Generation (RAG) workspace built with Next.js.

Upload PDFs, ask questions in chat, and get source-backed answers from the documents in the active chat.

## Features

- Clerk-authenticated workspace and protected API routes
- Multi-chat workflow with persisted chats/messages/documents
- PDF upload pipeline (extract text -> chunk -> embed -> store vectors)
- Retrieval-first answers scoped to the active chat’s documents
- Source cards for answer grounding
- Delete chats/documents with cleanup of associated records and vectors

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Prisma + PostgreSQL
- Pinecone (vector database)
- Google GenAI embeddings (`gemini-embedding-2`)
- AI SDK Gateway model for chat generation (`google/gemini-2.5-flash`)
- Clerk authentication

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL database
- Pinecone index (dimension 1024)
- Clerk project
- Google API key (for embeddings)

## Environment Variables

Create a `.env` file in the project root:

```bash
# Prisma / Postgres
DATABASE_URL="******HOST:PORT/DB?sslmode=require"

# Pinecone
PINECONE_API_KEY="your_pinecone_api_key"
PINECONE_INDEX_NAME="your_index_name"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Google GenAI (used by @google/genai)
GOOGLE_API_KEY="your_google_api_key"
```

## Getting Started

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Open http://localhost:3000.

## Useful Scripts

```bash
npm run dev      # start local dev server
npm run build    # production build
npm run start    # run production server
npm run lint     # lint codebase
```

## How the RAG Flow Works

1. Create a chat.
2. Upload a PDF in that chat.
3. Server extracts text, chunks it, creates embeddings, and stores vectors in Pinecone namespace `documents`.
4. Ask a question.
5. The API rewrites the query, retrieves relevant chunks, and generates a grounded response with sources.

## Project Structure (high level)

- `app/` - routes, pages, API handlers
- `components/` - dashboard and marketing UI
- `hooks/` - client workspace state and upload/chat logic
- `lib/` - shared clients and helpers (Prisma, Pinecone, model config)
- `prisma/` - schema and migrations

## Notes

- Prisma client is generated to `app/generated/prisma`.
- Most routes are protected by Clerk middleware (except configured public marketing/auth routes).
