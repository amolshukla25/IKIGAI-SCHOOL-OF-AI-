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
