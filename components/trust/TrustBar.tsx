import { Home, Award, Star } from "lucide-react";

/* ── Item ─────────────────────────────────────────────────────── */
interface TrustItem {
  id: string;
  icon: React.ReactNode;
  primary: React.ReactNode;
  secondary: string;
}

const ITEMS: TrustItem[] = [
  {
    id: "nvm",
    icon: (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 font-display font-bold text-white text-sm">
        NVM
      </span>
    ),
    primary: (
      <span className="font-display font-bold text-white text-xl">NVM</span>
    ),
    secondary: "Gecertificeerd NVM Makelaar",
  },
  {
    id: "trustoo",
    icon: <Star size={28} className="text-[#C9A96E] fill-[#C9A96E]" />,
    primary: (
      <span className="font-display font-bold text-[#C9A96E] text-3xl leading-none">
        9.1
      </span>
    ),
    secondary: "Trustoo Score",
  },
  {
    id: "funda",
    icon: <Home size={26} className="text-white" />,
    primary: (
      <span className="font-display font-bold text-white text-xl">Funda</span>
    ),
    secondary: "Actief op Funda",
  },
  {
    id: "experience",
    icon: <Award size={26} className="text-[#C9A96E]" />,
    primary: (
      <span className="font-display font-bold text-white text-xl">25+</span>
    ),
    secondary: "Jaar ervaring",
  },
];

/* ── Component ───────────────────────────────────────────────── */
export function TrustBarFull() {
  return (
    <div className="bg-[#1B3A5C] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-x-0 lg:divide-x lg:divide-white/10">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center gap-2 px-6 py-2 hover:scale-105 transition-transform duration-200"
            >
              {item.icon}
              {item.primary}
              <p className="font-body text-xs text-white/60 mt-0.5">
                {item.secondary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
