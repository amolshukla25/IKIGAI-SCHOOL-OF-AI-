'use client';

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  BadgeAlert
} from 'lucide-react';

interface StudentDashboardProps {
  token: string;
}

export default function StudentDashboard({ token }: StudentDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/student', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error(err);
        // Load mock offline student data
        setData({
          grades: [
            { id: "g1", subject: "AI Foundations", score: 92, grade: "A+", date: "2026-06-15" },
            { id: "g2", subject: "Machine Learning Basics", score: 88, grade: "A", date: "2026-06-20" }
          ],
          fees: [
            { id: "f1", amount: 15000, status: "paid", dueDate: "2026-06-01", paidDate: "2026-05-30" },
            { id: "f2", amount: 15000, status: "pending", dueDate: "2026-07-01", paidDate: null }
          ],
          attendance: [
            { date: "2026-06-22", classId: "c1", status: "Present" },
            { date: "2026-06-23", classId: "c1", status: "Present" },
            { date: "2026-06-24", classId: "c1", status: "Absent" },
            { date: "2026-06-25", classId: "c1", status: "Present" }
          ],
          classes: [
            { id: "c1", name: "AI Foundations (Batch A)", time: "09:00 AM - 11:00 AM", teacher: "Dr. Ananya Sharma" },
            { id: "c2", name: "Machine Learning Deep Dive", time: "11:30 AM - 01:30 PM", teacher: "Dr. Ananya Sharma" }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return <div className="text-gray-650 font-bold text-sm animate-pulse">Loading Student Profile...</div>;
  }

  const { grades = [], fees = [], attendance = [], classes = [] } = data || {};

  // Calculate attendance statistics
  const totalAtt = attendance.length;
  const presentCount = attendance.filter((a: any) => a.status === 'Present').length;
  const attendanceRate = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 100;

  return (
    <div className="space-y-8">
      
      {/* Overview stats: Attendance Meter & Fees Alert */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Attendance progress card */}
        <div className="clay-card-cyan p-6 flex items-center justify-between col-span-1">
          <div>
            <span className="text-xs font-black text-gray-500 block uppercase tracking-wider">My Attendance</span>
            <span className="text-2xl font-black text-gray-800 mt-1 block">{attendanceRate}% Rate</span>
            <span className="text-[10px] text-gray-500 font-bold mt-2 block">{presentCount} present out of {totalAtt} classes</span>
          </div>
          {/* Circular SVG Progress */}
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full transform -rotate-90 animate-pulse" viewBox="0 0 36 36">
              <path
                className="text-white/30"
                strokeWidth="4.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600"
                strokeWidth="4.5"
                strokeDasharray={`${attendanceRate}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gray-800">
              {attendanceRate}%
            </div>
          </div>
        </div>

        {/* Pending fee invoice highlight */}
        {fees.find((f: any) => f.status === 'pending') ? (
          <div className="clay-card-yellow p-6 col-span-1 md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider block flex items-center gap-1.5">
                <BadgeAlert className="w-4 h-4 text-amber-700 animate-bounce" /> Pending Tuition Fee Invoice
              </span>
              <span className="text-xl font-black text-gray-800 mt-2 block">₹{(fees.find((f: any) => f.status === 'pending')?.amount || 15000).toLocaleString()}</span>
              <span className="text-[10px] text-gray-500 font-bold block mt-1">Due on: {fees.find((f: any) => f.status === 'pending')?.dueDate}</span>
            </div>
            <button className="px-5 py-2.5 rounded-full text-xs font-black text-gray-800 border border-gray-100 bg-white hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
              Pay Online
            </button>
          </div>
        ) : (
          <div className="clay-card-cyan bg-[#2ecc71]/10 border border-[#2ecc71]/20 p-6 col-span-1 md:col-span-2 flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-[#155724] uppercase tracking-wider block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#155724]" /> Financials Clear
              </span>
              <p className="text-xs text-[#155724] font-bold mt-2">All tuition fees paid. Thank you!</p>
            </div>
          </div>
        )}

      </div>

      {/* Grid: Timetable & Personal Gradebook */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Class Timetable */}
        <div className="lg:col-span-1 clay-panel bg-white p-6">
          <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Today's Timetable</h3>
          <div className="space-y-4">
            {classes.map((cls: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-150 shadow-sm">
                <span className="text-xs text-indigo-650 font-black uppercase tracking-wider block mb-1">{cls.time}</span>
                <span className="font-black text-gray-800 text-sm block mb-3">{cls.name}</span>
                <span className="text-[10px] text-gray-500 font-bold block">Instructor: {cls.teacher}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gradebook Ledger */}
        <div className="lg:col-span-2 clay-table-wrapper">
          <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2 px-2">Academic Gradebook Ledger</h3>
          <div className="overflow-x-auto">
            <table className="clay-table">
              <thead>
                <tr>
                  <th className="px-2">Assessment Course</th>
                  <th>Obtained Score</th>
                  <th>Final Grade</th>
                  <th>Entry Date</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g: any, idx: number) => (
                  <tr key={idx}>
                    <td className="font-bold text-gray-800 text-xs px-2">{g.subject}</td>
                    <td className="text-xs font-black text-indigo-650">{g.score}/100</td>
                    <td>
                      <span className="text-[10px] px-3 py-1 rounded-full border border-white font-extrabold bg-[#f1f0ff] text-[#6366f1] shadow-sm animate-pulse">
                        {g.grade}
                      </span>
                    </td>
                    <td className="text-xs text-gray-400 font-bold">{g.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Attendance Log History */}
      <div className="clay-panel bg-white p-6">
        <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Class Attendance Logs</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {attendance.map((att: any, idx: number) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm ${
                att.status === 'Present' 
                  ? 'bg-[#2ecc71]/10 border-[#2ecc71]/20 text-[#155724]' 
                  : 'bg-rose-500/10 border-rose-200 text-rose-600'
              }`}
            >
              <div>
                <span className="text-[10px] text-gray-450 font-bold block">{att.date}</span>
                <span className="text-xs font-black text-gray-800 block mt-0.5 font-sans">AI Lecture</span>
              </div>
              <span className="text-[10px] uppercase font-black">{att.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
