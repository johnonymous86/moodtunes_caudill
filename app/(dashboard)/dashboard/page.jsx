'use client';

import { useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import MoodCard from '@/components/MoodCard';
import TrackCard from '@/components/TrackCard';
import { MOODS, MOOD_PROMPTS, getMoodById } from '@/lib/moodMap';

const STEP = {
  SELECT: 'select',
  LOADING: 'loading',
  RESULTS: 'results',
  ERROR: 'error',
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [step, setStep] = useState(STEP.SELECT);
  const [selectedMood, setSelectedMood] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');

  // Pick a random prompt once per mount
  const prompt = useMemo(
    () => MOOD_PROMPTS[Math.floor(Math.random() * MOOD_PROMPTS.length)],
    []
  );

  const firstName = session?.user?.name?.split(' ')[0] ?? 'there';

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setStep(STEP.LOADING);
    setError('');

    try {
      const res = await fetch('/api/music/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moodId: mood.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to fetch music.');
        setStep(STEP.ERROR);
        return;
      }

      setTracks(data.tracks ?? []);
      setStep(STEP.RESULTS);
    } catch {
      setError('Network error. Check your connection and try again.');
      setStep(STEP.ERROR);
    }
  };

  const handleReset = () => {
    setStep(STEP.SELECT);
    setSelectedMood(null);
    setTracks([]);
    setError('');
  };

  // ─── LOADING STATE ───────────────────────────────────────────────────────────
  if (step === STEP.LOADING) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="relative">
          <div className="text-7xl animate-bounce-slow">{selectedMood?.emoji}</div>
          <div
            className={`absolute inset-0 -z-10 blur-2xl opacity-40 bg-gradient-to-br ${selectedMood?.gradient} rounded-full scale-150`}
          />
        </div>
        <div>
          <p className="text-xl font-semibold text-white mb-2">
            Finding your {selectedMood?.label.toLowerCase()} soundtrack…
          </p>
          <p className="text-slate-400 text-sm">Searching Last.fm for the perfect tracks</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${selectedMood?.gradient} animate-pulse`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ─── ERROR STATE ─────────────────────────────────────────────────────────────
  if (step === STEP.ERROR) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-5">
        <div className="text-6xl">😕</div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-slate-400 text-sm max-w-sm">{error}</p>
        </div>
        <button onClick={handleReset} className="btn-primary mt-2">
          Try Again
        </button>
      </div>
    );
  }

  // ─── RESULTS STATE ───────────────────────────────────────────────────────────
  if (step === STEP.RESULTS && selectedMood) {
    return (
      <div className="animate-fade-in">
        {/* Results header */}
        <div className="mb-8">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Pick a different mood
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="text-5xl">{selectedMood.emoji}</div>
              <div
                className={`absolute inset-0 -z-10 blur-xl opacity-60 bg-gradient-to-br ${selectedMood.gradient} scale-150`}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {selectedMood.label} music for you
              </h1>
              <p className="text-slate-400 mt-1">
                {tracks.length} tracks · curated for your mood
              </p>
            </div>
          </div>
        </div>

        {/* Track list */}
        <div className="space-y-2">
          {tracks.map((track, i) => (
            <TrackCard key={`${track.name}-${i}`} track={track} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-4">Feeling something different?</p>
          <button onClick={handleReset} className="btn-primary">
            Change My Mood
          </button>
        </div>
      </div>
    );
  }

  // ─── MOOD SELECT STATE ───────────────────────────────────────────────────────
  return (
    <div className="animate-fade-in">
      {/* Greeting */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Hey, {firstName} 👋
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 font-light italic">
          "{prompt}"
        </p>
        <p className="text-slate-500 text-sm mt-3">
          Pick a mood below and we'll build your perfect playlist instantly.
        </p>
      </div>

      {/* Mood grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOODS.map((mood) => (
          <MoodCard
            key={mood.id}
            mood={mood}
            onClick={handleMoodSelect}
            disabled={step !== STEP.SELECT}
          />
        ))}
      </div>

      {/* Bottom tip */}
      <p className="text-center text-slate-600 text-xs mt-10">
        🎵 Powered by Last.fm · Your sessions are saved automatically
      </p>
    </div>
  );
}
