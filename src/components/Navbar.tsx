'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu if screen size increases beyond tablet breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'Programs', href: '/#courses', activeCheck: (path: string) => path.startsWith('/programs') || path === '/#courses' },
    { label: 'Philosophy', href: '/#philosophy', activeCheck: (path: string) => false },
    { label: 'Courses', href: '/#professional-courses', activeCheck: (path: string) => false },
    { label: 'Stories', href: '/stories', activeCheck: (path: string) => path.startsWith('/stories') },
    { label: 'Testimonials', href: '/#testimonials', activeCheck: (path: string) => false },
  ];

  const isLinkActive = (link: typeof navLinks[0]) => {
    return link.activeCheck(pathname);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50">
      <header className="clay-nav px-5 sm:px-8 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center group gap-2.5">
          {/* Kanji Emblem */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xl shadow-[3px_3px_10px_rgba(99,102,241,0.25)] group-hover:scale-110 transition-transform duration-300">
            生
          </div>
          <div className="flex flex-col justify-center select-none">
            <span className="text-base font-black tracking-tight text-slate-800 leading-none">
              IKIGAI
            </span>
            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-[0.2em] leading-none mt-0.5">
              School of AI
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-xs font-extrabold rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-indigo-50 text-indigo-600 shadow-[inset_1px_1px_3px_rgba(99,102,241,0.15)]'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Login / Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-extrabold text-slate-500 hover:text-indigo-600 rounded-full transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/#contact"
            className="clay-btn-primary text-xs !py-2.5 !px-5 hidden md:inline-flex"
          >
            Enroll Now
          </Link>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-2xl bg-white/70 hover:bg-white flex items-center justify-center border border-slate-100 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] text-slate-600 hover:text-indigo-600 transition-all cursor-pointer"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute top-[4.5rem] left-0 right-0 w-full transition-all duration-300 origin-top md:hidden ${
            isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          <div className="clay-panel bg-white/95 border border-slate-200/80 p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-3">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500 mb-1 px-2">Navigation</div>
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center justify-between p-3 rounded-2xl text-sm font-bold transition-all ${
                    active
                      ? 'bg-indigo-50/70 text-indigo-600'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50/50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-45" />
                </Link>
              );
            })}
            <div className="h-px bg-slate-100 my-2" />
            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full flex items-center justify-center p-3 rounded-2xl text-sm font-bold text-slate-600 border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/#contact"
                className="clay-btn-primary shine w-full flex items-center justify-center gap-2 !py-3 !text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
