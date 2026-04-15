import Link from 'next/link';

const features = [
  {
    emoji: '🎯',
    title: 'Mood-Matched Music',
    desc: 'Tell us how you feel and we surface songs that resonate with your current emotional state.',
  },
  {
    emoji: '📚',
    title: 'Personal History',
    desc: 'Every mood session is saved so you can revisit playlists from your past moments.',
  },
  {
    emoji: '🎵',
    title: 'Powered by Last.fm',
    desc: 'Millions of tracks curated by the world\'s largest music intelligence platform.',
  },
  {
    emoji: '📱',
    title: 'Works Everywhere',
    desc: 'Fully responsive on mobile, tablet, and desktop. Your mood, your device.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <header className="border-b border-slate-800/50 px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🎵</span>
            <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              MoodTunes
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm py-2 px-4">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary text-sm py-2 px-4">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-32 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-purple-700/10 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-[250px] h-[250px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-8">
            <span>✨</span>
            <span>Music that understands how you feel</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Your mood.{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your soundtrack.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop scrolling endlessly for the right song. Tell MoodTunes how you
            feel right now — happy, sleepy, stressed, romantic — and we build
            your perfect playlist instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="btn-primary text-base py-3 px-8 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
            >
              Create Free Account
            </Link>
            <Link href="/login" className="btn-ghost text-base py-3 px-8">
              Sign In →
            </Link>
          </div>
        </div>

        {/* Mood emoji strip */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-4 opacity-60">
          {['😄', '😢', '⚡', '😌', '😴', '🤪', '😤', '💕'].map((emoji, i) => (
            <span
              key={i}
              className="text-4xl hover:opacity-100 hover:scale-125 transition-all duration-200 cursor-default"
            >
              {emoji}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why MoodTunes?
          </h2>
          <p className="text-slate-400 text-center mb-14 max-w-xl mx-auto">
            Built around how music actually makes you feel, not just genre tags
            or artist names.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="card p-6 hover:border-slate-700 transition-colors"
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to find your sound?
          </h2>
          <p className="text-slate-400 mb-8">
            Create a free account in seconds. No credit card required.
          </p>
          <Link
            href="/signup"
            className="btn-primary text-base py-3 px-10 shadow-lg shadow-violet-500/25"
          >
            Get Started — It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-slate-500 text-sm">
        <p>
          🎵 MoodTunes · Powered by{' '}
          <a
            href="https://www.last.fm/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors underline"
          >
            Last.fm API
          </a>
        </p>
      </footer>
    </div>
  );
}
