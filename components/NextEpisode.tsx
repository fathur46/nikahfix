"use client";

import { motion } from "framer-motion";
import Countdown from "./Countdown";
import { weddingConfig } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { googleCalendarUrl } from "@/lib/calendar";

type Event = typeof weddingConfig.reception;

function EventCard({ event }: { event: Event }) {
  const { t } = useI18n();
  return (
    <div className="rounded-lg bg-nk-panel p-4">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-nk-red">{event.label}</p>
      <p className="font-display text-2xl text-white">{event.date}</p>
      <p className="mb-3 text-sm text-nk-mist">
        {event.time} &middot; {event.venueName}
      </p>
      <p className="mb-4 text-xs text-white/60">{event.venueAddress}</p>
      <div className="flex gap-2">
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded bg-white/10 py-2 text-center text-xs font-semibold text-white active:scale-[0.97] transition-transform"
        >
          {t("openMaps")}
        </a>
        <a
          href={googleCalendarUrl(event, weddingConfig.coupleTitle)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded bg-nk-red py-2 text-center text-xs font-semibold text-white active:scale-[0.97] transition-transform"
        >
          {t("addToCalendar")}
        </a>
      </div>
    </div>
  );
}

export default function NextEpisode() {
  const { t, c } = useI18n();
  return (
    <section id="wedding" className="w-full bg-black px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-nk-red">{t("nextEpisode")}</p>
        <h2 className="mb-6 font-display text-3xl tracking-wide text-white">{t("theWedding")}</h2>

        <div className="mb-8">
          <Countdown />
        </div>

        <div className="flex flex-col gap-4">
          <EventCard event={c.reception} />
        </div>
      </motion.div>
    </section>
  );
}
