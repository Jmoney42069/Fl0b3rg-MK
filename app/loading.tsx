export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Pagina wordt geladen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F7F4]"
    >
      {/* Logo */}
      <div className="mb-8 text-center animate-pulse">
        <span className="block text-3xl font-black tracking-tight text-[#1B3A5C]">
          FLOBERG
        </span>
        <span className="block text-[11px] font-semibold tracking-widest text-[#C9A96E] uppercase mt-0.5">
          Makelaardij
        </span>
      </div>

      {/* Three bouncing dots */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-[#C9A96E]"
            style={{
              animation: `floberg-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floberg-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
