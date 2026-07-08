import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { HomepageJsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

/* ============================================================
   GLOBAL SEO METADATA — Ludhiana-focused keywords
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.ikigailudhiana.com"),
  title: {
    default: "Ikigai School of AI Ludhiana | AI, Data Science, Digital Marketing & Influencer Marketing Courses",
    template: "%s | Ikigai School of AI Ludhiana",
  },
  description:
    "Ikigai School of AI is Ludhiana's #1 institute for AI courses, Data Science, Digital Marketing & Influencer Marketing. IIT Kanpur certified fellowships with paid internships, placement support up to ₹9 LPA. Enroll now!",
  keywords: [
    "ikigai ludhiana",
    "ai course ludhiana",
    "artificial intelligence course ludhiana",
    "data science course ludhiana",
    "digital marketing course ludhiana",
    "influencer marketing course ludhiana",
    "influencer course ludhiana",
    "machine learning course ludhiana",
    "best ai institute ludhiana",
    "data analytics course ludhiana",
    "python course ludhiana",
    "iit kanpur certified course ludhiana",
    "ai training ludhiana",
    "ikigai school of ai",
    "ai course punjab",
    "data science ludhiana",
    "digital marketing training ludhiana",
    "ai fellowship ludhiana",
    "best computer course ludhiana",
  ],
  authors: [{ name: "Ikigai School of AI" }],
  creator: "Ikigai School of AI, Ludhiana",
  publisher: "Ikigai School of AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.ikigailudhiana.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.ikigailudhiana.com",
    siteName: "Ikigai School of AI — Ludhiana",
    title: "Ikigai School of AI Ludhiana | Best AI, Data Science & Digital Marketing Courses",
    description:
      "Ludhiana's premier AI training institute. IIT Kanpur certified AI & Data Science fellowships, Digital Marketing, and Influencer Marketing courses with paid internships and placements.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Students at Ikigai School of AI Ludhiana campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ikigai School of AI Ludhiana | AI, Data Science & Digital Marketing Courses",
    description:
      "IIT Kanpur certified AI courses in Ludhiana with paid internships & placements up to ₹9 LPA. Enroll in AI, Data Science, Digital Marketing or Influencer Marketing.",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  // Uncomment after registering with Google Search Console:
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  // },
  category: "Education",
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
        {/* JSON-LD Structured Data */}
        <HomepageJsonLd />
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
            <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
              {[
                { label: 'Programs', href: '/#courses' },
                { label: 'Philosophy', href: '/#philosophy' },
                { label: 'Courses', href: '/#professional-courses' },
                { label: 'Stories', href: '/stories' },
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

        {/* ===== SEO-OPTIMIZED FOOTER ===== */}
        <footer className="mt-auto py-12 relative z-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="clay-panel bg-white/50 p-8 sm:p-10">

              {/* Top Row: Logo + Links */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
                {/* Footer Logo + Description */}
                <div className="max-w-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-lg shadow-[2px_2px_8px_rgba(99,102,241,0.2)]">
                      生
                    </div>
                    <div className="flex flex-col justify-center select-none">
                      <span className="text-sm font-black tracking-tight text-slate-700 leading-none">IKIGAI</span>
                      <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-[0.2em] leading-none mt-0.5">School of AI</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Ludhiana&apos;s premier AI training institute offering IIT Kanpur certified courses in Artificial Intelligence, Data Science, Digital Marketing, and Influencer Marketing with paid internships and guaranteed placement support.
                  </p>
                </div>

                {/* Footer Nav Columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
                  {/* Programs */}
                  <div>
                    <h4 className="font-black text-slate-700 uppercase tracking-wider text-[10px] mb-3">Programs</h4>
                    <ul className="space-y-2">
                      <li><Link href="/programs/ai-builder" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">AI Course Ludhiana</Link></li>
                      <li><Link href="/programs/industrial-ai" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Industrial AI Fellowship</Link></li>
                      <li><Link href="/programs/data-science" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Data Science Course</Link></li>
                      <li><Link href="/programs/digital-marketing" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Digital Marketing Course</Link></li>
                      <li><Link href="/programs/influencer-marketing" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Influencer Marketing Course</Link></li>
                    </ul>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className="font-black text-slate-700 uppercase tracking-wider text-[10px] mb-3">Quick Links</h4>
                    <ul className="space-y-2">
                      <li><Link href="/#philosophy" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Our Philosophy</Link></li>
                      <li><Link href="/#testimonials" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Testimonials</Link></li>
                      <li><Link href="/stories" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Stories & Blog</Link></li>
                      <li><Link href="/#faq" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">FAQs</Link></li>
                      <li><Link href="/login" className="text-slate-400 hover:text-indigo-500 transition-colors font-bold">Student Portal</Link></li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div>
                    <h4 className="font-black text-slate-700 uppercase tracking-wider text-[10px] mb-3">Contact</h4>
                    <address className="not-italic space-y-2 text-slate-400 font-bold">
                      <p>SCO 45, Ferozepur Road</p>
                      <p>Ludhiana, Punjab 141001</p>
                      <p>
                        <a href="tel:+919876543210" className="hover:text-indigo-500 transition-colors">+91 98765 43210</a>
                      </p>
                      <p>
                        <a href="mailto:admissions@ikigai.ai" className="hover:text-indigo-500 transition-colors">admissions@ikigai.ai</a>
                      </p>
                    </address>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] font-bold text-slate-400">
                  &copy; 2026 Ikigai School of AI, Ludhiana. All rights reserved.
                </p>
                <p className="text-[10px] font-semibold text-slate-300">
                  AI Courses in Ludhiana • Data Science Course Ludhiana • Digital Marketing Course Ludhiana • Influencer Marketing Ludhiana
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
