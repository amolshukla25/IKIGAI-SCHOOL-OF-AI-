'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Award, BrainCircuit, Code, Terminal, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import InquirySuccessModal from '@/components/InquirySuccessModal';

export default function AIBuilderClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'AI Builder Fellowship (SapienOne + IIT Kanpur)' });
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
      setFormData({ name: '', email: '', phone: '', course: 'AI Builder Fellowship (SapienOne + IIT Kanpur)' });
    }, 800);
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-white/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 fade-up">
          <Link href="/" className="inline-flex items-center text-indigo-300 text-sm font-bold uppercase tracking-wider mb-8 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Powered by SapienOne</span>
            <span className="bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 border border-white/20 rounded-full">E&ICT IIT Kanpur Certified</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI Builder Fellowship
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium mb-10">
            A specialized 8-month cohort program bridging abstract academic logic with highly complex, production-ready Generative AI systems.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="bg-white/10 backdrop-blur p-6 border border-white/20 min-w-[200px] rounded-2xl">
              <span className="block text-xs uppercase tracking-wider text-indigo-300 font-bold mb-1">Duration</span>
              <span className="text-2xl font-bold text-white">8 Months</span>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 border border-white/20 min-w-[200px] rounded-2xl">
              <span className="block text-xs uppercase tracking-wider text-indigo-300 font-bold mb-1">Total Stipend</span>
              <span className="text-2xl font-bold text-white">₹45,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-24 relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">The Fellowship Pathway</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mb-6" />
            <p className="text-slate-500 max-w-2xl">This is not a standard classroom course. You are treated as a junior engineer from day one, pushing code to actual repositories.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="clay-card p-10 fade-up">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xl mb-6 rounded-2xl">01</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Phase 1: Bootcamp</h3>
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded-full mb-6">2 Months Foundation</span>
              <p className="text-slate-500 mb-6">
                Intensive daily lab sessions focusing on advanced Python, linear algebra for ML, and core machine learning fundamentals. You will build and train models from scratch.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Data Structures & Python OOP</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> PyTorch & TensorFlow Basics</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Statistics & Probability Models</li>
              </ul>
            </div>

            <div className="clay-card p-10 fade-up">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center font-bold text-xl mb-6 rounded-2xl">02</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Phase 2: Paid Internship</h3>
              <span className="inline-block bg-violet-50 text-violet-600 text-xs font-bold uppercase px-3 py-1 rounded-full mb-6">6 Months Live Operations</span>
              <p className="text-slate-500 mb-6">
                Transition into the internship phase where you work alongside SapienOne engineers. You will be paid a total program stipend of ₹45,000 during this phase.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> LLM Finetuning & Prompt Engineering</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Agent Systems (CrewAI)</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> API Deployment & Docker</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Core Competencies</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="clay-card p-8 fade-up hover:border-indigo-200 transition-colors">
              <Code className="w-8 h-8 text-indigo-500 mb-6" />
              <h4 className="text-xl font-bold text-slate-800 mb-3">Vector Databases</h4>
              <p className="text-sm text-slate-500">Master Pinecone, ChromaDB, and FAISS for semantic search and Retrieval-Augmented Generation (RAG) pipelines.</p>
            </div>
            <div className="clay-card p-8 fade-up hover:border-violet-200 transition-colors">
              <BrainCircuit className="w-8 h-8 text-violet-500 mb-6" />
              <h4 className="text-xl font-bold text-slate-800 mb-3">Transformer Architectures</h4>
              <p className="text-sm text-slate-500">Deep dive into Attention mechanisms, tokenization strategies, and huggingface model implementations.</p>
            </div>
            <div className="clay-card p-8 fade-up hover:border-cyan-200 transition-colors">
              <Terminal className="w-8 h-8 text-cyan-500 mb-6" />
              <h4 className="text-xl font-bold text-slate-800 mb-3">AI Agents</h4>
              <p className="text-sm text-slate-500">Build autonomous agents that can browse the web, write code, and solve complex multi-step reasoning tasks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="clay-panel bg-white/70 p-8 sm:p-12 fade-up relative">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Apply for AI Builder</h3>
              <p className="text-slate-500">Submit your details below. Only 100 seats are available per cohort across our Ludhiana, Kanpur, and Lucknow centers.</p>
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
