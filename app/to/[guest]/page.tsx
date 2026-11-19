import type { Metadata } from "next";
import NikahfixExperience from "@/components/NikahfixExperience";
import { nameFromSlug } from "@/lib/slug";
import { guestMetadata } from "@/lib/guestMetadata";

type Params = Promise<{ guest: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { guest } = await params;
  return guestMetadata(guest, "en");
}

export default async function GuestPage({ params }: { params: Params }) {
  const { guest } = await params;
  return <NikahfixExperience initialName={nameFromSlug(guest)} initialLang="en" />;
}
