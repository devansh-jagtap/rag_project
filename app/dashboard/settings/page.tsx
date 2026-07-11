import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 text-slate-950">
      <section className="w-full max-w-2xl rounded-[1.5rem] border border-white/80 bg-white/65 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
        <Settings size={24} className="text-blue-600" />
        <h1 className="mt-5 text-2xl font-extrabold">Settings</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Theme, usage, billing, and account controls can live here as the SaaS
          layer grows.
        </p>
      </section>
    </main>
  );
}
