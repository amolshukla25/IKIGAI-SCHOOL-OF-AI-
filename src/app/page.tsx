'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronRight, 
  MapPin, 
  Award,
  Cpu,
  BrainCircuit,
  Target,
  Briefcase,
  Quote,
  Star,
  Mail,
  Phone,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Rocket,
  GraduationCap,
  Clock,
  Users,
  ChevronDown,
  BarChart3,
  Zap,
  CheckCircle,
  Play,
  X,
  Megaphone,
  Database,
  LineChart,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ThreeJsCanvas from '@/components/ThreeJsCanvas';

// 3D tilt-on-mouse hook — premium interactive card effect
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip tilt on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    };
    const handleLeave = () => {
      el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return ref;
}

function TiltCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useTilt();
  return (
    <div ref={ref} className={`tilt-card ${className ?? ''}`}>
      {children}
    </div>
  );
}

// Animated counter hook
function useCountUp(end: number, duration: number, startOnView: boolean) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [startOnView, end, duration]);

  return { count, ref };
}

function AnimatedStat({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { count } = useCountUp(value, 1.5, hasAnimated);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasAnimated(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="clay-card p-6 text-center group">
      <span className={`text-4xl md:text-5xl font-black block mb-2 tracking-tight ${color}`}>
        {hasAnimated ? count : 0}{suffix}
      </span>
      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] block">{label}</span>
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'AI Builder Fellowship (SapienOne + IIT Kanpur)' });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach((container) => {
      const cards = container.querySelectorAll('.stagger-item');
      gsap.fromTo(cards, 
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 82%'
          }
        }
      );
    });

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.fromTo(heroContent,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.2 }
      );
    }

    ScrollTrigger.create({
      trigger: '#courses',
      start: 'top bottom',
      onEnter: () => setShowStickyBar(true),
      onLeaveBack: () => setShowStickyBar(false),
    });

  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('loading');
    setTimeout(() => {
      setInquiryStatus('success');
      setFormData({ name: '', email: '', phone: '', course: 'AI Builder Fellowship (SapienOne + IIT Kanpur)' });
      setTimeout(() => setInquiryStatus('idle'), 4000);
    }, 800);
  };

  const scrollToContact = (programName?: string) => {
    if (programName) {
      setFormData(prev => ({ ...prev, course: programName }));
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-grow overflow-x-hidden">
      
      {/* ===== STICKY CONVERSION BAR ===== */}
      <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl transition-all duration-500 ${showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="clay-panel bg-white/80 backdrop-blur-xl px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-extrabold text-slate-700">Seats are filling fast — reserve your spot today</span>
          </div>
          <button
            onClick={() => scrollToContact()}
            className="clay-btn-primary shine !text-xs !py-2 !px-5 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Apply Now
          </button>
        </div>
      </div>

      {/* ===== 1. HERO SECTION ===== */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] overflow-hidden flex items-center py-16">
        {/* Three.js Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ThreeJsCanvas />
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-indigo-300/40 to-purple-300/30 blur-[100px] pointer-events-none animate-blob" />
        <div className="absolute bottom-[15%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-violet-300/30 to-cyan-200/30 blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-60 h-60 rounded-full bg-gradient-to-br from-cyan-200/25 to-indigo-200/20 blur-[90px] pointer-events-none animate-blob" style={{ animationDelay: '4s' }} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="hero-content">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 clay-badge bg-emerald-50 text-emerald-700 mb-8 !text-[10px] !px-4 !py-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                E&ICT Academy — IIT Kanpur Certified
              </div>

              <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-black text-slate-800 tracking-tight mb-6 leading-[1.08]">
                Launch your career in{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                  industrial AI
                </span>
                <br />
                <span className="text-slate-600">with paid internships and certified career support</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-500 font-semibold max-w-xl mb-8 leading-relaxed">
                Industry-aligned fellowships with IIT-backed certification, paid internship stipends, and placement support up to{' '}
                <span className="text-indigo-600 font-black">₹9 LPA</span>. Start with career-ready training in Digital Marketing, Data Analytics, or Data Science — and move into real AI projects from day one.
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={() => scrollToContact()}
                  className="clay-btn-primary shine !text-sm !py-3.5 !px-8 flex items-center gap-2 group"
                >
                  Secure Your Seat
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="clay-btn-secondary !text-sm !py-3.5 !px-8 flex items-center gap-2 group"
                >
                  View Programs
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </div>

              {/* Lead Magnet */}
              <div className="clay-card p-5 max-w-xl">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shrink-0 shadow-[3px_3px_10px_rgba(99,102,241,0.25)]">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 mb-1.5">Free Career Planning Session</p>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Book a one-on-one admissions call and receive a personalized AI career roadmap plus a fee waiver review, valued at ₹2,500.
                    </p>
                    <button
                      onClick={() => scrollToContact()}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors group"
                    >
                      Book Free Consultation
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Bar */}
              <div className="flex flex-wrap items-center gap-5 mt-8">
                {[
                  { icon: ShieldCheck, label: 'IIT Kanpur Certified' },
                  { icon: Briefcase, label: 'Paid Internships' },
                  { icon: Rocket, label: 'PPO-ready Career Path' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <item.icon className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side — Hero Visual with Floating Stats */}
            <div className="hidden lg:block relative hero-content px-10 py-6">
              {/* Main hero image */}
              <div className="img-frame relative aspect-[4/5] max-w-md mx-auto rounded-[32px] shadow-[12px_12px_32px_rgba(166,160,200,0.45),-8px_-8px_20px_rgba(255,255,255,0.9)] border border-white/60">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                  alt="Students collaborating on AI projects at Ikigai School of AI"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover animate-ken-burns"
                />
                {/* Play button overlay */}
                <button
                  onClick={() => setPlayVideo(true)}
                  className="absolute inset-0 z-10 flex items-center justify-center group/play cursor-pointer"
                  aria-label="Watch program overview video"
                >
                  <span className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform duration-300 animate-glow-pulse">
                    <Play className="w-6 h-6 text-indigo-600 ml-0.5" />
                  </span>
                </button>
                {/* Caption */}
                <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
                  <p className="text-white text-sm font-black drop-shadow">Watch: What our fellows build</p>
                  <p className="text-white/80 text-[11px] font-semibold">Live projects • Real deployments • Real stipends</p>
                </div>
              </div>

              {/* Floating stat cards around the image */}
              <div className="absolute -left-2 top-12 clay-card-yellow p-4 animate-float-slow z-20 !shadow-[6px_6px_18px_rgba(166,160,200,0.4)]">
                <span className="text-2xl font-black text-sky-700 block">₹45K</span>
                <span className="text-[9px] text-sky-600/80 uppercase tracking-wider font-extrabold">Program Stipend</span>
              </div>
              <div className="absolute -right-2 top-[28%] clay-card-purple p-4 animate-float-slower z-20 !shadow-[6px_6px_18px_rgba(166,160,200,0.4)]">
                <span className="text-2xl font-black text-violet-700 block">100+</span>
                <span className="text-[9px] text-violet-600/80 uppercase tracking-wider font-extrabold">Seats / Cohort</span>
              </div>
              <div className="absolute -left-4 bottom-[22%] clay-card-cyan p-4 animate-float-slower z-20 !shadow-[6px_6px_18px_rgba(166,160,200,0.4)]">
                <span className="text-2xl font-black text-cyan-700 block">5</span>
                <span className="text-[9px] text-cyan-600/80 uppercase tracking-wider font-extrabold">Career Programs</span>
              </div>
              <div className="absolute -right-4 bottom-10 clay-card-rose p-4 animate-float-slow z-20 !shadow-[6px_6px_18px_rgba(166,160,200,0.4)]">
                <span className="text-2xl font-black text-indigo-700 block">₹9L</span>
                <span className="text-[9px] text-indigo-600/80 uppercase tracking-wider font-extrabold">Max PPO CTC</span>
              </div>
            </div>
          </div>

          {/* Floating inquiry form */}
          <div className="absolute top-8 right-6 hidden lg:block">
            <div className="w-[380px] clay-panel bg-white/95 border border-slate-200 p-6 shadow-2xl backdrop-blur-md">
              <div className="mb-5">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 mb-2 block">Quick inquiry</span>
                <h3 className="text-xl font-black text-slate-800">Reserve your seat now</h3>
                <p className="text-sm text-slate-500 mt-2">Share your details and our admissions team will contact you within 24 hours.</p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full clay-input text-sm"
                  placeholder="Full name"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full clay-input text-sm"
                  placeholder="Email address"
                />
                <button
                  type="submit"
                  disabled={inquiryStatus === 'loading'}
                  className="w-full clay-btn-primary shine !py-3 !text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {inquiryStatus === 'loading' ? 'Sending...' : inquiryStatus === 'success' ? 'Request sent' : 'Get free review'}
                </button>
                {inquiryStatus === 'success' && (
                  <p className="text-xs font-semibold text-emerald-700 text-center">We will contact you within 24 hours.</p>
                )}
              </form>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-bounce">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-slate-300">Scroll</span>
            <ChevronDown className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </section>

      {/* ===== 1.5 TRUSTED BY RIBBON (Infinite Marquee) ===== */}
      <section className="py-8 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="clay-panel bg-white/50 py-5 px-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 text-center mb-4">Trusted By Industry Leaders</p>
            <div className="marquee">
              <div className="marquee-track">
                {[...Array(2)].map((_, dup) => (
                  <React.Fragment key={dup}>
                    <span className="text-lg font-black text-slate-400 whitespace-nowrap">Sapien<span className="text-indigo-500">One</span></span>
                    <span className="text-lg font-black text-slate-400 whitespace-nowrap">Algo8 <span className="text-indigo-500">AI</span></span>
                    <span className="text-lg font-black text-slate-400 whitespace-nowrap">E&ICT <span className="text-indigo-500">IIT Kanpur</span></span>
                    <span className="text-lg font-black text-slate-400 whitespace-nowrap">NSDC <span className="text-indigo-500">India</span></span>
                    <span className="text-lg font-black text-slate-400 whitespace-nowrap">Google <span className="text-indigo-500">Ads Partner</span></span>
                    <span className="text-lg font-black text-slate-400 whitespace-nowrap">Meta <span className="text-indigo-500">Blueprint</span></span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS COUNTERS ===== */}
      <section className="py-16 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10 fade-up">
            <span className="clay-badge bg-indigo-50 text-indigo-600 mx-auto mb-3">By The Numbers</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-3">Measurable Impact</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 stagger-container">
            <div className="stagger-item"><AnimatedStat value={100} suffix="+" label="Seats Per Cohort" color="text-indigo-600" /></div>
            <div className="stagger-item"><AnimatedStat value={5} suffix="" label="Career Programs" color="text-purple-600" /></div>
            <div className="stagger-item"><AnimatedStat value={3} suffix="" label="Campus Locations" color="text-cyan-600" /></div>
            <div className="stagger-item"><AnimatedStat value={9} suffix="L" label="Max PPO CTC" color="text-sky-600" /></div>
          </div>
        </div>
      </section>

      {/* ===== 3. PHILOSOPHY / IKIGAI FRAMEWORK ===== */}
      <section id="philosophy" className="relative py-20 overflow-hidden">
        {/* Background blob */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-200/20 blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14 fade-up">
            <span className="clay-badge bg-purple-50 text-purple-600 mx-auto mb-3">Our Philosophy</span>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black text-slate-800 mb-4 mt-3">The IKIGAI Framework</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-5" />
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed font-medium">
              Where <span className="text-slate-700 font-bold">passion</span>,{' '}
              <span className="text-slate-700 font-bold">skill</span>, and{' '}
              <span className="text-slate-700 font-bold">industry demand</span> converge — 
              the sweet spot where true AI mastery is born.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: Interactive Venn */}
            <div className="fade-up relative flex items-center justify-center">
              <div className="relative w-[340px] h-[340px] md:w-[380px] md:h-[380px]">
                <svg className="w-full h-full" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="180" cy="170" r="120" fill="rgba(129, 140, 248, 0.08)" stroke="rgba(129,140,248,0.4)" strokeWidth="2" strokeDasharray="8 5" className="animate-[spin_80s_linear_infinite]" style={{ transformOrigin: '180px 170px' }} />
                  <circle cx="240" cy="170" r="120" fill="rgba(168, 85, 247, 0.06)" stroke="rgba(168,85,247,0.3)" strokeWidth="2" strokeDasharray="8 5" className="animate-[spin_100s_linear_infinite_reverse]" style={{ transformOrigin: '240px 170px' }} />
                  <circle cx="210" cy="248" r="120" fill="rgba(6, 182, 212, 0.06)" stroke="rgba(6,182,212,0.32)" strokeWidth="2" strokeDasharray="8 5" className="animate-[spin_90s_linear_infinite]" style={{ transformOrigin: '210px 248px' }} />
                  <circle cx="210" cy="200" r="35" fill="url(#centerGlowClay)" />
                  <defs>
                    <radialGradient id="centerGlowClay">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
                
                <div className="absolute top-[55px] left-[55px] text-center">
                  <span className="text-indigo-500 text-xs font-black uppercase tracking-wider">Academic</span>
                  <span className="block text-slate-400 text-[10px] font-extrabold mt-1">Foundation</span>
                </div>
                <div className="absolute top-[55px] right-[50px] text-center">
                  <span className="text-purple-500 text-xs font-black uppercase tracking-wider">Industrial</span>
                  <span className="block text-slate-400 text-[10px] font-extrabold mt-1">Application</span>
                </div>
                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-center">
                  <span className="text-cyan-600 text-xs font-black uppercase tracking-wider">Personal</span>
                  <span className="block text-slate-400 text-[10px] font-extrabold mt-1">Growth</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-center">
                  <span className="text-indigo-600 text-base font-black">IKIGAI</span>
                  <span className="block text-slate-400 text-[9px] font-extrabold mt-0.5">Convergence</span>
                </div>
              </div>
            </div>

            {/* Right: Feature Blocks */}
            <div className="fade-up space-y-4 stagger-container">
              {[
                { icon: BrainCircuit, title: 'Deep Fundamentals', desc: 'Master neural networks, transformers, and the mathematics powering modern generative AI models from the ground up.', cardClass: 'clay-card-purple' },
                { icon: Target, title: 'Industrial Focus', desc: 'Apply theory to actual manufacturing pipelines, IIoT sensors, and enterprise cloud environments at scale.', cardClass: 'clay-card-cyan' },
                { icon: Award, title: 'Career Acceleration', desc: 'Graduate with certified credentials, a production-grade portfolio, and direct pathways to paid placements at leading AI companies.', cardClass: 'clay-card-emerald' },
              ].map((item, i) => (
                <div key={i} className={`stagger-item ${item.cardClass} p-5 group cursor-default`}>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center shrink-0 shadow-[2px_2px_6px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-700 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. COURSES / PROGRAMS ===== */}
      <section id="courses" className="py-20 relative">
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-200/20 blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14 fade-up">
            <span className="clay-badge bg-indigo-50 text-indigo-600 mx-auto mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Flagship Programs
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-slate-800 mt-3 mb-4">Choose Your Pathway</h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
              Two industry-integrated tracks, one mission: building production-ready AI professionals with guaranteed hands-on experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-container">
            {/* AI Builder */}
            <div className="stagger-item clay-panel bg-white/60 p-7 lg:p-9 group">
              <div className="img-frame relative h-48 mb-6 -mx-2 -mt-2">
                <Image
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop"
                  alt="AI Builder Fellowship — generative AI and LLM development"
                  fill
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-4 z-10">
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-600/80 backdrop-blur px-3 py-1.5 rounded-full">GenAI • LLMs • Agents</span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[3px_3px_10px_rgba(99,102,241,0.2)]">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="clay-badge bg-sky-50 text-sky-700">
                  <Clock className="w-3 h-3" />
                  8 Months
                </span>
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-1.5">AI Builder Fellowship</p>
              <h3 className="text-xl font-black text-slate-800 mb-3">Build a career-ready AI foundation</h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed font-medium">
                A structured journey for learners who want strong AI fundamentals, guided mentorship, and a credible route into internships and placements.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {['IIT Certification', '₹45K Stipend', 'Placement Support'].map((tag) => (
                  <span key={tag} className="clay-badge bg-indigo-50 text-indigo-600 !text-[9px]">{tag}</span>
                ))}
              </div>

              <div className="space-y-2.5 mb-6">
                {['Hands-on GenAI and LLM projects', 'Placement-ready portfolio and mentorship', 'Onsite centers in Kanpur and Ludhiana'].map((text, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <span className="text-xs font-extrabold text-slate-400">Powered by <span className="text-indigo-500">SapienOne</span></span>
                <Link 
                  href="/programs/ai-builder"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  View Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Industrial AI */}
            <div className="stagger-item clay-panel bg-white/60 p-7 lg:p-9 group relative overflow-hidden">
              {/* Featured Tag */}
              <div className="absolute -top-0 -right-0">
                <div className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-4 py-1 text-[9px] font-black uppercase tracking-[0.15em] rounded-bl-2xl flex items-center gap-1.5 shadow-[2px_2px_8px_rgba(6,182,212,0.3)]">
                  <Zap className="w-3 h-3" />
                  High Placement Rate
                </div>
              </div>

              <div className="img-frame relative h-48 mb-6 -mx-2 mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
                  alt="Industrial AI Fellowship — engineer working with industrial systems"
                  fill
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-4 z-10">
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] bg-violet-600/80 backdrop-blur px-3 py-1.5 rounded-full">IIoT • Predictive ML • Deployment</span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[3px_3px_10px_rgba(124,58,237,0.25)]">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <span className="clay-badge bg-violet-50 text-violet-600">
                  <Clock className="w-3 h-3" />
                  6-8 Months
                </span>
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-600 mb-1.5">Industrial AI Fellowship</p>
              <h3 className="text-xl font-black text-slate-800 mb-3">Solve real industrial problems with AI</h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed font-medium">
                A placement-focused fellowship for learners who want to work on predictive maintenance, industrial analytics, and operational AI systems.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {['Live Projects', '₹12K–₹15K/Month', 'PPO Pathway'].map((tag) => (
                  <span key={tag} className="clay-badge bg-violet-50 text-violet-600 !text-[9px]">{tag}</span>
                ))}
              </div>

              <div className="space-y-2.5 mb-6">
                {['Industrial ML and analytics workstreams', 'Onsite deployment-focused learning', 'Direct entry into industry-facing roles'].map((text, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <span className="text-xs font-extrabold text-slate-400">Powered by <span className="text-violet-600">Algo8 AI</span></span>
                <Link
                  href="/programs/industrial-ai"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-violet-600 hover:text-violet-700 transition-colors"
                >
                  View Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-10 fade-up">
            <p className="text-slate-400 text-sm font-semibold mb-4">Not sure which program fits you best?</p>
            <button
              onClick={() => scrollToContact()}
              className="clay-btn-primary shine !text-sm !py-3.5 !px-8 inline-flex items-center gap-2"
            >
              Get Free Counseling
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== 4.5 SIX-MONTH PROFESSIONAL COURSES ===== */}
      <section id="professional-courses" className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-cyan-200/25 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-200/25 blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14 fade-up">
            <span className="clay-badge bg-cyan-50 text-cyan-600 mx-auto mb-3">
              <Sparkles className="w-3 h-3" />
              6-Month Professional Courses
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-slate-800 mt-3 mb-4">
              Fast-Track Your Career in{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">6 Months</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full mb-5" />
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Modern, industry-equipped professional courses designed for rapid skill-building —
              with hands-on tools, live projects, and career support from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-container">
            {[
              {
                icon: Megaphone,
                badge: 'Most Popular',
                title: 'Digital Marketing',
                tagline: 'Master SEO, social media, performance ads & brand growth strategies.',
                highlights: ['Google & Meta Ads mastery', 'SEO, content & influencer marketing', 'Live campaigns with real budgets'],
                tools: ['Google Ads', 'Meta', 'GA4', 'SEMrush'],
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
                imageAlt: 'Digital marketing analytics dashboard on a laptop',
                cardClass: 'clay-card-rose',
                iconGradient: 'from-indigo-500 to-blue-500',
                accentText: 'text-indigo-600',
              },
              {
                icon: LineChart,
                badge: 'High Demand',
                title: 'Data Analytics',
                tagline: 'Turn raw data into business decisions with dashboards & insights.',
                highlights: ['Excel, SQL & Power BI dashboards', 'Business statistics & storytelling', 'Real industry datasets & case studies'],
                tools: ['SQL', 'Power BI', 'Tableau', 'Excel'],
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
                imageAlt: 'Business intelligence charts and data dashboards',
                cardClass: 'clay-card-cyan',
                iconGradient: 'from-cyan-500 to-sky-500',
                accentText: 'text-cyan-600',
              },
              {
                icon: Database,
                badge: 'Future-Proof',
                title: 'Data Science',
                tagline: 'Build ML models & AI-powered solutions from the ground up.',
                highlights: ['Python, ML & predictive modeling', 'Deep learning & GenAI foundations', 'End-to-end capstone deployment'],
                tools: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop',
                imageAlt: 'Machine learning code on a developer workstation',
                cardClass: 'clay-card-purple',
                iconGradient: 'from-violet-500 to-purple-600',
                accentText: 'text-violet-600',
              },
            ].map((course, i) => (
              <div key={i} className="stagger-item h-full">
              <TiltCard className={`${course.cardClass} p-7 group relative flex flex-col h-full`}>
                {/* Badge */}
                <div className="absolute -top-3 right-5 z-20">
                  <div className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] rounded-full flex items-center gap-1.5 shadow-[2px_2px_8px_rgba(6,182,212,0.35)]">
                    <TrendingUp className="w-3 h-3" />
                    {course.badge}
                  </div>
                </div>

                {/* Course Image */}
                <div className="img-frame relative h-40 mb-6 -mx-2 mt-2">
                  <Image
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="text-white text-[9px] font-black uppercase tracking-[0.2em] bg-slate-900/60 backdrop-blur px-3 py-1.5 rounded-full">6-Month Course</span>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.iconGradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-[3px_3px_10px_rgba(0,0,0,0.12)]`}>
                    <course.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="clay-badge bg-white/70 text-slate-500 !text-[9px]">
                    <Clock className="w-3 h-3" />
                    6 Months
                  </span>
                </div>

                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${course.accentText} mb-1.5`}>Professional Course</p>
                <h3 className="text-xl font-black text-slate-800 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-500 mb-5 leading-relaxed font-medium">{course.tagline}</p>

                <div className="space-y-2.5 mb-5">
                  {course.highlights.map((text, hi) => (
                    <div key={hi} className="flex gap-3 items-center">
                      <div className="w-5 h-5 rounded-full bg-white/70 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tools.map((tool) => (
                    <span key={tool} className="clay-badge bg-white/70 text-slate-500 !text-[9px]">{tool}</span>
                  ))}
                </div>

                <div className="mt-auto pt-5 border-t border-white/50">
                  <button
                    onClick={() => scrollToContact(`${course.title} (6-Month Professional Course)`)}
                    className="w-full clay-btn-primary shine !py-3 !text-xs flex items-center justify-center gap-2"
                  >
                    Enroll Now
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </TiltCard>
              </div>
            ))}
          </div>

          {/* Perks strip */}
          <div className="mt-10 fade-up grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: GraduationCap, text: 'Industry Certification' },
              { icon: Briefcase, text: 'Placement Assistance' },
              { icon: Users, text: 'Expert Mentors' },
              { icon: Zap, text: 'Live Projects' },
            ].map((perk, i) => (
              <div key={i} className="clay-card flex items-center gap-3 px-4 py-3.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <perk.icon className="w-4 h-4 text-indigo-500" />
                </div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">{perk.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. WHY IKIGAI / BENEFITS ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-indigo-200/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-violet-200/20 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14 fade-up">
            <span className="clay-badge bg-violet-50 text-violet-600 mx-auto mb-3">Why Ikigai</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-slate-800 mb-4 mt-3">What Sets Us Apart</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-container">
            {[
              { icon: GraduationCap, title: 'IIT Kanpur Certified', desc: 'E&ICT Academy certification adds premier academic credibility to your professional profile.', cardClass: 'clay-card-purple' },
              { icon: Briefcase, title: 'Paid Industry Internship', desc: 'Earn while you learn with real stipends — ₹45K for AI Builder, ₹12-15K/month for Industrial AI.', cardClass: 'clay-card-yellow' },
              { icon: Rocket, title: 'Placement Pathway up to ₹9L', desc: 'Top performers receive PPOs as Industrial AI Deployment Engineers with competitive CTCs.', cardClass: 'clay-card-emerald' },
              { icon: Users, title: 'Small Cohorts, Big Impact', desc: 'Limited to 100 seats per cohort ensuring personalized mentorship and peer collaboration.', cardClass: 'clay-card-cyan' },
              { icon: MapPin, title: 'Multi-City Presence', desc: 'Campus locations in Ludhiana, Kanpur, and Lucknow — learn close to home or relocate.', cardClass: 'clay-card-rose' },
              { icon: BarChart3, title: 'Live Production Deployments', desc: 'Not just theory — you deploy models to actual manufacturing and enterprise environments.', cardClass: 'clay-card-purple' },
            ].map((item, i) => (
              <div key={i} className={`stagger-item ${item.cardClass} p-6 group cursor-default`}>
                <div className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[2px_2px_6px_rgba(0,0,0,0.04)]">
                  <item.icon className="w-5 h-5 text-slate-600" />
                </div>
                <h4 className="text-sm font-black text-slate-700 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TESTIMONIALS ===== */}
      <section id="testimonials" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 fade-up">
            <span className="clay-badge bg-cyan-50 text-cyan-600 mx-auto mb-3">Testimonials</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-slate-800 mb-4 mt-3">Success Stories</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full mb-5" />
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Hear from our recent fellows who have transitioned from academic learning to deploying real-world AI models in production.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-container">
            {[
              { name: 'Aarav Sharma', role: 'AI Engineer @ Algo8 AI', quote: 'The Industrial AI Fellowship bridged the gap between my textbook ML knowledge and actual manufacturing deployments. I am now working on predictive maintenance pipelines.', stars: 5, cardClass: 'clay-card-cyan', avatar: 'https://i.pravatar.cc/96?img=12' },
              { name: 'Priya Patel', role: 'ML Researcher', quote: 'The hands-on generative AI modules using LangChain and CrewAI gave me a definitive edge in interviews. The E&ICT IIT Kanpur certification added great value to my profile.', stars: 5, cardClass: 'clay-card-purple', avatar: 'https://i.pravatar.cc/96?img=47' },
              { name: 'Rohan Verma', role: 'Full Stack AI Developer', quote: 'I was amazed at the level of mentorship provided by the SapienOne team. Moving from foundational Python to deploying LLM agents in a matter of months was an incredible journey.', stars: 5, cardClass: 'clay-card-yellow', avatar: 'https://i.pravatar.cc/96?img=68' },
            ].map((item, i) => (
              <div key={i} className={`stagger-item ${item.cardClass} p-6 group flex flex-col`}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5 font-medium italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="border-t border-white/40 pt-4 mt-auto flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/80 shadow-md shrink-0">
                    <Image src={item.avatar} alt={`Photo of ${item.name}`} fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <span className="block font-black text-slate-700 text-sm">{item.name}</span>
                    <span className="text-[10px] text-indigo-500 font-extrabold uppercase tracking-wider">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. CONTACT / ENROLLMENT ===== */}
      <section id="contact" className="py-20 relative">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-200/20 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10 fade-up">
            <span className="clay-badge bg-emerald-50 text-emerald-600 mx-auto mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Reply within 24 hours
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-slate-800 mb-4 mt-3">Start Your AI Journey Today</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">
              Fill in your details below and get a free career roadmap + fee waiver eligibility check — no strings attached.
            </p>
          </div>

          <div className="clay-panel bg-white/60 p-6 sm:p-10 lg:p-12 fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14">
              {/* Left: Info */}
              <div>
                <span className="clay-badge bg-indigo-50 text-indigo-600 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Enrollment Desk
                </span>

                <h3 className="text-xl font-black text-slate-800 mb-3">Apply for Free Career Counseling</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">
                  Share your details and we&apos;ll help you choose the right fellowship, confirm eligibility, and guide you through the next steps.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: MapPin, title: 'Campus Locations', desc: 'Ludhiana • Kanpur • Lucknow', cardClass: 'clay-card-cyan' },
                    { icon: Mail, title: 'General Inquiries', desc: 'admissions@ikigai.ai', cardClass: 'clay-card-purple' },
                    { icon: Phone, title: 'Call Desk', desc: '+91 98765 43210', cardClass: 'clay-card-rose' },
                  ].map((item, i) => (
                    <div key={i} className={`${item.cardClass} flex items-center gap-3 px-4 py-3`}>
                      <div className="w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center shrink-0 shadow-[1px_1px_4px_rgba(0,0,0,0.04)]">
                        <item.icon className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">{item.title}</p>
                        <p className="text-sm font-bold text-slate-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {['IIT Certified', 'Paid Internship', 'Placement Support'].map((tag) => (
                    <span key={tag} className="clay-badge bg-slate-50 text-slate-500 !text-[9px]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full clay-input text-sm"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full clay-input text-sm"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full clay-input text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Interested Program *</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full clay-input text-sm cursor-pointer"
                    >
                      <optgroup label="Flagship Fellowships">
                        <option value="AI Builder Fellowship (SapienOne + IIT Kanpur)">AI Builder Fellowship (SapienOne)</option>
                        <option value="Industrial AI Fellowship (Algo8 AI)">Industrial AI Fellowship (Algo8 AI)</option>
                      </optgroup>
                      <optgroup label="6-Month Professional Courses">
                        <option value="Digital Marketing (6-Month Professional Course)">Digital Marketing — 6 Months</option>
                        <option value="Data Analytics (6-Month Professional Course)">Data Analytics — 6 Months</option>
                        <option value="Data Science (6-Month Professional Course)">Data Science — 6 Months</option>
                      </optgroup>
                      <option value="Not Sure Yet">Not Sure Yet — Help Me Decide</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={inquiryStatus === 'loading'}
                    className="w-full clay-btn-primary shine !py-3.5 !text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {inquiryStatus === 'loading' ? (
                      <>Submitting<span className="animate-pulse">...</span></>
                    ) : inquiryStatus === 'success' ? (
                      <>✓ Submitted Successfully</>
                    ) : (
                      <>Submit Application <ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>

                  {inquiryStatus === 'success' && (
                    <div className="clay-card-emerald p-3 text-center">
                      <p className="text-xs font-bold text-emerald-700">✓ We will contact you within 24 hours with your free career roadmap.</p>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-400 text-center leading-relaxed font-semibold">
                    By submitting, you agree to be contacted by our admissions team. Your data is protected.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO MODAL ===== */}
      {playVideo && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPlayVideo(false)}>
          <div className="relative max-w-4xl w-full aspect-video clay-panel overflow-hidden bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
              <div className="text-center">
                <Play className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/40 text-sm font-bold">Video showcase coming soon</p>
              </div>
            </div>
            <button 
              onClick={() => setPlayVideo(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
      
    </main>
  );
}
