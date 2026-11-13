"use client";

import { weddingConfig } from "@/lib/content";

const roles: { role: string; value: string; href?: string }[] = [
  { role: "Directed by", value: "Love" },
  { role: "Produced by", value: "Our Families" },
  { role: "Special Thanks to", value: "FTR", href: "https://iniftr.web.id" },
];

export default function Credits() {
  return (
    <section id="credits" className="w-full bg-black px-5 py-20 text-center">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-nk-red">{weddingConfig.tag}</p>
      <h2 className="mb-2 font-display text-3xl tracking-wide text-white">{weddingConfig.coupleTitle}</h2>
      <p className="mx-auto mb-10 max-w-xs text-sm italic text-nk-mist">
        A story about love, family, and forever.
      </p>

      <div className="mx-auto mb-10 flex max-w-xs flex-col gap-4">
        {roles.map((r) => (
          <div key={r.role}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{r.role}</p>
            {r.href ? (
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-display text-xl tracking-widest text-nk-red underline decoration-nk-red/40 underline-offset-4 transition-colors active:text-white"
              >
                {r.value} ↗
              </a>
            ) : (
              <p className="font-display text-lg text-white">{r.value}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mb-2 font-display text-4xl tracking-widest text-white/90">THE END</p>
      <p className="text-sm text-nk-mist">Thanks for watching. ❤️</p>
    </section>
  );
}
