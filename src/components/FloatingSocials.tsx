'use client';

import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20courses%20at%20Ikigai%20School%20of%20AI.%20Please%20share%20more%20details!',
  instagram: 'https://www.instagram.com/ikigaischoolofai',
  snapchat: 'https://www.snapchat.com/add/ikigai.ai',
  call: 'tel:+919876543210',
};

export default function FloatingSocials() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* ====== MOBILE: Fixed bottom bar ====== */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] px-2 py-2">
          <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
            
            {/* WhatsApp */}
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors group"
              aria-label="Chat on WhatsApp"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <MessageCircle className="w-4.5 h-4.5 text-white fill-white" />
              </div>
              <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider">WhatsApp</span>
            </a>

            {/* Instagram */}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-rose-50 transition-colors group"
              aria-label="Follow on Instagram"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <span className="text-[9px] font-extrabold text-rose-600 uppercase tracking-wider">Instagram</span>
            </a>

            {/* Snapchat */}
            <a
              href={SOCIAL_LINKS.snapchat}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-yellow-50 transition-colors group"
              aria-label="Add on Snapchat"
            >
              <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-4.5 h-4.5 fill-slate-800" viewBox="0 0 24 24">
                  <path d="M12 2.75c-3.12 0-5.75 2.15-5.75 6 0 .58.07 1.34.2 2-.86.41-1.56 1.11-1.7 2-.2 1.25.75 2.25 1.5 2.5a.65.65 0 01.35.32c.11.23.11.72-.1 1.22-.38.9-.9 2.08-.2 2.68.4.35 1.5.15 2.3.05.3-.04.6-.08.9-.07.4.01.6.2.7.4.3 1.1 1.1 1.9 2.1 1.9s1.8-.8 2.1-1.9c.1-.2.3-.39.7-.4.3-.01.6.03.9.07.8.1 1.9.3 2.3-.05.7-.6.18-1.78-.2-2.68a1.2 1.2 0 01-.1-1.22c.07-.15.22-.26.35-.32.75-.25 1.7-1.25 1.5-2.5-.14-.89-.84-1.59-1.7-2 .13-.66.2-1.42.2-2 0-3.85-2.63-6-5.75-6z" />
                </svg>
              </div>
              <span className="text-[9px] font-extrabold text-yellow-700 uppercase tracking-wider">Snapchat</span>
            </a>

            {/* Call */}
            <a
              href={SOCIAL_LINKS.call}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-indigo-50 transition-colors group"
              aria-label="Call us"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-[9px] font-extrabold text-indigo-700 uppercase tracking-wider">Call Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* ====== DESKTOP: Floating side buttons ====== */}
      <div className="fixed bottom-6 right-6 z-[100] hidden md:flex flex-col items-end gap-3">
        
        {/* Expandable social buttons */}
        <div
          className={`flex flex-col gap-2.5 transition-all duration-300 ${
            expanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* WhatsApp */}
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            aria-label="Chat on WhatsApp"
          >
            <span className="hidden group-hover:block text-xs font-bold text-slate-600 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 whitespace-nowrap animate-fadeIn">
              Chat on WhatsApp
            </span>
            <div className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] transition-all hover:scale-110">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            aria-label="Follow on Instagram"
          >
            <span className="hidden group-hover:block text-xs font-bold text-slate-600 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 whitespace-nowrap animate-fadeIn">
              Follow on Instagram
            </span>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(244,63,94,0.4)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.5)] transition-all hover:scale-110">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </a>

          {/* Snapchat */}
          <a
            href={SOCIAL_LINKS.snapchat}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            aria-label="Add on Snapchat"
          >
            <span className="hidden group-hover:block text-xs font-bold text-slate-600 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 whitespace-nowrap animate-fadeIn">
              Add on Snapchat
            </span>
            <div className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center shadow-[0_4px_15px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.5)] transition-all hover:scale-110">
              <svg className="w-5 h-5 fill-slate-800" viewBox="0 0 24 24">
                <path d="M12 2.75c-3.12 0-5.75 2.15-5.75 6 0 .58.07 1.34.2 2-.86.41-1.56 1.11-1.7 2-.2 1.25.75 2.25 1.5 2.5a.65.65 0 01.35.32c.11.23.11.72-.1 1.22-.38.9-.9 2.08-.2 2.68.4.35 1.5.15 2.3.05.3-.04.6-.08.9-.07.4.01.6.2.7.4.3 1.1 1.1 1.9 2.1 1.9s1.8-.8 2.1-1.9c.1-.2.3-.39.7-.4.3-.01.6.03.9.07.8.1 1.9.3 2.3-.05.7-.6.18-1.78-.2-2.68a1.2 1.2 0 01-.1-1.22c.07-.15.22-.26.35-.32.75-.25 1.7-1.25 1.5-2.5-.14-.89-.84-1.59-1.7-2 .13-.66.2-1.42.2-2 0-3.85-2.63-6-5.75-6z" />
              </svg>
            </div>
          </a>

          {/* Call */}
          <a
            href={SOCIAL_LINKS.call}
            className="group flex items-center gap-3"
            aria-label="Call us"
          >
            <span className="hidden group-hover:block text-xs font-bold text-slate-600 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 whitespace-nowrap animate-fadeIn">
              Call Admissions
            </span>
            <div className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] transition-all hover:scale-110">
              <Phone className="w-5 h-5 fill-white" />
            </div>
          </a>
        </div>

        {/* Main toggle FAB */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5)] transition-all hover:scale-105 cursor-pointer ${
            expanded
              ? 'bg-slate-700 hover:bg-slate-800'
              : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 animate-bounce-gentle'
          }`}
          aria-label={expanded ? 'Close social menu' : 'Open social menu'}
        >
          {expanded ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6 fill-white" />
          )}
        </button>
      </div>

      {/* Inline keyframes for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite ease-in-out;
        }
        /* Add bottom padding to body on mobile so content isn't hidden behind the bar */
        @media (max-width: 767px) {
          body {
            padding-bottom: 76px !important;
          }
        }
      `}</style>
    </>
  );
}
