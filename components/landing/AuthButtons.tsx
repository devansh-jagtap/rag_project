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
      ? "flex items-center gap-2 rounded-full border border-white/80 bg-white/75 p-1 shadow-sm shadow-slate-200/70 backdrop-blur-xl"
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
              ? "flex h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white shadow-xl shadow-slate-300/60 transition hover:-translate-y-0.5 hover:bg-slate-800"
              : "rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
          }
        >
          Open dashboard
          {placement === "hero" && <ArrowRight size={17} />}
        </Link>
        <div className="flex h-10 items-center rounded-full border border-white/80 bg-white/80 px-2 shadow-sm">
          <UserButton />
        </div>
      </div>
    );
  }

  if (placement === "hero") {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        <SignUpButton mode="modal">
          <button className="flex h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white shadow-xl shadow-slate-300/60 transition hover:-translate-y-0.5 hover:bg-slate-800">
            Create account
            <ArrowRight size={17} />
          </button>
        </SignUpButton>
        <SignInButton mode="modal">
          <button className="h-12 rounded-full border border-white/80 bg-white/75 px-6 text-sm font-bold text-slate-700 shadow-sm shadow-slate-200/80 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950">
            Sign in
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <SignInButton mode="modal">
        <button className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-white hover:text-slate-950">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}
