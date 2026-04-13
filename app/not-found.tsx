import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      {/* Top logo bar */}
      <div className="px-6 pt-8">
        <Link
          href="/"
          className="inline-flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
          aria-label="Floberg Makelaardij — terug naar home"
        >
          <span className="text-xl font-bold text-[#1B3A5C] tracking-tight">
            FLOBERG
          </span>
          <span className="text-[10px] font-semibold tracking-widest text-[#C9A96E] uppercase">
            Makelaardij
          </span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* House with question mark SVG */}
        <svg
          width="160"
          height="140"
          viewBox="0 0 160 140"
          fill="none"
          aria-hidden="true"
          className="mb-8"
        >
          {/* House body */}
          <rect x="28" y="68" width="104" height="64" rx="3" fill="#1B3A5C" opacity="0.12" />
          <rect x="36" y="74" width="88" height="56" rx="2" fill="#1B3A5C" opacity="0.18" />
          {/* Roof */}
          <polygon
            points="16,70 80,20 144,70"
            fill="#1B3A5C"
            opacity="0.25"
          />
          {/* Door */}
          <rect x="64" y="98" width="32" height="32" rx="2" fill="#1B3A5C" opacity="0.35" />
          {/* Door knob */}
          <circle cx="91" cy="116" r="2.5" fill="#C9A96E" />
          {/* Window left */}
          <rect x="40" y="82" width="22" height="20" rx="2" fill="#C9A96E" opacity="0.4" />
          {/* Window right */}
          <rect x="98" y="82" width="22" height="20" rx="2" fill="#C9A96E" opacity="0.4" />
          {/* Question mark */}
          <circle cx="120" cy="36" r="26" fill="#C9A96E" />
          <text
            x="120"
            y="44"
            textAnchor="middle"
            fontSize="28"
            fontWeight="bold"
            fill="#1B3A5C"
            fontFamily="sans-serif"
          >
            ?
          </text>
        </svg>

        {/* 404 */}
        <p className="text-8xl font-black text-[#1B3A5C] leading-none mb-4 select-none">
          404
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
          Deze pagina staat niet meer te koop
        </h1>

        <p className="text-[#6B7280] max-w-md leading-relaxed mb-10">
          De pagina die u zoekt bestaat niet meer of is verplaatst. Bekijk ons
          actuele woningaanbod of ga terug naar de homepage.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className={[
              "inline-flex items-center justify-center",
              "px-6 py-3 rounded-md text-sm font-semibold",
              "bg-[#1B3A5C] text-white",
              "hover:bg-[#162E4A] transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C]",
              "min-w-[180px]",
            ].join(" ")}
          >
            Terug naar home
          </Link>
          <Link
            href="/aanbod"
            className={[
              "inline-flex items-center justify-center",
              "px-6 py-3 rounded-md text-sm font-semibold",
              "border-2 border-[#1B3A5C] text-[#1B3A5C]",
              "hover:bg-[#1B3A5C] hover:text-white transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C]",
              "min-w-[180px]",
            ].join(" ")}
          >
            Bekijk woningaanbod
          </Link>
        </div>
      </div>
    </div>
  );
}
