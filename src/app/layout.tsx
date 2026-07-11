import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { HomepageJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import IkigaiLogo from "@/components/IkigaiLogo";
import FloatingSocials from "@/components/FloatingSocials";
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
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
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L08XGKVG0F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-L08XGKVG0F');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden font-sans">

        {/* ===== FLOATING CLAY NAVBAR ===== */}
        <Navbar />

        {/* Spacer for fixed nav */}
        <div className="h-24" />

        {/* Global Page Area */}
        <div className="relative min-h-[calc(100vh-6rem)] flex flex-col z-10 flex-grow">
          {children}
        </div>

        {/* ===== PREMIUM DARK FOOTER ===== */}
        <footer className="mt-auto relative z-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
          {/* Decorative top edge */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2" />

          {/* ── UPPER SECTION: CTA Banner ── */}
          <div className="relative border-b border-white/5">
            <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  Ready to launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI career</span>?
                </h3>
                <p className="text-sm text-slate-400 font-medium mt-1.5 max-w-md">
                  Join 500+ students already building their future with Ikigai School of AI, Ludhiana.
                </p>
              </div>
              <Link
                href="/#contact"
                className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-black tracking-wide shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] transition-all hover:scale-105"
              >
                Enroll Now →
              </Link>
            </div>
          </div>

          {/* ── MAIN FOOTER GRID ── */}
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

              {/* Col 1: Brand + Description + Socials */}
              <div className="lg:col-span-4">
                <div className="mb-4">
                  <IkigaiLogo size={36} darkMode />
                </div>
                <p className="text-[13px] text-slate-400 leading-relaxed font-medium max-w-xs mb-6">
                  Ludhiana&apos;s premier AI training institute. IIT Kanpur certified courses in AI, Data Science, Digital Marketing &amp; Influencer Marketing with paid internships and placement support.
                </p>

                {/* Social Icons Row */}
                <div className="flex items-center gap-3">
                  {/* WhatsApp */}
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all hover:scale-110">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/ikigaischoolofai" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 flex items-center justify-center text-slate-400 hover:text-rose-400 transition-all hover:scale-110">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  {/* Snapchat */}
                  <a href="https://www.snapchat.com/add/ikigai.ai" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500/30 flex items-center justify-center text-slate-400 hover:text-yellow-400 transition-all hover:scale-110">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.75c-3.12 0-5.75 2.15-5.75 6 0 .58.07 1.34.2 2-.86.41-1.56 1.11-1.7 2-.2 1.25.75 2.25 1.5 2.5a.65.65 0 01.35.32c.11.23.11.72-.1 1.22-.38.9-.9 2.08-.2 2.68.4.35 1.5.15 2.3.05.3-.04.6-.08.9-.07.4.01.6.2.7.4.3 1.1 1.1 1.9 2.1 1.9s1.8-.8 2.1-1.9c.1-.2.3-.39.7-.4.3-.01.6.03.9.07.8.1 1.9.3 2.3-.05.7-.6.18-1.78-.2-2.68a1.2 1.2 0 01-.1-1.22c.07-.15.22-.26.35-.32.75-.25 1.7-1.25 1.5-2.5-.14-.89-.84-1.59-1.7-2 .13-.66.2-1.42.2-2 0-3.85-2.63-6-5.75-6z"/></svg>
                  </a>
                  {/* Phone */}
                  <a href="tel:+919876543210" aria-label="Call Us" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all hover:scale-110">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </a>
                </div>
              </div>

              {/* Col 2: Programs */}
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                  Programs
                </h4>
                <ul className="space-y-3">
                  <li><Link href="/programs/ai-builder" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">AI Builder Course</Link></li>
                  <li><Link href="/programs/industrial-ai" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Industrial AI Fellowship</Link></li>
                  <li><Link href="/programs/data-science" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Data Science Course</Link></li>
                  <li><Link href="/programs/digital-marketing" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Digital Marketing</Link></li>
                  <li><Link href="/programs/influencer-marketing" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Influencer Marketing</Link></li>
                </ul>
              </div>

              {/* Col 3: Company */}
              <div className="lg:col-span-2">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
                  Company
                </h4>
                <ul className="space-y-3">
                  <li><Link href="/#philosophy" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Our Philosophy</Link></li>
                  <li><Link href="/#testimonials" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Testimonials</Link></li>
                  <li><Link href="/stories" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Stories &amp; Blog</Link></li>
                  <li><Link href="/#faq" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">FAQs</Link></li>
                  <li><Link href="/login" className="text-[13px] text-slate-400 hover:text-white font-semibold transition-colors duration-200 hover:translate-x-0.5 inline-block">Student Portal</Link></li>
                </ul>
              </div>

              {/* Col 4: Contact + Trust */}
              <div className="lg:col-span-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Get in Touch
                </h4>
                <address className="not-italic space-y-3 text-[13px] text-slate-400 font-semibold mb-6">
                  <p className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 mt-0.5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>SCO 45, Ferozepur Road,<br />Ludhiana, Punjab 141001</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <a href="mailto:admissions@ikigai.ai" className="hover:text-white transition-colors">admissions@ikigai.ai</a>
                  </p>
                </address>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    IIT Kanpur Certified
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
                    <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Placement up to ₹9 LPA
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
                    <svg className="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    Paid Internships
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] font-semibold text-slate-500">
                &copy; {new Date().getFullYear()} Ikigai School of AI, Ludhiana. All rights reserved.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                <span className="hidden sm:inline">AI Courses Ludhiana</span>
                <span className="hidden sm:inline">•</span>
                <span>Data Science</span>
                <span>•</span>
                <span>Digital Marketing</span>
                <span>•</span>
                <span>Influencer Marketing</span>
              </div>
            </div>
          </div>
        </footer>

        {/* ===== FLOATING SOCIAL MEDIA BUTTONS ===== */}
        <FloatingSocials />
      </body>
    </html>
  );
}
