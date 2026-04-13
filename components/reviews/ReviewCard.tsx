import { Star } from "lucide-react";
import type { Review, ReviewSource } from "@/lib/reviews";

/* ── Star renderer ───────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  // rating is 0–10, display as 0–5 stars
  const stars = rating / 2;
  return (
    <div className="flex gap-0.5" aria-label={`Beoordeling: ${rating} uit 10`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = stars >= i + 1;
        const half = !filled && stars >= i + 0.5;
        return (
          <span key={i} className="relative inline-block">
            {/* Background star (empty) */}
            <Star size={14} className="text-gray-200 fill-gray-200" />
            {/* Overlaid filled or half */}
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star size={14} className="fill-[#C9A96E] text-[#C9A96E]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/* ── Source badge config ─────────────────────────────────────── */
const SOURCE_BADGE: Record<ReviewSource, { label: string; className: string }> = {
  Funda: { label: "Via Funda", className: "bg-orange-50 text-orange-700" },
  Trustoo: { label: "Via Trustoo", className: "bg-green-50 text-green-700" },
  Google: { label: "Via Google", className: "bg-blue-50 text-blue-700" },
};

const TRANSACTION_LABEL: Record<string, string> = {
  verkoop: "Verkoop",
  aankoop: "Aankoop",
  taxatie: "Taxatie",
};

/* ── ReviewCard ──────────────────────────────────────────────── */
export function ReviewCard({ review }: { review: Review }) {
  const badge = SOURCE_BADGE[review.source];
  const dateFormatted = new Date(review.date).toLocaleDateString("nl-NL", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 flex flex-col h-full overflow-hidden">
      {/* Decorative quote mark */}
      <span
        className="absolute top-3 left-4 font-display text-8xl leading-none text-[#C9A96E] select-none"
        style={{ opacity: 0.15 }}
        aria-hidden
      >
        &ldquo;
      </span>

      {/* Rating row */}
      <div className="flex items-center gap-3 mb-3 relative">
        <span className="font-display font-bold text-2xl text-[#1B3A5C]">
          {review.rating.toFixed(1)}
        </span>
        <StarRating rating={review.rating} />
        <span
          className={`ml-auto text-[10px] font-body font-semibold rounded-full px-2.5 py-1 ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-body font-semibold text-[#1A1A1A] text-sm mb-2 relative">
        {review.title}
      </h4>

      {/* Text */}
      <p className="font-body text-[#6B7280] text-sm leading-relaxed line-clamp-4 flex-1 mb-4 relative">
        {review.text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-body text-[#6B7280] pt-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[#1A1A1A]">{review.author}</span>
          <span>·</span>
          <span>{TRANSACTION_LABEL[review.transactionType]}</span>
          <span>·</span>
          <span>{review.city}</span>
        </div>
        <span className="text-[#9CA3AF]">{dateFormatted}</span>
      </div>
    </div>
  );
}
