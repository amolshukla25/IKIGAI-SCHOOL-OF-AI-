'use client';

import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20courses%20at%20Ikigai%20School%20of%20AI.%20Please%20share%20more%20details!',
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
