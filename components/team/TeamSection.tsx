import { TEAM_MEMBERS } from "@/lib/team";
import { TeamCard } from "@/components/team/TeamCard";

export function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="font-body text-[#C9A96E] text-sm font-semibold tracking-widest uppercase mb-3">
            Ons team
          </p>
          <h2 className="font-display font-bold text-[#1A1A1A] text-4xl leading-tight mb-4">
            Persoonlijk contact met de mensen die écht het werk doen
          </h2>
          <div className="h-0.5 w-16 bg-[#C9A96E] mb-4" />
          <p className="font-body text-[#6B7280] text-lg leading-relaxed">
            Bij Floberg werkt u direct met ervaren makelaars — geen callcenter, geen tussenpersoon.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
