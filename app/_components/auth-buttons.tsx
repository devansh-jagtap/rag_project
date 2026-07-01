"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

type AuthButtonsProps = {
  placement: "header" | "hero" | "empty";
};

export function AuthButtons({ placement }: AuthButtonsProps) {
  if (placement === "hero") {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        <SignUpButton mode="modal">
          <button className="flex h-11 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500">
            Create account
            <ArrowRight size={17} />
          </button>
        </SignUpButton>
        <SignInButton mode="modal">
          <button className="h-11 rounded-md border border-zinc-700 bg-zinc-900 px-5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white">
            Sign in
          </button>
        </SignInButton>
      </div>
    );
  }

  const containerClass =
    placement === "header"
      ? "flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 p-1"
      : "mt-6 flex justify-center gap-3";

  return (
    <div className={containerClass}>
      <SignInButton mode="modal">
        <button className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="rounded-md bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}
