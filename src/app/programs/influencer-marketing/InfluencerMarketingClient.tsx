'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Sparkles, Camera, Heart, Star, CheckCircle2, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import InquirySuccessModal from '@/components/InquirySuccessModal';

export default function InfluencerMarketingClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'Influencer Marketing (6-Month Professional Course)' });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState({ name: '', email: '', phone: '', course: '' });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('loading');
    const capturedData = { ...formData };
    setTimeout(() => {
      setInquiryStatus('success');
      setSuccessModalData(capturedData);
      setShowSuccessModal(true);
      setFormData({ name: '', email: '', phone: '', course: 'Influencer Marketing (6-Month Professional Course)' });
      setTimeout(() => setInquiryStatus('idle'), 4000);
    }, 800);
  };

  return (
    <main className="flex-grow overflow-x-hidden">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-6 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <li><Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li><Link href="/#professional-courses" className="hover:text-indigo-500 transition-colors">Courses</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-pink-600">Influencer Marketing</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-200/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-200/20 blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <span className="clay-badge bg-pink-50 text-pink-600 mb-6 inline-flex">
                <Sparkles className="w-3 h-3" /> 6-Month Professional Course
              </span>
              <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black text-slate-800 tracking-tight mb-5 leading-[1.1]">
                Best <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">Influencer Marketing</span> Course in Ludhiana
              </h1>
              <p className="text-base text-slate-500 font-semibold max-w-lg mb-6 leading-relaxed">
                Build your personal brand, grow your audience on <strong>Instagram & YouTube</strong>, learn brand collaboration strategies, and master <strong>content monetization</strong>. The only influencer marketing course in Ludhiana with live campaign experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Personal Branding', 'Content Creation', 'Instagram Growth', 'YouTube Strategy', 'Brand Deals', 'Monetization'].map(t => (
                  <span key={t} className="clay-badge bg-pink-50 text-pink-600 !text-[9px]">{t}</span>
                ))}
              </div>
              <a href="#enroll" className="clay-btn-primary shine !text-sm !py-3.5 !px-8 inline-flex items-center gap-2">
                Enroll Now <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="fade-up hidden lg:block">
              <div className="clay-panel bg-white/60 p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Camera, label: 'Content Creation', desc: 'Reels, stories & long-form' },
                    { icon: Heart, label: 'Audience Growth', desc: 'Organic & paid strategies' },
                    { icon: Star, label: 'Brand Collaborations', desc: 'Pitching & deal negotiation' },
                    { icon: TrendingUp, label: 'Monetization', desc: 'Multiple revenue streams' },
                  ].map((item, i) => (
                    <div key={i} className="clay-card p-4 text-center group">
                      <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-pink-500" />
                      </div>
                      <p className="text-xs font-black text-slate-700">{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 fade-up">
            <h2 className="text-3xl font-black text-slate-800 mb-3">Influencer Marketing Course Curriculum — Ludhiana</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">From zero followers to brand partnerships in 6 months</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 fade-up">
            {[
              { month: 'Month 1', title: 'Personal Branding Foundations', topics: ['Defining your niche & persona', 'Profile optimization (IG, YT, LinkedIn)', 'Brand voice & visual identity', 'Content pillars strategy'] },
              { month: 'Month 2', title: 'Content Creation Mastery', topics: ['Reels & short-form video', 'Photography & editing basics', 'Storytelling frameworks', 'Tools: Canva, CapCut, Lightroom'] },
              { month: 'Month 3', title: 'Instagram Growth Strategies', topics: ['Algorithm deep-dive', 'Hashtag & SEO optimization', 'Engagement & community building', 'Instagram Ads for creators'] },
              { month: 'Month 4', title: 'YouTube & Multi-Platform', topics: ['YouTube channel strategy', 'Long-form video production', 'Thumbnails & titles that convert', 'Cross-platform repurposing'] },
              { month: 'Month 5', title: 'Brand Collaborations & Deals', topics: ['Building a media kit', 'Pitching to brands', 'Negotiating rates & contracts', 'UGC & affiliate marketing'] },
              { month: 'Month 6', title: 'Monetization & Business', topics: ['Multiple revenue streams', 'Digital products & courses', 'Building a personal business', 'Portfolio & career pathway'] },
            ].map((mod, i) => (
              <div key={i} className="clay-card p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 mb-2 block">{mod.month}</span>
                <h3 className="text-sm font-black text-slate-800 mb-3">{mod.title}</h3>
                <ul className="space-y-2">
                  {mod.topics.map((t, ti) => (
                    <li key={ti} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-black text-slate-800 text-center mb-10 fade-up">Why Learn Influencer Marketing at Ikigai Ludhiana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 fade-up">
            {[
              { icon: Zap, title: 'Live Brand Campaigns', desc: 'Work on real brand campaigns — create content, manage deliverables, and build your portfolio.' },
              { icon: Users, title: 'Network of Creators', desc: 'Join a community of aspiring creators in Ludhiana. Collaborate, learn, and grow together.' },
              { icon: TrendingUp, title: 'Monetization Fast-Track', desc: 'Learn to monetize from day one — UGC, affiliate marketing, brand deals, and digital products.' },
            ].map((item, i) => (
              <div key={i} className="clay-card-rose p-6 group">
                <div className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-sm font-black text-slate-700 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll" className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="clay-panel bg-white/60 p-8 fade-up">
            <h2 className="text-xl font-black text-slate-800 mb-2 text-center">Enroll in Influencer Marketing Course — Ludhiana</h2>
            <p className="text-sm text-slate-500 text-center mb-6 font-medium">Fill in your details for a free career counseling session</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full clay-input text-sm" placeholder="Full Name" />
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full clay-input text-sm" placeholder="Email Address" />
              <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full clay-input text-sm" placeholder="Phone Number" />
              <button type="submit" disabled={inquiryStatus === 'loading'} className="w-full clay-btn-primary shine !py-3.5 !text-sm">
                {inquiryStatus === 'loading' ? 'Sending...' : inquiryStatus === 'success' ? '✓ Submitted!' : 'Get Free Counseling'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Inquiry Lead Connect Modal */}
      <InquirySuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        leadData={successModalData}
      />
    </main>
  );
}
