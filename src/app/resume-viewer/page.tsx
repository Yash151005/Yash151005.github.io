import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata = { title: "Résumé — Yash Pakale" };

export default function ResumePage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5 md:px-10">
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-paper">
          ← Yash Pakale
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Résumé</span>
        <a
          href={profile.resume}
          download="Yash_Pakale_Resume.pdf"
          className="bg-paper px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-signal"
        >
          Download
        </a>
      </header>
      <iframe src={profile.resume} title="Yash Pakale résumé" className="w-full flex-1 border-0 bg-ink-2" />
    </div>
  );
}
