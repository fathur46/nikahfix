"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MediaFrame from "./MediaFrame";
import { weddingConfig } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function TopNav({ guestName }: { guestName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 pb-3.5 pt-[calc(0.875rem+var(--inset-top))] transition-colors duration-300 ${
        scrolled ? "bg-black/95 shadow-lg shadow-black/50" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <motion.span
        layoutId="brand-logo"
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-2xl leading-none tracking-wide text-nk-red"
      >
        {weddingConfig.brand}
      </motion.span>
      <div className="flex items-center gap-3">
        <div className="flex overflow-hidden rounded border border-white/25 text-[11px] font-semibold">
          {(["en", "id"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-2 py-1 transition-colors ${lang === l ? "bg-white text-black" : "text-white/70"}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={t("profileMenu")}
        aria-expanded={menuOpen}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/15 active:scale-95 transition-transform"
      >
        <MediaFrame
          src="/images/profile.jpg"
          alt={guestName}
          label={guestName.charAt(0).toUpperCase()}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
      </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 -z-10 cursor-default"
          />
          <div className="absolute right-4 top-full w-52 rounded-lg border border-white/10 bg-nk-panel p-3 shadow-xl shadow-black/60">
            <p className="text-[10px] uppercase tracking-[0.2em] text-nk-mist">{t("watchingAs")}</p>
            <p className="mb-3 truncate font-display text-xl text-white">{guestName}</p>
            {/* Reload the personalized /to/<name> URL: back to the profile screen with the name kept (also stops trailer audio). */}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded bg-nk-red py-2 text-sm font-bold text-white active:scale-[0.98] transition-transform"
            >
              {t("logout")}
            </button>
          </div>
        </>
      )}
    </header>
  );
}
