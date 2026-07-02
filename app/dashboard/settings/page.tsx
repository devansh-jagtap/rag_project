import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111111] p-6 text-zinc-100">
      <section className="w-full max-w-2xl rounded-lg border border-zinc-800 bg-[#151515] p-6">
        <Settings size={24} className="text-blue-300" />
        <h1 className="mt-5 text-2xl font-semibold">Settings</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Theme, usage, billing, and account controls can live here as the SaaS
          layer grows.
        </p>
      </section>
    </main>
  );
}
