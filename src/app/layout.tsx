import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Ikigai School of AI | Flagship Fellowships & Placements",
  description: "Ikigai School of AI offers premium industry-integrated fellowships in Industrial AI and Machine Learning in partnership with SapienOne and Algo8 AI. Featuring paid internships and certification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden font-sans">

        {/* ===== FLOATING CLAY NAVBAR ===== */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50">
          <header className="clay-nav px-5 sm:px-8 h-16 flex items-center justify-between">
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

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-2">
              {[
                { label: 'Programs', href: '/#courses' },
                { label: 'Philosophy', href: '/#philosophy' },
                { label: 'Testimonials', href: '/#testimonials' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-xs font-extrabold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-full transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Login */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 text-xs font-extrabold text-slate-500 hover:text-indigo-600 rounded-full transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="#contact"
                className="clay-btn-primary text-xs !py-2.5 !px-5"
              >
                Enroll Now
              </Link>
            </div>
          </header>
        </div>

        {/* Spacer for fixed nav */}
        <div className="h-24" />

        {/* Global Page Area */}
        <div className="relative min-h-[calc(100vh-6rem)] flex flex-col z-10 flex-grow">
          {children}
        </div>

        {/* ===== CLAY FOOTER ===== */}
        <footer className="mt-auto py-12 relative z-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="clay-panel bg-white/50 p-8 sm:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Footer Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-lg shadow-[2px_2px_8px_rgba(99,102,241,0.2)]">
                    生
                  </div>
                  <div className="flex flex-col justify-center select-none">
                    <span className="text-sm font-black tracking-tight text-slate-700 leading-none">IKIGAI</span>
                    <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-[0.2em] leading-none mt-0.5">School of AI</span>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
                  <Link href="/#courses" className="hover:text-indigo-500 transition-colors">Programs</Link>
                  <Link href="/#philosophy" className="hover:text-indigo-500 transition-colors">Philosophy</Link>
                  <Link href="/login" className="hover:text-indigo-500 transition-colors">Portal Login</Link>
                </div>

                {/* Copyright */}
                <p className="text-[11px] font-bold text-slate-400 text-center md:text-right">
                  &copy; 2026 Ikigai School of AI. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
