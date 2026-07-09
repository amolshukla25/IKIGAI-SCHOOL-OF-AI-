'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Cpu, Target, Briefcase, Zap, CheckCircle2, Factory } from 'lucide-react';
import Link from 'next/link';
import InquirySuccessModal from '@/components/InquirySuccessModal';

export default function IndustrialAIPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'Industrial AI Fellowship (Algo8 AI)' });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState({ name: '', email: '', phone: '', course: '' });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%'
          }
        }
      );
    });
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('loading');
    const capturedData = { ...formData };
    setTimeout(() => {
      setInquiryStatus('success');
      setSuccessModalData(capturedData);
      setShowSuccessModal(true);
      setFormData({ name: '', email: '', phone: '', course: 'Industrial AI Fellowship (Algo8 AI)' });
    }, 800);
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-white/10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 fade-up">
          <Link href="/" className="inline-flex items-center text-indigo-300 text-sm font-bold uppercase tracking-wider mb-8 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">In Partnership with Algo8 AI</span>
            <span className="bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 border border-white/20 rounded-full">Pre-Placement Offer (PPO)</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Industrial AI Fellowship
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium mb-10">
            Deploy machine learning pipelines for physical manufacturing systems. Transition from graduation to a highly paid Industrial Deployment Engineer.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="bg-white/10 backdrop-blur p-6 border border-white/20 min-w-[200px] rounded-2xl">
              <span className="block text-xs uppercase tracking-wider text-indigo-300 font-bold mb-1">Monthly Stipend</span>
              <span className="text-2xl font-bold text-white">₹12K - ₹15K</span>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 border border-white/20 min-w-[200px] rounded-2xl">
              <span className="block text-xs uppercase tracking-wider text-indigo-300 font-bold mb-1">Target PPO CTC</span>
              <span className="text-2xl font-bold text-white">Up to ₹9 LPA</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-24 relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">The Placement Pathway</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mb-6" />
            <p className="text-slate-600 max-w-2xl">A rigorous, performance-driven track designed explicitly for core engineers and MBA graduates who want to bridge domain expertise with modern AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="clay-card p-8 fade-up">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xl mb-6 rounded-2xl">01</div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Bootcamp</h3>
              <span className="inline-block bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-4">2 Months</span>
              <p className="text-sm text-slate-500 mb-6">
                Master Python for Data Science, IoT telemetry processing, and the basics of machine vision models.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Data Processing (Pandas/NumPy)</li>
                <li className="flex items-center gap-2 text-xs font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Sensor Signal Filtering</li>
              </ul>
            </div>

            <div className="clay-card p-8 fade-up">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xl mb-6 rounded-2xl">02</div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Internship</h3>
              <span className="inline-block bg-violet-50 text-violet-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-4">4-6 Months</span>
              <p className="text-sm text-slate-500 mb-6">
                Work onsite at Algo8 AI. Build digital twins and predictive maintenance models on live enterprise data.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Enterprise Azure AI Deployments</li>
                <li className="flex items-center gap-2 text-xs font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Defect Detection Systems</li>
              </ul>
            </div>

            <div className="clay-card p-8 fade-up border-t-4 border-indigo-500 bg-indigo-50/30">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center font-bold text-xl mb-6 rounded-2xl">03</div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Placement (PPO)</h3>
              <span className="inline-block bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-4 border border-emerald-100">Full-Time Role</span>
              <p className="text-sm text-slate-500 mb-6">
                Top performers receive Pre-Placement Offers as Industrial AI Deployment Engineers with lucrative packages.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to ₹9 LPA CTC</li>
                <li className="flex items-center gap-2 text-xs font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Industry Absorption</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Expertise */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Industrial Domains</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="clay-card p-8 fade-up flex gap-6">
              <Factory className="w-10 h-10 text-indigo-500 shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">Manufacturing Optimization</h4>
                <p className="text-sm text-slate-500">Predict equipment failure before it happens. Use machine learning to analyze vibration, temperature, and acoustic sensor data streams.</p>
              </div>
            </div>
            
            <div className="clay-card p-8 fade-up flex gap-6">
              <Cpu className="w-10 h-10 text-violet-500 shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">Computer Vision & Quality</h4>
                <p className="text-sm text-slate-500">Deploy high-speed camera networks with edge AI to detect micro-defects in real-time assembly lines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="clay-panel bg-white/70 p-8 sm:p-12 fade-up relative">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Apply for Industrial AI</h3>
              <p className="text-slate-500">Submit your application below. Ideal candidates have a background in B.Tech (Core branches) or an MBA with a technical inclination.</p>
            </div>
            
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" required 
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full clay-input text-sm" placeholder="Enter your name" 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" required 
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full clay-input text-sm" placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" required 
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full clay-input text-sm" placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <button type="submit" disabled={inquiryStatus === 'loading'} className="w-full clay-btn-primary shine mt-4 py-4 text-sm">
                {inquiryStatus === 'loading' ? 'Submitting...' : inquiryStatus === 'success' ? 'Submitted Successfully' : 'Submit Application'}
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
