import type { Metadata } from "next";
import NikahfixExperience from "@/components/NikahfixExperience";
import { nameFromSlug } from "@/lib/slug";
import { weddingConfig } from "@/lib/content";

type Params = Promise<{ guest: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { guest } = await params;
  const name = nameFromSlug(guest);
  const { groomName, brideName, reception } = weddingConfig;
  const description = `${name}, you're invited to the next episode of our love story. ${reception.date} · ${reception.time}`;
  return {
    title: `NIKAHFIX — ${weddingConfig.coupleTitle}`,
    description,
    // Repeated here because a page-level openGraph replaces the layout's whole object (images included).
    openGraph: {
      title: `${groomName} & ${brideName}`,
      description,
      siteName: "NIKAHFIX",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function GuestPage({ params }: { params: Params }) {
  const { guest } = await params;
  const name = nameFromSlug(guest);
  return <NikahfixExperience initialName={name} />;
}
