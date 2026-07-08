'use client';

import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

interface CentreHeadDashboardProps {
  token: string;
}

export default function CentreHeadDashboard({ token }: CentreHeadDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/centre-head', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error(err);
        // Load mock offline data
        setData({
          stats: {
            totalRevenue: 285000,
            pendingRevenue: 75000,
            studentsCount: 124,
            teachersCount: 9,
            classesCount: 4,
            conversionRate: '72%'
          },
          monthlyRevenue: [
            { month: 'Jan', amount: 120000 },
            { month: 'Feb', amount: 150000 },
            { month: 'Mar', amount: 180000 },
            { month: 'Apr', amount: 220000 },
            { month: 'May', amount: 250000 },
            { month: 'Jun', amount: 285000 }
          ],
          recentInquiries: [
            { id: "i1", name: "Gurpreet Singh", email: "gurpreet@example.com", phone: "+91 98765 43210", course: "AI Foundations", status: "pending", date: "2026-06-25" },
            { id: "i2", name: "Simran Kaur", email: "simran@example.com", phone: "+91 99887 76655", course: "Machine Learning Deep Dive", status: "contacted", date: "2026-06-24" },
            { id: "i3", name: "Rohan Khanna", email: "rohan@example.com", phone: "+91 95432 12345", course: "Generative AI", status: "pending", date: "2026-06-23" }
          ],
          classes: [
            { id: "c1", name: "AI Foundations (Batch A)", time: "09:00 AM - 11:00 AM", teacher: "Dr. Ananya Sharma", studentsCount: 15, syllabusProgress: 65 },
            { id: "c2", name: "Machine Learning Deep Dive", time: "11:30 AM - 01:30 PM", teacher: "Dr. Ananya Sharma", studentsCount: 12, syllabusProgress: 40 },
            { id: "c3", name: "Natural Language Processing", time: "02:30 PM - 04:30 PM", teacher: "Prof. Vikram Malhotra", studentsCount: 18, syllabusProgress: 80 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return <div className="text-gray-650 font-bold text-sm animate-pulse">Loading Analytics Data...</div>;
  }

  const { stats, monthlyRevenue, recentInquiries, classes } = data || {};

  return (
    <div className="space-y-8">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="clay-card-cyan p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-gray-500 uppercase tracking-wider block">Total Collections</span>
            <span className="text-2xl font-black text-gray-800 mt-1 block">₹{(stats.totalRevenue).toLocaleString()}</span>
            <div className="flex items-center gap-1 mt-2 text-indigo-700 text-xs font-extrabold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
            <DollarSign className="w-6 h-6 text-sky-600" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="clay-card-rose p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-gray-500 uppercase tracking-wider block">Pending Collections</span>
            <span className="text-2xl font-black text-gray-800 mt-1 block">₹{(stats.pendingRevenue).toLocaleString()}</span>
            <div className="flex items-center gap-1 mt-2 text-rose-700 text-xs font-extrabold">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>12 students outstanding</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
            <Clock className="w-6 h-6 text-rose-600" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="clay-card-yellow p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-gray-500 uppercase tracking-wider block">Total Cohorts</span>
            <span className="text-2xl font-black text-gray-800 mt-1 block">{stats.studentsCount} Students</span>
            <div className="flex items-center gap-1 mt-2 text-amber-700 text-xs font-extrabold">
              <span>{stats.classesCount} Active batches</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="clay-card-purple p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-gray-500 uppercase tracking-wider block">Conversion Rate</span>
            <span className="text-2xl font-black text-gray-800 mt-1 block">{stats.conversionRate}</span>
            <div className="flex items-center gap-1 mt-2 text-indigo-700 text-xs font-extrabold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>8 new signups today</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

      </div>

      {/* Grid: SVG Revenue Graph & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue SVG Graph */}
        <div className="lg:col-span-2 clay-panel bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-gray-800 text-base">Monthly Revenue Progress</h3>
            <span className="clay-badge bg-indigo-50 text-indigo-600">Quarterly Overview</span>
          </div>

          {/* Simple Clean Responsive SVG Chart */}
          <div className="w-full h-64 relative">
            <svg viewBox="0 0 500 200" className="w-full h-full">
              {/* Grid lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f3f4f6" strokeWidth="2" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="#f3f4f6" strokeWidth="2" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f3f4f6" strokeWidth="2" />
              
              {/* Path line representing monthly data */}
              <path
                d="M 60,160 L 140,140 L 220,120 L 300,90 L 380,70 L 460,50"
                fill="none"
                stroke="url(#chart-grad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Area under the graph */}
              <path
                d="M 60,160 L 140,140 L 220,120 L 300,90 L 380,70 L 460,50 L 460,180 L 60,180 Z"
                fill="url(#chart-area-grad)"
              />

              {/* Points */}
              {[
                { x: 60, y: 160 },
                { x: 140, y: 140 },
                { x: 220, y: 120 },
                { x: 300, y: 90 },
                { x: 380, y: 70 },
                { x: 460, y: 50 }
              ].map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="6" fill="#6366f1" stroke="#ffffff" strokeWidth="3" className="shadow" />
              ))}

              <defs>
                <linearGradient id="chart-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="chart-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(99, 102, 241, 0.15)" />
                  <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* X Axis Labels */}
            <div className="flex justify-between text-[10px] text-gray-500 font-extrabold px-10 mt-2">
              {monthlyRevenue.map((r: any, idx: number) => (
                <span key={idx} className="clay-badge text-[9px]">{r.month} (₹{Math.floor(r.amount/1000)}k)</span>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Inquiries */}
        <div className="clay-panel bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-gray-800 text-base">Admissions Pipeline</h3>
            <span className="clay-badge bg-rose-50 text-rose-600">New Leads</span>
          </div>

          <div className="space-y-4">
            {recentInquiries.map((inq: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-150 shadow-sm flex items-center justify-between">
                <div>
                  <span className="font-black text-gray-850 text-xs block">{inq.name}</span>
                  <span className="text-[10px] text-gray-500 font-bold block mt-0.5">{inq.course}</span>
                  <span className="text-[9px] text-gray-400 font-bold block mt-0.5">{inq.date}</span>
                </div>
                <span className={`text-[10px] px-3 py-1 rounded-full border border-white font-extrabold shadow-sm ${
                  inq.status === 'pending' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-sky-100 text-sky-700'
                }`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cohorts / Classes Status */}
      <div className="clay-panel bg-white p-6">
        <h3 className="font-black text-gray-800 text-base mb-6">Active Batches Progression</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((cls: any, idx: number) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#fafafa] border border-gray-100 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-black text-gray-800 text-sm block mb-1">{cls.name}</span>
                <span className="text-xs text-gray-500 font-bold block mb-4">{cls.teacher} | {cls.time}</span>
              </div>
              <div className="border-t border-gray-250/20 pt-3 mt-2">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-gray-500">Syllabus Completion</span>
                  <span className="text-indigo-600 font-black">{cls.syllabusProgress}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white border border-gray-200 h-4 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full" 
                    style={{ width: `${cls.syllabusProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
