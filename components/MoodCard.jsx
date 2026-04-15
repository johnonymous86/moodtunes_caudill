'use client';

export default function MoodCard({ mood, onClick, disabled }) {
  return (
    <button
      onClick={() => onClick(mood)}
      disabled={disabled}
      className={`
        group relative overflow-hidden rounded-2xl p-5 text-left
        border border-white/5 hover:border-white/20
        bg-slate-900 hover:bg-slate-800
        shadow-lg hover:shadow-xl ${mood.glow}
        transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100
        focus:outline-none focus:ring-2 focus:ring-violet-500
      `}
    >
      {/* Gradient background on hover */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
          bg-gradient-to-br ${mood.gradient}
        `}
      />

      {/* Corner accent dot */}
      <div
        className={`
          absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100
          transition-opacity duration-300 bg-gradient-to-br ${mood.gradient}
        `}
      />

      <div className="relative">
        {/* Emoji */}
        <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block">
          {mood.emoji}
        </div>

        {/* Label */}
        <h3 className={`font-bold text-lg mb-1 transition-colors duration-200 group-hover:${mood.textColor}`}>
          {mood.label}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-200">
          {mood.description}
        </p>
      </div>
    </button>
  );
}
