'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Megaphone, BarChart3, Target, Zap, CheckCircle2, TrendingUp, Globe, Users } from 'lucide-react';
import Link from 'next/link';

export default function DigitalMarketingClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'Digital Marketing (6-Month Professional Course)' });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'loading' | 'success'>('idle');

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
    setTimeout(() => {
      setInquiryStatus('success');
      setFormData({ name: '', email: '', phone: '', course: 'Digital Marketing (6-Month Professional Course)' });
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
          <li className="text-indigo-600">Digital Marketing</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-200/20 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <span className="clay-badge bg-indigo-50 text-indigo-600 mb-6 inline-flex">
                <Megaphone className="w-3 h-3" /> 6-Month Professional Course
              </span>
              <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black text-slate-800 tracking-tight mb-5 leading-[1.1]">
                Best <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Digital Marketing</span> Course in Ludhiana
              </h1>
              <p className="text-base text-slate-500 font-semibold max-w-lg mb-6 leading-relaxed">
                Master Google Ads, Meta Ads, SEO, content marketing, and social media strategy with <strong>live campaigns using real budgets</strong>. Graduate with industry certification and placement assistance from Ikigai School of AI, Ludhiana.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Google & Meta Ads', 'SEO & Content', 'Live Campaigns', 'Placement Support', 'Industry Certification'].map(t => (
                  <span key={t} className="clay-badge bg-indigo-50 text-indigo-600 !text-[9px]">{t}</span>
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
                    { icon: Globe, label: 'Google Ads & SEO', desc: 'Search & display mastery' },
                    { icon: Target, label: 'Meta Ads', desc: 'Facebook & Instagram ads' },
                    { icon: TrendingUp, label: 'Content Marketing', desc: 'Blog, video & email' },
                    { icon: Users, label: 'Influencer Strategy', desc: 'Brand collaborations' },
                  ].map((item, i) => (
                    <div key={i} className="clay-card p-4 text-center group">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-indigo-500" />
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
            <h2 className="text-3xl font-black text-slate-800 mb-3">What You&apos;ll Learn in Our Digital Marketing Course</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">A comprehensive 6-month curriculum designed for the Ludhiana market and beyond</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 fade-up">
            {[
              { month: 'Month 1', title: 'Marketing Fundamentals & Analytics', topics: ['Digital marketing ecosystem', 'Google Analytics 4 setup', 'Marketing funnels & strategy', 'Competitor analysis tools'] },
              { month: 'Month 2', title: 'SEO & Content Marketing', topics: ['On-page & off-page SEO', 'Keyword research & strategy', 'Blog & video content creation', 'SEMrush & Ahrefs mastery'] },
              { month: 'Month 3', title: 'Google Ads & PPC', topics: ['Search & display campaigns', 'Shopping & YouTube ads', 'Bid strategies & optimization', 'Conversion tracking setup'] },
              { month: 'Month 4', title: 'Social Media & Meta Ads', topics: ['Facebook & Instagram ads', 'Audience targeting & lookalikes', 'Creative ad design', 'A/B testing frameworks'] },
              { month: 'Month 5', title: 'Email & Influencer Marketing', topics: ['Email automation & sequences', 'Influencer outreach strategy', 'Brand collaboration models', 'Community building'] },
              { month: 'Month 6', title: 'Live Campaigns & Portfolio', topics: ['Real-budget campaign management', 'Client project execution', 'Portfolio & case study creation', 'Interview prep & placement'] },
            ].map((mod, i) => (
              <div key={i} className="clay-card p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-2 block">{mod.month}</span>
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
          <h2 className="text-2xl font-black text-slate-800 text-center mb-10 fade-up">Why Choose Ikigai for Digital Marketing in Ludhiana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 fade-up">
            {[
              { icon: Zap, title: 'Live Campaigns', desc: 'Run real Google & Meta ad campaigns with actual budgets — not simulations.' },
              { icon: BarChart3, title: 'Industry Tools', desc: 'Hands-on with GA4, SEMrush, Canva, Mailchimp, HubSpot, and more.' },
              { icon: TrendingUp, title: 'Placement Assistance', desc: 'Resume building, interview prep, and direct connections to hiring agencies in Ludhiana and beyond.' },
            ].map((item, i) => (
              <div key={i} className="clay-card-purple p-6 group">
                <div className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-indigo-500" />
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
            <h2 className="text-xl font-black text-slate-800 mb-2 text-center">Enroll in Digital Marketing Course — Ludhiana</h2>
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
    </main>
  );
}
