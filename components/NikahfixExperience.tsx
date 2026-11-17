"use client";

import { useCallback, useEffect, useState } from "react";
import ProfileGate from "./ProfileGate";
import BrandIntro from "./BrandIntro";
import TopNav from "./TopNav";
import Hero from "./Hero";
import Trailer from "./Trailer";
import OurStory from "./OurStory";
import Cast from "./Cast";
import NextEpisode from "./NextEpisode";
import Memories from "./Memories";
import RSVP from "./RSVP";
import GuestBook from "./GuestBook";
import Location from "./Location";
import GiftSection from "./GiftSection";
import Credits from "./Credits";
import { slugifyName } from "@/lib/slug";

type Phase = "gate" | "intro" | "app";

type AttendanceStatus = "yes" | "maybe" | "no";
type Rsvp = { status: AttendanceStatus; name: string };

export default function NikahfixExperience({ initialName }: { initialName?: string }) {
  const [phase, setPhase] = useState<Phase>("gate");
  const [guestName, setGuestName] = useState<string | null>(initialName ?? null);
  // The guest's RSVP (status + the name it was filed under). A Guest Book
  // message is only allowed once this exists, and renames it with the message.
  const [rsvp, setRsvpState] = useState<Rsvp | null>(null);
  // Name edited in the message form; overrides the invitation-link name everywhere below.
  const [msgName, setMsgName] = useState<string | null>(null);
  const rsvpKey = `nikahfix-rsvp:${guestName ?? ""}`;

  // Remember the RSVP on this device so a returning guest is not asked again.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(rsvpKey) ?? "null");
      if (saved?.status && saved?.name) {
        setRsvpState(saved);
        setMsgName(saved.name);
      }
    } catch {}
  }, [rsvpKey]);

  const saveRsvp = (r: Rsvp) => {
    setRsvpState(r);
    try {
      localStorage.setItem(rsvpKey, JSON.stringify(r));
    } catch {}
  };

  const handleEnter = useCallback(
    (name: string) => {
      setGuestName(name);
      if (!initialName) {
        // Update the address bar to the personalized URL without triggering a
        // route change — a real Next.js navigation would remount this page
        // and drop us back at the profile-select screen.
        const slug = slugifyName(name);
        if (slug) window.history.replaceState(null, "", `/to/${slug}`);
      }
      // Played synchronously inside this click-triggered callback so the
      // browser's autoplay policy treats it as a direct result of the
      // user's gesture.
      const sound = new Audio("/intro.mp3");
      sound.volume = 0.7;
      sound.play().catch(() => {});
      setPhase("intro");
    },
    [initialName]
  );

  if (phase === "gate") {
    return <ProfileGate initialName={initialName} onEnter={handleEnter} />;
  }

  if (phase === "intro") {
    return <BrandIntro onDone={() => setPhase("app")} />;
  }

  const linkName = guestName ?? "Guest";
  const name = msgName ?? linkName;
  const rsvpName = name.trim() || linkName;

  return (
    <main className="relative min-h-screen w-full bg-black">
      <TopNav guestName={linkName} />
      <Hero guestName={linkName} />
      <Trailer />
      <OurStory />
      <Cast />
      <NextEpisode />
      <Memories />
      <RSVP guestName={rsvpName} onStatusChange={(status) => saveRsvp({ status, name: rsvpName })} />
      <GuestBook
        name={name}
        onNameChange={setMsgName}
        rsvp={rsvp}
        onRsvpRenamed={(n) => rsvp && saveRsvp({ ...rsvp, name: n })}
      />
      <Location />
      <GiftSection />
      <Credits />
    </main>
  );
}
