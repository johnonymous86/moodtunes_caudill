'use client';

import Image from 'next/image';

// Generates a consistent color from a string for the placeholder
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    'from-violet-600 to-purple-700',
    'from-blue-600 to-indigo-700',
    'from-emerald-600 to-teal-700',
    'from-orange-600 to-red-700',
    'from-pink-600 to-rose-700',
    'from-amber-600 to-orange-700',
  ];
  return colors[Math.abs(hash) % colors.length];
}

export default function TrackCard({ track, index }) {
  const hasImage = track.image && track.image.trim() !== '';
  const placeholderGradient = stringToColor(track.name + track.artist);
  const initials = track.name.charAt(0).toUpperCase();

  return (
    <div className="card flex items-center gap-4 p-4 hover:border-slate-700 transition-all duration-200 hover:bg-slate-900/80 group animate-slide-up">
      {/* Track number */}
      <span className="hidden sm:block text-slate-600 text-sm font-mono w-5 shrink-0 text-right group-hover:text-slate-400 transition-colors">
        {index + 1}
      </span>

      {/* Album art */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 shadow-md">
        {hasImage ? (
          <Image
            src={track.image}
            alt={`${track.name} by ${track.artist}`}
            fill
            sizes="56px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${placeholderGradient} flex items-center justify-center text-white font-bold text-xl`}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate text-sm sm:text-base leading-tight">
          {track.name}
        </p>
        <p className="text-slate-400 text-xs sm:text-sm truncate mt-0.5">
          {track.artist}
        </p>
      </div>

      {/* Listen button */}
      {track.url && (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300
                     bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40
                     px-3 py-1.5 rounded-lg transition-all duration-200"
          title="Listen on Last.fm"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          <span className="hidden sm:inline">Listen</span>
        </a>
      )}
    </div>
  );
}
