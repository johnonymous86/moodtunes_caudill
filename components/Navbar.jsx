'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: '🎵 Discover' },
    { href: '/history', label: '🕓 History' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-lg shrink-0"
        >
          <span className="text-2xl">🎵</span>
          <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
            MoodTunes
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? 'bg-violet-500/20 text-violet-300'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop user area */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-sm text-slate-400">
            Hey,{' '}
            <span className="text-white font-medium">
              {session?.user?.name?.split(' ')[0] ?? 'there'}
            </span>{' '}
            👋
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm btn-ghost py-1.5 px-3"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-900/95 px-4 py-4 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href
                  ? 'bg-violet-500/20 text-violet-300'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Signed in as{' '}
              <span className="text-white">{session?.user?.name}</span>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-sm text-rose-400 hover:text-rose-300 font-medium transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
