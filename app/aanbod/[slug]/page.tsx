import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPropertyBySlug, getAllSlugs, getRelatedProperties } from "@/lib/properties";
import { PropertyDetailClient } from "@/components/listings/PropertyDetailClient";

/* ── Static params ───────────────────────────────────────────── */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Metadata ────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);
  if (!property) return {};
  return {
    title: `${property.address.street}, ${property.address.city} | Floberg Makelaars`,
    description: property.description.slice(0, 160),
  };
}

/* ── Page ────────────────────────────────────────────────────── */
export default function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const related = getRelatedProperties(property);

  return <PropertyDetailClient property={property} related={related} />;
}
