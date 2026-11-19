// ---------------------------------------------------------------------------
// NIKAHFIX content config
// Edit everything here to re-skin the invitation with your own wedding data.
// No component files need to change when you update this file.
// ---------------------------------------------------------------------------

export type Episode = {
  number: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  description: string;
};

export type CastMember = {
  name: string;
  fullName?: string;
  role: string;
  image: string;
};

export type GalleryItem = {
  id: string;
  category: string;
  image: string;
  caption?: string;
};

export type Review = {
  name: string;
  relation?: string;
  message: string;
  rating: number; // 1-5
  /** Set when the guest also RSVP'd in the same visit — shown as a small badge. */
  attendance?: "yes" | "maybe" | "no";
  /** ISO timestamp set by the server (or the browser for a just-posted message). */
  submittedAt?: string;
};

export type GiftAccount = {
  owner: string; // e.g. "Andini (Bride)"
  bankName: string;
  accountNumber: string;
  accountHolder: string;
};

export const weddingConfig = {
  // Brand
  brand: "NIKAHFIX",
  tag: "NIKAHFIX ORIGINAL",

  // The couple
  groomName: "Arul",
  brideName: "Devita",
  coupleTitle: "ARUL & DEVITA",

  // Hero
  heroImage: "/images/hero.webp",
  heroMeta: "2026 • Romance • Wedding • True Story",
  heroTagline: "Two people. One story. A lifetime to go.",
  heroLogline:
    "From a chance meeting to forever — watch how it all began, and where it's headed next.",

  // Trailer
  trailerVideo: "/videos/trailer.mp4",
  trailerPoster: "/images/trailer-poster.jpg",
  trailerTitle: "Our Story",
  trailerLogline: "The official trailer for the story of us.",

  // Wedding date/time (ISO with offset, used for countdown)
  weddingDateISO: "2026-11-27T15:00:00+07:00",
  weddingDateLabel: "Friday, 27 November 2026",

  reception: {
    label: "RECEPTION",
    date: "Friday, 27 November 2026",
    time: "15.00 WIB - Selesai",
    startISO: "2026-11-27T15:00:00+07:00",
    // shortcut: "selesai" has no fixed end time, so the calendar event assumes 3 hours; edit if needed.
    endISO: "2026-11-27T18:00:00+07:00",
    venueName: "Perumahan Plataran Hills No. B 25 - 26",
    venueAddress:
      "Jalan Gadingan, Area Sawah/Kebun, Boreng, Kec. Lumajang, Kabupaten Lumajang, Jawa Timur 67351",
    mapsUrl: "https://maps.app.goo.gl/D8t9TdWSLZXPsqje6",
  },

  // Our Story — Netflix-style episodes
  episodes: [
    {
      number: "01",
      title: "The First Meeting",
      subtitle: "Pilot",
      year: "2017",
      image: "/images/episode-1.webp",
      description:
        "A crowded room, an accidental introduction, and a conversation neither of them wanted to end.",
    },
    {
      number: "02",
      title: "The Journey",
      subtitle: "Season One",
      year: "2018 — 2024",
      image: "/images/episode-2.webp",
      description:
        "Long calls, longer distances, and the slow realization that this was the real thing.",
    },
    {
      number: "03",
      title: "The Proposal",
      subtitle: "Season Finale",
      year: "2025",
      image: "/images/episode-3.webp",
      description: "One knee, one question, one very shaky 'yes'.",
    },
    {
      number: "04",
      title: "Forever",
      subtitle: "Coming Soon",
      year: "2026",
      image: "/images/episode-4.webp",
      description:
        "The wedding. The beginning of a story with no ending — just the next chapter.",
    },
  ] satisfies Episode[],

  // The Cast
  mainCast: {
    bride: { name: "Devita", fullName: "Devita Irma Fitriani", role: "The Bride", image: "/images/bride.webp" },
    groom: { name: "Arul", fullName: "Ammrullah Sukma Jati Lesmana Subekti", role: "The Groom", image: "/images/groom.webp" },
  },
  specialAppearances: [] as CastMember[],

  // Send a Gift — bank account details. Leave the array empty to hide the
  // whole section.
  giftNote: "Your presence is the greatest gift. If you'd like to send something more, here's where.",
  giftAccounts: [
    { owner: "Groom", bankName: "Mandiri", accountNumber: "1430028903126", accountHolder: "Ammrullah Sukma Jati" },
    { owner: "Bride", bankName: "BRI", accountNumber: "631801032893531", accountHolder: "Devita Irma Fitriani" },
  ] satisfies GiftAccount[],

  // Memories / Gallery
  gallery: [
    { id: "g1", category: "Our Journey", image: "/images/gallery-1.webp" },
    { id: "g2", category: "Our Journey", image: "/images/gallery-2.webp" },
    { id: "g3", category: "Our Journey", image: "/images/gallery-3.webp" },
    { id: "g4", category: "Our Journey", image: "/images/gallery-4.webp" },
    { id: "g5", category: "Our Journey", image: "/images/gallery-5.webp" },
    { id: "g6", category: "Our Journey", image: "/images/gallery-6.webp" },
  ] satisfies GalleryItem[],

  // Guest Book messages are read entirely from data/guestbook.json (real
  // guest submissions) at runtime — see components/GuestBook.tsx. Nothing
  // here is displayed; this type export just documents the shape.
  reviews: [] satisfies Review[],
};

export type WeddingConfig = typeof weddingConfig;

// Indonesian copy, used when the guest picks ID (or opens a /ke/... link).
// Anything not listed here (names, venue, bank accounts, photos) is shared.
export const contentId = {
  trailerTitle: "Kisah Kami",
  trailerLogline: "Trailer resmi kisah kami.",
  heroMeta: "2026 • Romantis • Pernikahan • Kisah Nyata",
  heroTagline: "Dua insan. Satu cerita. Seumur hidup untuk dijalani.",
  heroLogline:
    "Dari pertemuan tak terduga hingga selamanya — saksikan bagaimana semuanya bermula, dan ke mana cerita ini melangkah.",
  giftNote: "Kehadiranmu adalah hadiah terbaik. Jika ingin memberi lebih, berikut informasinya.",
  reception: { label: "RESEPSI", date: "Jumat, 27 November 2026" },
  // Same order as weddingConfig.episodes
  episodes: [
    {
      title: "Pertemuan Pertama",
      subtitle: "Episode Perdana",
      description: "Ruangan yang ramai, perkenalan tak disengaja, dan obrolan yang tak ingin mereka akhiri.",
    },
    {
      title: "Perjalanan",
      subtitle: "Musim Pertama",
      description: "Telepon panjang, jarak yang lebih jauh, dan pelan-pelan sadar bahwa ini sungguhan.",
    },
    {
      title: "Lamaran",
      subtitle: "Final Musim",
      description: "Satu lutut, satu pertanyaan, satu 'iya' yang gemetar.",
    },
    {
      title: "Selamanya",
      subtitle: "Segera Hadir",
      description: "Pernikahan. Awal dari cerita tanpa akhir — hanya bab berikutnya.",
    },
  ],
  roles: { bride: "Mempelai Wanita", groom: "Mempelai Pria" },
  // Same order as weddingConfig.giftAccounts
  giftOwners: ["Mempelai Pria", "Mempelai Wanita"],
  // Gallery category labels (English label -> Indonesian)
  categories: {
    "Our Journey": "Perjalanan Kami",
    "Pre-Wedding": "Pra-Wedding",
    Family: "Keluarga",
    Friends: "Teman",
  } as Record<string, string>,
};
