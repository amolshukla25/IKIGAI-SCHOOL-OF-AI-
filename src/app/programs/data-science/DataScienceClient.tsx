'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Database, BrainCircuit, Code, Zap, CheckCircle2, TrendingUp, BarChart3, Cpu } from 'lucide-react';
import Link from 'next/link';
import InquirySuccessModal from '@/components/InquirySuccessModal';

export default function DataScienceClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'Data Science (6-Month Professional Course)' });
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
      setFormData({ name: '', email: '', phone: '', course: 'Data Science (6-Month Professional Course)' });
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
          <li className="text-violet-600">Data Science</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-violet-200/20 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <span className="clay-badge bg-violet-50 text-violet-600 mb-6 inline-flex">
                <Database className="w-3 h-3" /> 6-Month Professional Course
              </span>
              <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black text-slate-800 tracking-tight mb-5 leading-[1.1]">
                Best <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Data Science</span> Course in Ludhiana
              </h1>
              <p className="text-base text-slate-500 font-semibold max-w-lg mb-6 leading-relaxed">
                Build ML models, master Python, and deploy AI-powered solutions from the ground up. Our 6-month Data Science program in <strong>Ludhiana</strong> covers everything from statistics to deep learning with <strong>end-to-end capstone projects</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Python & Pandas', 'Machine Learning', 'Deep Learning', 'GenAI Foundations', 'Capstone Project', 'Placement Support'].map(t => (
                  <span key={t} className="clay-badge bg-violet-50 text-violet-600 !text-[9px]">{t}</span>
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
                    { icon: Code, label: 'Python Programming', desc: 'NumPy, Pandas, Matplotlib' },
                    { icon: BrainCircuit, label: 'Machine Learning', desc: 'Scikit-learn & XGBoost' },
                    { icon: Cpu, label: 'Deep Learning', desc: 'TensorFlow & PyTorch' },
                    { icon: Database, label: 'SQL & Databases', desc: 'Data engineering basics' },
                  ].map((item, i) => (
                    <div key={i} className="clay-card p-4 text-center group">
                      <div className="w-10 h-10 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-violet-500" />
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
            <h2 className="text-3xl font-black text-slate-800 mb-3">Data Science Course Curriculum — Ludhiana</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Industry-aligned 6-month syllabus from fundamentals to deployment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 fade-up">
            {[
              { month: 'Month 1', title: 'Python & Mathematics', topics: ['Python programming fundamentals', 'NumPy & Pandas mastery', 'Statistics & probability', 'Linear algebra essentials'] },
              { month: 'Month 2', title: 'Data Analysis & Visualization', topics: ['Exploratory data analysis (EDA)', 'Matplotlib & Seaborn', 'SQL for data querying', 'Data cleaning techniques'] },
              { month: 'Month 3', title: 'Machine Learning Foundations', topics: ['Supervised learning algorithms', 'Regression & classification', 'Model evaluation metrics', 'Scikit-learn workflows'] },
              { month: 'Month 4', title: 'Advanced ML & Feature Engineering', topics: ['Ensemble methods & XGBoost', 'Unsupervised learning', 'Feature engineering & selection', 'Hyperparameter tuning'] },
              { month: 'Month 5', title: 'Deep Learning & GenAI', topics: ['Neural network fundamentals', 'CNNs & RNNs', 'TensorFlow & Keras', 'Intro to LLMs & transformers'] },
              { month: 'Month 6', title: 'Capstone & Career Prep', topics: ['End-to-end project deployment', 'Portfolio & GitHub showcase', 'Resume & interview preparation', 'Placement assistance'] },
            ].map((mod, i) => (
              <div key={i} className="clay-card p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-500 mb-2 block">{mod.month}</span>
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
          <h2 className="text-2xl font-black text-slate-800 text-center mb-10 fade-up">Why Learn Data Science at Ikigai Ludhiana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 fade-up">
            {[
              { icon: Zap, title: 'Real Datasets', desc: 'Work with industry datasets from manufacturing, e-commerce, and finance — not toy examples.' },
              { icon: BarChart3, title: 'Deploy Models', desc: 'Learn to deploy ML models with Flask/FastAPI and build production-ready data pipelines.' },
              { icon: TrendingUp, title: 'Career Support', desc: 'Portfolio review, mock interviews, and direct connections to data-driven companies hiring in Punjab.' },
            ].map((item, i) => (
              <div key={i} className="clay-card-purple p-6 group">
                <div className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-violet-500" />
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
            <h2 className="text-xl font-black text-slate-800 mb-2 text-center">Enroll in Data Science Course — Ludhiana</h2>
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
