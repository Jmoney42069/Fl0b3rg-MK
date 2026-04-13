import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  pageTitle: "Woningaanbod Huizen & Bussum",
  pageDescription:
    "Bekijk ons actuele woningaanbod in Huizen, Bussum, Naarden, Blaricum en Laren. Beschikbare woningen, open-huis dagen en nieuw aanbod in het Gooi.",
  pagePath: "/aanbod",
});

export default function AanbodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
