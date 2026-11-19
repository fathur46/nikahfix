"use client";

import { useCountdown } from "@/lib/hooks";
import { weddingConfig } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function Countdown() {
  const { t } = useI18n();
  const { days, hours, minutes, seconds, isLive } = useCountdown(weddingConfig.weddingDateISO);

  if (isLive) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-nk-red/40 bg-nk-red/15 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-nk-red animate-pulseRed" />
        <span className="font-display text-lg tracking-widest text-nk-red">{t("nowStreaming")}</span>
      </div>
    );
  }

  const units = [
    { v: days, l: t("days") },
    { v: hours, l: t("hours") },
    { v: minutes, l: t("min") },
    { v: seconds, l: t("sec") },
  ];

  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-nk-red">{t("comingSoon")}</p>
      <div className="grid grid-cols-4 gap-2">
        {units.map((u) => (
          <div key={u.l} className="flex flex-col items-center rounded-md bg-nk-panel py-3">
            <span className="font-display text-2xl text-white tabular-nums">{String(u.v).padStart(2, "0")}</span>
            <span className="text-[10px] uppercase tracking-wider text-nk-mist">{u.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
