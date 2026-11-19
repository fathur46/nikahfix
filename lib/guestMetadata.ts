import type { Metadata } from "next";
import { weddingConfig, contentId } from "@/lib/content";
import { nameFromSlug } from "@/lib/slug";

/** Link-preview metadata for /to/<guest> (English) and /ke/<guest> (Indonesian). */
export function guestMetadata(guestSlug: string, lang: "en" | "id"): Metadata {
  const name = nameFromSlug(guestSlug);
  const { groomName, brideName, coupleTitle, reception } = weddingConfig;
  const description =
    lang === "id"
      ? `${name}, kamu diundang ke episode selanjutnya dari kisah cinta kami. ${contentId.reception.date} · ${reception.time}`
      : `${name}, you're invited to the next episode of our love story. ${reception.date} · ${reception.time}`;

  return {
    title: `NIKAHFIX — ${coupleTitle}`,
    description,
    // Repeated here because a page-level openGraph replaces the layout's whole object (images included).
    openGraph: {
      title: `${groomName} & ${brideName}`,
      description,
      siteName: "NIKAHFIX",
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}
