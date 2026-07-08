'use client';

import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Phone, 
  Clock
} from 'lucide-react';

interface DeskAdminDashboardProps {
  token: string;
}

export default function DeskAdminDashboard({ token }: DeskAdminDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'schedule' | 'fees'>('inquiries');
  
  // Form states
  const [inqForm, setInqForm] = useState({ name: '', email: '', phone: '', course: 'AI Foundations' });
  const [schedForm, setSchedForm] = useState({ name: '', time: '', teacher: '', studentsCount: '15' });
  const [actionLoading, setActionLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/dashboard/desk-admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error(err);
      // Mock Offline Fallback
      setData({
        inquiries: [
          { id: "i1", name: "Gurpreet Singh", email: "gurpreet@example.com", phone: "+91 98765 43210", course: "AI Foundations", status: "pending", date: "2026-06-25" },
          { id: "i2", name: "Simran Kaur", email: "simran@example.com", phone: "+91 99887 76655", course: "Machine Learning Deep Dive", status: "contacted", date: "2026-06-24" }
        ],
        classes: [
          { id: "c1", name: "AI Foundations (Batch A)", time: "09:00 AM - 11:00 AM", teacher: "Dr. Ananya Sharma", studentsCount: 15 },
          { id: "c2", name: "Machine Learning Deep Dive", time: "11:30 AM - 01:30 PM", teacher: "Dr. Ananya Sharma", studentsCount: 12 }
        ],
        fees: [
          { id: "f1", studentName: "Amanpreet Kaur", amount: 15000, status: "paid", dueDate: "2026-06-01", paidDate: "2026-05-30" },
          { id: "f2", studentName: "Rajveer Singh", amount: 18000, status: "pending", dueDate: "2026-07-01", paidDate: null }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleCreateInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/dashboard/desk-admin/inquiry', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(inqForm)
      });
      const result = await res.json();
      if (result.success) {
        setMsg({ type: 'success', text: 'Inquiry registered successfully!' });
        setInqForm({ name: '', email: '', phone: '', course: 'AI Foundations' });
        fetchData();
      } else {
        setMsg({ type: 'error', text: result.message || 'Error registering inquiry' });
      }
    } catch (err) {
      // Simulation Fallback
      const newInq = {
        id: 'i_' + Math.random().toString(36).substr(2, 9),
        ...inqForm,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      };
      setData((prev: any) => ({
        ...prev,
        inquiries: [newInq, ...prev.inquiries]
      }));
      setMsg({ type: 'success', text: 'Inquiry simulated successfully!' });
      setInqForm({ name: '', email: '', phone: '', course: 'AI Foundations' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/dashboard/desk-admin/schedule', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(schedForm)
      });
      const result = await res.json();
      if (result.success) {
        setMsg({ type: 'success', text: 'Class scheduled successfully!' });
        setSchedForm({ name: '', time: '', teacher: '', studentsCount: '15' });
        fetchData();
      } else {
        setMsg({ type: 'error', text: result.message || 'Error scheduling class' });
      }
    } catch (err) {
      // Simulation Fallback
      const newClass = {
        id: 'c_' + Math.random().toString(36).substr(2, 9),
        name: schedForm.name,
        time: schedForm.time,
        teacher: schedForm.teacher,
        studentsCount: parseInt(schedForm.studentsCount),
        syllabusProgress: 0
      };
      setData((prev: any) => ({
        ...prev,
        classes: [...prev.classes, newClass]
      }));
      setMsg({ type: 'success', text: 'Class schedule simulated successfully!' });
      setSchedForm({ name: '', time: '', teacher: '', studentsCount: '15' });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-650 font-bold text-sm animate-pulse">Loading Desk Operations...</div>;
  }

  const { inquiries = [], classes = [], fees = [] } = data || {};

  return (
    <div className="space-y-8">
      
      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-gray-250/20 pb-2">
        <button
          onClick={() => { setActiveTab('inquiries'); setMsg({ type: '', text: '' }); }}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-sm ${
            activeTab === 'inquiries' ? 'bg-[#6366f1] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Student Inquiries
        </button>
        <button
          onClick={() => { setActiveTab('schedule'); setMsg({ type: '', text: '' }); }}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-sm ${
            activeTab === 'schedule' ? 'bg-[#0ea5e9] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Class Scheduling
        </button>
        <button
          onClick={() => { setActiveTab('fees'); setMsg({ type: '', text: '' }); }}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-sm ${
            activeTab === 'fees' ? 'bg-[#f43f5e] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Billing & Fees
        </button>
      </div>

      {/* Message Notifications */}
      {msg.text && (
        <div className={`p-4 rounded-2xl font-bold text-xs border ${
          msg.type === 'success' 
            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-250/30' 
            : 'bg-rose-500/10 text-rose-600 border-rose-250/30'
        }`}>
          {msg.text}
        </div>
      )}

      {/* Content Areas */}
      {activeTab === 'inquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List inquiries */}
          <div className="lg:col-span-2 clay-panel bg-white p-6">
            <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Recent Admission Inquiries</h3>
            <div className="space-y-4">
              {inquiries.map((inq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-150 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-black text-gray-800 text-sm block">{inq.name}</span>
                    <span className="text-xs text-gray-500 font-extrabold block mt-1">{inq.course}</span>
                    <div className="flex gap-4 mt-2 text-[10px] text-gray-400 font-mono font-bold">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {inq.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {inq.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] self-start sm:self-center px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 font-black uppercase shadow-sm">
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Create inquiries form */}
          <div className="clay-panel bg-white p-6 h-fit">
            <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Register New Inquiry</h3>
            <form onSubmit={handleCreateInquiry} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Student Name</label>
                <input 
                  type="text" 
                  required 
                  value={inqForm.name}
                  onChange={(e) => setInqForm({ ...inqForm, name: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs" 
                  placeholder="e.g. Gurpreet Singh"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Email</label>
                <input 
                  type="email" 
                  required 
                  value={inqForm.email}
                  onChange={(e) => setInqForm({ ...inqForm, email: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs" 
                  placeholder="e.g. email@example.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Phone</label>
                <input 
                  type="tel" 
                  required 
                  value={inqForm.phone}
                  onChange={(e) => setInqForm({ ...inqForm, phone: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs" 
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Course Choice</label>
                <select 
                  value={inqForm.course}
                  onChange={(e) => setInqForm({ ...inqForm, course: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs bg-white text-gray-700 cursor-pointer font-bold"
                >
                  <option value="AI Foundations">AI Foundations</option>
                  <option value="Machine Learning Deep Dive">Machine Learning Deep Dive</option>
                  <option value="Natural Language Processing (NLP)">Natural Language Processing (NLP)</option>
                  <option value="Generative AI & Agentic Workflows">Generative AI & Agentic Workflows</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={actionLoading}
                className="w-full py-2.5 font-black text-white clay-btn-primary hover:cursor-pointer disabled:opacity-50 text-xs"
              >
                {actionLoading ? 'Saving...' : 'Add Inquiry Record'}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List Classes */}
          <div className="lg:col-span-2 clay-panel bg-white p-6">
            <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Active Class Timetable</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {classes.map((cls: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-black text-gray-800 text-sm block mb-1">{cls.name}</span>
                    <span className="text-xs text-indigo-600 font-extrabold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {cls.time}</span>
                  </div>
                  <div className="border-t border-gray-100 mt-4 pt-3 flex items-center justify-between text-[10px] text-gray-500 font-bold">
                    <span>Teacher: {cls.teacher}</span>
                    <span>Students: {cls.studentsCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Form */}
          <div className="clay-panel bg-white p-6 h-fit">
            <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Schedule New Batch</h3>
            <form onSubmit={handleCreateSchedule} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Batch / Class Name</label>
                <input 
                  type="text" 
                  required 
                  value={schedForm.name}
                  onChange={(e) => setSchedForm({ ...schedForm, name: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs" 
                  placeholder="e.g. Machine Learning Batch A"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Timing Slot</label>
                <input 
                  type="text" 
                  required 
                  value={schedForm.time}
                  onChange={(e) => setSchedForm({ ...schedForm, time: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs" 
                  placeholder="e.g. 09:00 AM - 11:00 AM"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Assigned Teacher</label>
                <input 
                  type="text" 
                  required 
                  value={schedForm.teacher}
                  onChange={(e) => setSchedForm({ ...schedForm, teacher: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs" 
                  placeholder="e.g. Dr. Ananya Sharma"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Allocated Capacity</label>
                <input 
                  type="number" 
                  required 
                  value={schedForm.studentsCount}
                  onChange={(e) => setSchedForm({ ...schedForm, studentsCount: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs" 
                  placeholder="e.g. 15"
                />
              </div>
              <button 
                type="submit" 
                disabled={actionLoading}
                className="w-full py-2.5 font-black text-white clay-btn-secondary hover:cursor-pointer disabled:opacity-50 text-xs"
              >
                {actionLoading ? 'Creating...' : 'Schedule Class'}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'fees' && (
        <div className="clay-table-wrapper">
          <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2 px-2">Student Invoicing Log</h3>
          <div className="overflow-x-auto">
            <table className="clay-table">
              <thead>
                <tr>
                  <th className="px-2">Student Name</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Receipt Log</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee: any, idx: number) => (
                  <tr key={idx}>
                    <td className="font-bold text-gray-800 text-xs px-2">{fee.studentName}</td>
                    <td className="text-xs">₹{fee.amount}</td>
                    <td>
                      <span className={`text-[9px] px-3 py-1 rounded-full border border-white font-extrabold uppercase shadow-sm ${
                        fee.status === 'paid' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="text-xs text-gray-500 font-bold">{fee.dueDate}</td>
                    <td className="text-[10px] text-gray-400 font-bold">
                      {fee.paidDate ? `Cleared on ${fee.paidDate}` : 'Pending Payment'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
