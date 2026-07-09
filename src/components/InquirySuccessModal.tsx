'use client';

import React from 'react';
import { X, MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

interface InquirySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData: {
    name: string;
    email: string;
    phone: string;
    course: string;
  };
}

export default function InquirySuccessModal({ isOpen, onClose, leadData }: InquirySuccessModalProps) {
  if (!isOpen) return null;

  // Prefilled WhatsApp Text
  const waText = `Hi! I just submitted an inquiry on the Ikigai School of AI website.\n\n*My Details:*\n- *Name:* ${leadData.name}\n- *Email:* ${leadData.email}\n- *Phone:* ${leadData.phone}\n- *Interested Program:* ${leadData.course}\n\nPlease help me with the next steps!`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waText)}`;

  // Social Links
  const instagramUrl = 'https://www.instagram.com/ikigaischoolofai';
  const snapchatUrl = 'https://www.snapchat.com/add/ikigai.ai';
  const callUrl = 'tel:+919876543210';

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-md clay-panel bg-white/95 border border-slate-200 p-6 sm:p-8 shadow-2xl backdrop-blur-xl animate-clay-bounce select-none">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-3 shadow-[0_4px_12px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 block mb-1">
            Form Submitted
          </span>
          <h3 className="text-2xl font-black text-slate-800 leading-tight">
            Application Received!
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-2 max-w-xs mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-700">{leadData.name}</strong>. Connect with our admissions team directly via your preferred channel below:
          </p>
        </div>

        {/* Quick Connect Actions */}
        <div className="space-y-3">
          
          {/* WhatsApp Redirect */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 shadow-sm text-emerald-800 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-wider text-emerald-600/80 leading-none mb-1">WhatsApp</p>
                <p className="text-sm font-extrabold text-emerald-800 leading-tight">Send Prefilled Message</p>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
          </a>

          <div className="grid grid-cols-2 gap-3">
            {/* Instagram DM (Custom SVG) */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-2xl bg-rose-50/50 hover:bg-rose-50 border border-rose-100/50 text-rose-800 transition-all text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md mb-2 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <p className="text-[10px] font-black uppercase tracking-wider text-rose-600/80 mb-0.5">Instagram</p>
              <p className="text-xs font-black text-rose-800">Visit Profile</p>
            </a>

            {/* Snapchat (Custom SVG) */}
            <a
              href={snapchatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-2xl bg-yellow-50/40 hover:bg-yellow-50/80 border border-yellow-200/40 text-yellow-800 transition-all text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-slate-800 shadow-md mb-2 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-slate-800 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.75c-3.12 0-5.75 2.15-5.75 6 0 .58.07 1.34.2 2-.86.41-1.56 1.11-1.7 2-.2 1.25.75 2.25 1.5 2.5a.65.65 0 01.35.32c.11.23.11.72-.1 1.22-.38.9-.9 2.08-.2 2.68.4.35 1.5.15 2.3.05.3-.04.6-.08.9-.07.4.01.6.2.7.4.3 1.1 1.1 1.9 2.1 1.9s1.8-.8 2.1-1.9c.1-.2.3-.39.7-.4.3-.01.6.03.9.07.8.1 1.9.3 2.3-.05.7-.6.18-1.78-.2-2.68a1.2 1.2 0 01-.1-1.22c.07-.15.22-.26.35-.32.75-.25 1.7-1.25 1.5-2.5-.14-.89-.84-1.59-1.7-2 .13-.66.2-1.42.2-2 0-3.85-2.63-6-5.75-6z" />
                </svg>
              </div>
              <p className="text-[10px] font-black uppercase tracking-wider text-yellow-700/80 mb-0.5">Snapchat</p>
              <p className="text-xs font-black text-yellow-800">Add Account</p>
            </a>
          </div>

          {/* Manual Call */}
          <a
            href={callUrl}
            className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/50 shadow-sm text-indigo-800 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5 fill-white text-indigo-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-wider text-indigo-500/80 leading-none mb-1">Direct Calling</p>
              <p className="text-sm font-extrabold text-indigo-800 leading-tight">Call Admissions Desk</p>
            </div>
          </a>

        </div>

        {/* Info Footer */}
        <p className="text-[10px] text-slate-400 text-center font-bold mt-5 leading-normal">
          Or wait 24 hours — our representative will call you back on your registered phone.
        </p>

      </div>
    </div>
  );
}
