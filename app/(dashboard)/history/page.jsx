'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMoodById } from '@/lib/moodMap';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffHrs = diffMs / (1000 * 60 * 60);

  if (diffHrs < 1) return 'Just now';
  if (diffHrs < 24) return `${Math.floor(diffHrs)}h ago`;
  if (diffHrs < 48) return 'Yesterday';

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

function SessionCard({ session }) {
  const [expanded, setExpanded] = useState(false);
  const mood = getMoodById(session.mood);

  return (
    <div className="card overflow-hidden">
      {/* Session header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-4 p-5 hover:bg-slate-800/40 transition-colors text-left"
      >
        {/* Mood emoji with glow */}
        <div className="relative shrink-0">
          <span className="text-3xl">{session.moodEmoji}</span>
          {mood && (
            <div
              className={`absolute inset-0 -z-10 blur-lg opacity-50 bg-gradient-to-br ${mood.gradient} scale-150`}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white capitalize">
              {session.moodLabel}
            </span>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
              {session.tracks?.length ?? 0} tracks
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-0.5">
            {formatDate(session.createdAt)}
          </p>
        </div>

        {/* Expand toggle */}
        <svg
          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded track list */}
      {expanded && session.tracks?.length > 0 && (
        <div className="border-t border-slate-800 divide-y divide-slate-800/60">
          {session.tracks.map((track, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800/30 transition-colors">
              <span className="text-slate-600 text-xs font-mono w-5 text-right shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{track.name}</p>
                <p className="text-xs text-slate-400 truncate">{track.artist}</p>
              </div>
              {track.url && (
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-violet-400 hover:text-violet-300 transition-colors"
                  title="Listen on Last.fm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {expanded && (!session.tracks || session.tracks.length === 0) && (
        <div className="border-t border-slate-800 px-5 py-4 text-slate-500 text-sm">
          No tracks recorded for this session.
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('/api/sessions');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load.');
        setSessions(data.sessions ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  // Group sessions by date
  const grouped = sessions.reduce((acc, session) => {
    const key = formatDate(session.createdAt);
    if (!acc[key]) acc[key] = [];
    acc[key].push(session);
    return acc;
  }, {});

  return (
    <div className="animate-fade-in max-w-2xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Mood History</h1>
        <p className="text-slate-400">
          Every mood session you've had, saved automatically.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-1/3" />
                  <div className="h-3 bg-slate-800 rounded w-1/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="card p-6 text-center">
          <p className="text-rose-400 text-sm">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && sessions.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🎵</div>
          <h2 className="text-lg font-semibold mb-2">No sessions yet</h2>
          <p className="text-slate-400 text-sm mb-6">
            Head to the Discover page and pick your first mood to get started.
          </p>
          <Link href="/dashboard" className="btn-primary inline-block">
            Discover Music
          </Link>
        </div>
      )}

      {/* Session list grouped by date */}
      {!loading && !error && sessions.length > 0 && (
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, dateSessions]) => (
            <section key={date}>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
                {date}
              </h2>
              <div className="space-y-3">
                {dateSessions.map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
              </div>
            </section>
          ))}

          <p className="text-center text-slate-600 text-xs pt-4">
            Showing your 20 most recent sessions
          </p>
        </div>
      )}
    </div>
  );
}
