"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MediaFrame from "./MediaFrame";
import { weddingConfig } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function ProfileGate({
  initialName,
  onEnter,
}: {
  initialName?: string;
  onEnter: (name: string) => void;
}) {
  const { t, lang, setLang } = useI18n();
  const [stage, setStage] = useState<"name" | "select">(initialName ? "select" : "name");
  const [typedName, setTypedName] = useState("");

  const displayName = initialName || typedName || "Guest";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6">
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,rgba(229,9,20,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-nk-redDim/70 via-nk-redDim/15 to-transparent" />

      <div className="absolute right-4 top-[calc(1rem+var(--inset-top))] z-20 flex overflow-hidden rounded border border-white/20 text-xs font-semibold">
        {(["en", "id"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-white text-black" : "text-white/70"}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {stage === "name" ? (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 w-full max-w-xs text-center"
          >
            <h1 className="font-display text-3xl tracking-wide text-white mb-2">
              {t("whatsYourName")}
            </h1>
            <p className="text-sm text-nk-mist mb-6">{t("soWeKnow")}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (typedName.trim().length > 0) setStage("select");
              }}
              className="flex flex-col gap-3"
            >
              <input
                autoFocus
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder={t("yourNamePlaceholder")}
                maxLength={40}
                className="w-full rounded bg-nk-panel2 border border-white/10 px-4 py-3 text-center text-white placeholder-white/30 outline-none focus:border-nk-red transition-colors"
              />
              <button
                type="submit"
                disabled={typedName.trim().length === 0}
                className="w-full rounded bg-nk-red py-3 font-semibold tracking-wide text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
              >
                {t("continue")}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 flex flex-col items-center"
          >
            <h1 className="font-display text-3xl tracking-wide text-white mb-10">
              {t("whosWatching")}
            </h1>
            <button onClick={() => onEnter(displayName)} className="group flex flex-col items-center gap-2">
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ delay: 0.6, duration: 1.4, repeat: Infinity, repeatDelay: 0.6 }}
                className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50"
              >
                {t("clickHere")}
              </motion.span>
              <span className="h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-md ring-2 ring-transparent group-hover:ring-white group-active:ring-nk-red transition-all">
                <MediaFrame
                  src="/images/profile.jpg"
                  alt={displayName}
                  label={initials(displayName)}
                  priority
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </span>
              <span className="text-base sm:text-lg text-nk-mist group-hover:text-white transition-colors tracking-wide">
                {displayName}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-20 flex items-center gap-2 px-6 text-center text-xs text-white/60">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
        {t("volumeHint")}
      </p>
      <p className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-white/25">
        {weddingConfig.brand}
      </p>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
