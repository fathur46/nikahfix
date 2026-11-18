"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Review } from "@/lib/content";

type Rsvp = { status: "yes" | "maybe" | "no"; name: string };

export default function GuestBook({
  name,
  onNameChange,
  rsvp,
  onRsvpRenamed,
}: {
  name: string;
  onNameChange: (name: string) => void;
  rsvp: Rsvp | null;
  onRsvpRenamed: (name: string) => void;
}) {
  const attendance = rsvp?.status ?? null;
  // Sourced entirely from data/guestbook.json (real guest submissions) — no
  // hardcoded placeholder messages.
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [posted, setPosted] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [needRsvp, setNeedRsvp] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const r = await fetch("/api/guestbook", { cache: "no-store" });
      const data = r.ok ? await r.json() : null;
      if (data) setReviews(data.reviews ?? []);
    } catch {
      // Keep whatever is already on screen.
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    if (!rsvp) {
      // Message stays in the box; send the guest to the RSVP form first.
      setNeedRsvp(true);
      setToast(true);
      document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);
    const finalName = name.trim() || rsvp.name;
    // RSVP follows the message name: rename the filed RSVP when the name was edited.
    if (finalName !== rsvp.name) {
      try {
        await fetch("/api/rsvp", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from: rsvp.name, to: finalName }),
        });
        onRsvpRenamed(finalName);
      } catch {
        // Offline: keep the old RSVP name; the message below still posts.
      }
    }
    const entry: Review = {
      name: finalName,
      message: message.trim(),
      rating,
      attendance: rsvp.status,
      submittedAt: new Date().toISOString(),
    };
    try {
      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      // Best-effort — the message still shows locally below.
    }
    setReviews((prev) => [entry, ...prev]);
    setMessage("");
    setSubmitting(false);
    setPosted(true);
  }

  return (
    <section id="reviews" className="w-full bg-black px-5 py-14">
      <h2 className="mb-1 font-display text-3xl tracking-wide text-white">What People Are Saying</h2>
      <p className="mb-6 text-sm text-nk-mist">Reviews from the people who know us best.</p>

      <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-nk-panel p-4">
        <label className="mb-1 block text-xs text-nk-mist" htmlFor="guestbook-name">
          Your name
        </label>
        <input
          id="guestbook-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={60}
          className="mb-3 w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-nk-red"
        />
        {!attendance && needRsvp && (
          <p className="mb-3 rounded bg-nk-red/15 px-3 py-2 text-xs text-white">
            Please confirm your RSVP first, then come back and post your message. Your text is saved here.
          </p>
        )}
        {attendance && (
          <p className="mb-3 text-xs text-nk-mist">
            This message will be noted with your RSVP: <AttendanceBadge status={attendance} />
          </p>
        )}
        <div className="mb-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} className="text-xl" aria-label={`${n} star`}>
              <span className={n <= rating ? "text-nk-red" : "text-white/20"}>★</span>
            </button>
          ))}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={280}
          rows={3}
          placeholder="Share your wishes..."
          className="mb-3 w-full resize-none rounded border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-nk-red"
        />
        <button
          type="submit"
          disabled={submitting || !message.trim()}
          className="w-full rounded bg-nk-red py-2.5 text-sm font-bold text-white disabled:opacity-30 active:scale-[0.98] transition-transform"
        >
          {submitting ? "Posting..." : "Post Message"}
        </button>
        {posted && <p className="mt-2 text-center text-xs text-nk-mist">Thanks for the review!</p>}
      </form>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Messages ({reviews.length})</p>
        <button
          type="button"
          onClick={load}
          disabled={refreshing}
          className="rounded bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 disabled:opacity-50 active:bg-white/20"
        >
          {refreshing ? "Loading..." : "↻ Refresh"}
        </button>
      </div>

      <div className="flex max-h-[80vh] flex-col gap-3 overflow-y-auto overscroll-contain">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-lg bg-nk-panel/60 p-4">
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">{r.name}</p>
                {r.attendance && <AttendanceBadge status={r.attendance} />}
              </div>
              <div className="flex flex-shrink-0 text-xs">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className={idx < r.rating ? "text-nk-red" : "text-white/20"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            {r.relation && <p className="mb-1 text-[11px] uppercase tracking-wider text-nk-mist">{r.relation}</p>}
            <p className="text-sm text-white/80">{r.message}</p>
            {r.submittedAt && (
              <p className="mt-2 text-[11px] text-white/40">
                {new Date(r.submittedAt).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 bottom-[calc(1.5rem+var(--inset-bottom))] z-[60] mx-auto flex max-w-sm items-start gap-3 rounded-md border-l-4 border-nk-red bg-[#181818] p-4 shadow-2xl shadow-black/80"
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-nk-red text-sm font-bold text-white">
              !
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Isi RSVP dulu</p>
              <p className="mt-0.5 text-xs text-nk-mist">
                Pesan bisa dikirim setelah konfirmasi kehadiran.
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setToast(false)}
              className="text-xl leading-none text-white/50 active:text-white"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function AttendanceBadge({ status }: { status: "yes" | "maybe" | "no" }) {
  const style =
    status === "yes"
      ? "bg-nk-red/20 text-nk-red"
      : status === "maybe"
        ? "bg-white/10 text-white/60"
        : "bg-white/5 text-white/40";
  const label = status === "yes" ? "Attending" : status === "maybe" ? "Maybe" : "Can't Attend";

  return (
    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${style}`}>
      {status === "yes" && "✓ "}
      {label}
    </span>
  );
}
