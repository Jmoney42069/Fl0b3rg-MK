"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, Home, ExternalLink } from "lucide-react";
import type { TeamMember } from "@/lib/team";

/* ── Variant ─────────────────────────────────────────────────── */
const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ── Component ───────────────────────────────────────────────── */
export function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.article
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl bg-[#F8F7F4] border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* ── Photo ─────────────────────────────────────── */}
      <div className="relative mx-5 mt-5">
        <div
          className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent group-hover:border-[#C9A96E] transition-colors duration-300"
        >
          <Image
            src={member.photo}
            alt={`Foto van ${member.name}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 320px"
            className="object-cover"
          />

          {/* LinkedIn hover overlay */}
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} op LinkedIn`}
            className="absolute inset-0 bg-[#1B3A5C]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ExternalLink size={28} className="text-white" />
          </a>
        </div>

        {/* Years experience badge */}
        <span className="absolute bottom-3 right-3 inline-flex items-center rounded-full bg-[#C9A96E] text-[#1A1A1A] text-xs font-body font-semibold px-2.5 py-1 whitespace-nowrap">
          {member.yearsExperience} jaar ervaring
        </span>
      </div>

      {/* ── Info ──────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-6">
        <p className="font-body text-xs uppercase tracking-wider text-[#C9A96E] font-medium mb-0.5">
          {member.role}
        </p>
        <h3 className="font-body font-semibold text-[#1A1A1A] text-lg mb-2">
          {member.name}
        </h3>
        <p className="font-body text-sm text-[#6B7280] line-clamp-3 leading-relaxed mb-4">
          {member.bio}
        </p>

        {/* Specialisms */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {member.specialisms.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-blue-50 text-blue-800 text-[11px] font-body font-medium px-2.5 py-1"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Sold this year */}
        <div className="flex items-center gap-1.5 text-xs font-body text-[#6B7280] mb-4">
          <Home size={13} className="text-[#C9A96E] shrink-0" />
          <span>
            <span className="font-semibold text-[#1A1A1A]">{member.soldThisYear}</span>{" "}
            verkopen dit jaar
          </span>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1.5 pt-4 border-t border-[#E5E7EB]">
          <a
            href={`tel:${member.phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-2 text-xs font-body text-[#6B7280] hover:text-[#1B3A5C] transition-colors"
          >
            <Phone size={13} className="text-[#C9A96E] shrink-0" />
            {member.phone}
          </a>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-xs font-body text-[#6B7280] hover:text-[#1B3A5C] transition-colors truncate"
          >
            <Mail size={13} className="text-[#C9A96E] shrink-0" />
            {member.email}
          </a>
        </div>
      </div>
    </motion.article>
  );
}
