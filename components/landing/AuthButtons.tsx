"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type AuthButtonsProps = {
  placement: "nav" | "hero" | "cta";
};

export function AuthButtons({ placement }: AuthButtonsProps) {
  const { isLoaded, isSignedIn } = useUser();
  const containerClass =
    placement === "nav"
      ? "flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 p-1"
      : placement === "hero"
        ? "mt-8 flex flex-wrap gap-3"
        : "mt-7 flex flex-wrap justify-center gap-3";

  if (!isLoaded) {
    return <div className={containerClass} />;
  }

  if (isSignedIn) {
    return (
      <div className={containerClass}>
        <Link
          href="/dashboard"
          className={
            placement === "hero"
              ? "flex h-11 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
              : "rounded-md bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white"
          }
        >
          Open dashboard
          {placement === "hero" && <ArrowRight size={17} />}
        </Link>
        <div className="flex h-10 items-center rounded-md border border-zinc-800 bg-zinc-950 px-2">
          <UserButton />
        </div>
      </div>
    );
  }

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
