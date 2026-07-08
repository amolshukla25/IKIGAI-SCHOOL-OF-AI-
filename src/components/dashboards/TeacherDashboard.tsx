'use client';

import React, { useEffect, useState } from 'react';
import { 
  Clock
} from 'lucide-react';

interface TeacherDashboardProps {
  token: string;
}

export default function TeacherDashboard({ token }: TeacherDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'classes' | 'attendance' | 'grades'>('classes');
  
  // Form states
  const [attForm, setAttForm] = useState<{ classId: string; date: string; present: string[] }>({
    classId: '',
    date: new Date().toISOString().split('T')[0],
    present: []
  });
  
  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    subject: 'AI Foundations',
    score: '90',
    grade: 'A+'
  });
  
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [progressVal, setProgressVal] = useState<number>(0);

  const [actionLoading, setActionLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/dashboard/teacher', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        if (result.data.classes.length > 0) {
          setAttForm(prev => ({ ...prev, classId: result.data.classes[0].id }));
          setSelectedClassId(result.data.classes[0].id);
          setProgressVal(result.data.classes[0].syllabusProgress || 0);
        }
        if (result.data.students.length > 0) {
          setGradeForm(prev => ({ ...prev, studentId: result.data.students[0].id }));
        }
      }
    } catch (err) {
      console.error(err);
      // Offline fallback
      const mockClasses = [
        { id: "c1", name: "AI Foundations (Batch A)", time: "09:00 AM - 11:00 AM", teacher: "Dr. Ananya Sharma", studentsCount: 15, syllabusProgress: 65 },
        { id: "c2", name: "Machine Learning Deep Dive", time: "11:30 AM - 01:30 PM", teacher: "Dr. Ananya Sharma", studentsCount: 12, syllabusProgress: 40 }
      ];
      const mockStudents = [
        { id: "u_student1", name: "Amanpreet Kaur" },
        { id: "u_student2", name: "Jobanpreet Singh" },
        { id: "u_student3", name: "Simranjeet Kaur" }
      ];
      setData({
        classes: mockClasses,
        students: mockStudents,
        grades: [
          { id: "g1", studentName: "Amanpreet Kaur", subject: "AI Foundations", score: 92, grade: "A+", date: "2026-06-15" }
        ],
        attendance: []
      });
      setAttForm(prev => ({ ...prev, classId: mockClasses[0].id }));
      setSelectedClassId(mockClasses[0].id);
      setProgressVal(mockClasses[0].syllabusProgress);
      setGradeForm(prev => ({ ...prev, studentId: mockStudents[0].id }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleAttendanceChange = (studentId: string) => {
    setAttForm(prev => {
      const isPresent = prev.present.includes(studentId);
      const newPresent = isPresent 
        ? prev.present.filter(id => id !== studentId) 
        : [...prev.present, studentId];
      return { ...prev, present: newPresent };
    });
  };

  const handleSaveAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const absentList = (data.students || [])
        .map((s: any) => s.id)
        .filter((id: string) => !attForm.present.includes(id));

      const res = await fetch('http://localhost:5000/api/dashboard/teacher/attendance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          classId: attForm.classId,
          date: attForm.date,
          present: attForm.present,
          absent: absentList
        })
      });
      const result = await res.json();
      if (result.success) {
        setMsg({ type: 'success', text: 'Attendance recorded successfully!' });
        fetchData();
      } else {
        setMsg({ type: 'error', text: result.message || 'Error recording attendance' });
      }
    } catch (err) {
      setMsg({ type: 'success', text: 'Attendance simulated locally!' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/dashboard/teacher/grades', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(gradeForm)
      });
      const result = await res.json();
      if (result.success) {
        setMsg({ type: 'success', text: 'Grade registered successfully!' });
        fetchData();
      } else {
        setMsg({ type: 'error', text: result.message || 'Error recording grade' });
      }
    } catch (err) {
      // Simulation Fallback
      const matchStud = data.students.find((s: any) => s.id === gradeForm.studentId);
      const newGrade = {
        id: 'g_' + Math.random().toString(36).substr(2, 9),
        studentName: matchStud ? matchStud.name : 'Unknown Student',
        subject: gradeForm.subject,
        score: parseInt(gradeForm.score),
        grade: gradeForm.grade,
        date: new Date().toISOString().split('T')[0]
      };
      setData((prev: any) => ({
        ...prev,
        grades: [newGrade, ...prev.grades]
      }));
      setMsg({ type: 'success', text: 'Grade simulated successfully!' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProgress = async () => {
    if (!selectedClassId) return;
    setActionLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/dashboard/teacher/progress', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ classId: selectedClassId, progress: progressVal })
      });
      const result = await res.json();
      if (result.success) {
        setMsg({ type: 'success', text: 'Syllabus progress updated!' });
        fetchData();
      } else {
        setMsg({ type: 'error', text: result.message || 'Error updating progress' });
      }
    } catch (err) {
      setData((prev: any) => {
        const updated = prev.classes.map((c: any) => 
          c.id === selectedClassId ? { ...c, syllabusProgress: progressVal } : c
        );
        return { ...prev, classes: updated };
      });
      setMsg({ type: 'success', text: 'Progress update simulated locally!' });
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-650 font-bold text-sm animate-pulse">Loading Academic Cohorts...</div>;
  }

  const { classes = [], students = [], grades = [] } = data || {};

  return (
    <div className="space-y-8">
      
      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-gray-250/20 pb-2">
        <button
          onClick={() => { setActiveTab('classes'); setMsg({ type: '', text: '' }); }}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-sm ${
            activeTab === 'classes' ? 'bg-[#6366f1] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          My Batches
        </button>
        <button
          onClick={() => { setActiveTab('attendance'); setMsg({ type: '', text: '' }); }}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-sm ${
            activeTab === 'attendance' ? 'bg-[#0ea5e9] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Attendance Ledger
        </button>
        <button
          onClick={() => { setActiveTab('grades'); setMsg({ type: '', text: '' }); }}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-sm ${
            activeTab === 'grades' ? 'bg-[#f43f5e] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Student Grading
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
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batches list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="clay-panel bg-white p-6">
              <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Active Batches Overview</h3>
              <div className="space-y-6">
                {classes.map((cls: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-150 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-gray-800 text-sm">{cls.name}</span>
                      <span className="text-xs text-gray-500 font-extrabold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {cls.time}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-bold block mb-4">Total enrolled students: {cls.studentsCount}</span>
                    
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between items-center text-xs font-bold mb-2">
                        <span className="text-gray-500">Syllabus Progress</span>
                        <span className="text-indigo-650 font-black">{cls.syllabusProgress}%</span>
                      </div>
                      <div className="w-full bg-white border border-gray-200 h-4 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full" style={{ width: `${cls.syllabusProgress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Update Progress Slider Form */}
          <div className="clay-panel bg-white p-6 h-fit">
            <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Update Progress</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Select Batch</label>
                <select 
                  value={selectedClassId}
                  onChange={(e) => {
                    setSelectedClassId(e.target.value);
                    const matched = classes.find((c: any) => c.id === e.target.value);
                    if (matched) setProgressVal(matched.syllabusProgress || 0);
                  }}
                  className="w-full px-3 py-2.5 clay-input text-xs bg-white text-gray-700 cursor-pointer font-bold"
                >
                  {classes.map((c: any, idx: number) => (
                    <option key={idx} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-2">Progress Percentage ({progressVal}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100"
                  value={progressVal}
                  onChange={(e) => setProgressVal(parseInt(e.target.value))}
                  className="w-full h-3 bg-white border border-gray-200 rounded-full appearance-none cursor-pointer accent-[#6366f1]"
                />
              </div>

              <button 
                type="button"
                onClick={handleUpdateProgress}
                className="w-full py-2.5 font-black text-white clay-btn-primary hover:cursor-pointer text-xs"
              >
                Save Progress Update
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="clay-panel bg-white p-6">
          <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Submit Daily Attendance</h3>
          <form onSubmit={handleSaveAttendance} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Target Class</label>
                <select 
                  value={attForm.classId}
                  onChange={(e) => setAttForm({ ...attForm, classId: e.target.value })}
                  className="w-full px-3 py-2.5 clay-input text-xs bg-white text-gray-700 cursor-pointer font-bold"
                >
                  {classes.map((c: any, idx: number) => (
                    <option key={idx} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Calendar Date</label>
                <input 
                  type="date" 
                  required 
                  value={attForm.date}
                  onChange={(e) => setAttForm({ ...attForm, date: e.target.value })}
                  className="w-full px-3 py-2.5 clay-input text-xs" 
                />
              </div>
            </div>

            {/* Attendance checklist */}
            <div className="p-4 rounded-2xl bg-white border border-gray-150 shadow-sm">
              <span className="text-xs font-black text-gray-700 mb-4 block">Student Roster Checkmark (Check if Present)</span>
              <div className="space-y-3">
                {students.map((student: any, idx: number) => {
                  const isChecked = attForm.present.includes(student.id);
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleAttendanceChange(student.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                        isChecked 
                          ? 'bg-[#2ecc71]/20 text-[#155724] border-[#2ecc71]/30 font-black' 
                          : 'bg-white border-gray-150 text-gray-500'
                      }`}
                    >
                      <span className="text-xs font-black">{student.name}</span>
                      <span className="text-[10px] uppercase font-black">
                        {isChecked ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={actionLoading}
              className="px-6 py-3 font-black text-white clay-btn-primary hover:cursor-pointer disabled:opacity-50 text-xs"
            >
              {actionLoading ? 'Saving...' : 'Submit Attendance Check'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'grades' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grades log list */}
          <div className="lg:col-span-2 clay-table-wrapper">
            <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2 px-2">Recent Marks Entries</h3>
            <div className="overflow-x-auto">
              <table className="clay-table">
                <thead>
                  <tr>
                    <th className="px-2">Student</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g: any, idx: number) => (
                    <tr key={idx}>
                      <td className="font-bold text-gray-850 text-xs px-2">{g.studentName || 'Amanpreet Kaur'}</td>
                      <td className="text-xs">{g.subject}</td>
                      <td className="text-xs font-black text-indigo-650">{g.score}/100</td>
                      <td>
                        <span className="text-[10px] px-3 py-1 rounded-full border border-white font-extrabold bg-[#ffe4e6] text-[#f43f5e] shadow-sm">
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

          {/* Grading Entry Form */}
          <div className="clay-panel bg-white p-6 h-fit">
            <h3 className="font-black text-gray-800 text-base mb-6 border-b border-gray-100 pb-2">Input Grade</h3>
            <form onSubmit={handleSaveGrade} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Target Student</label>
                <select 
                  value={gradeForm.studentId}
                  onChange={(e) => setGradeForm({ ...gradeForm, studentId: e.target.value })}
                  className="w-full px-3 py-2.5 clay-input text-xs bg-white text-gray-700 cursor-pointer font-bold"
                >
                  {students.map((s: any, idx: number) => (
                    <option key={idx} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-500 block mb-1">Subject</label>
                <select 
                  value={gradeForm.subject}
                  onChange={(e) => setGradeForm({ ...gradeForm, subject: e.target.value })}
                  className="w-full px-3 py-2.5 clay-input text-xs bg-white text-gray-700 cursor-pointer font-bold"
                >
                  <option value="AI Foundations">AI Foundations</option>
                  <option value="Machine Learning Basics">Machine Learning Basics</option>
                  <option value="Natural Language Processing">Natural Language Processing</option>
                  <option value="Generative AI Modules">Generative AI Modules</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 block mb-1">Score (0-100)</label>
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    required
                    value={gradeForm.score}
                    onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })}
                    className="w-full px-3 py-2.5 clay-input text-xs" 
                    placeholder="90"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 block mb-1">Grade</label>
                  <select 
                    value={gradeForm.grade}
                    onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
                    className="w-full px-3 py-2.5 neo-input text-xs bg-white text-gray-700 cursor-pointer font-bold"
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={actionLoading}
                className="w-full py-2.5 font-black text-white clay-btn-secondary hover:cursor-pointer disabled:opacity-50 text-xs"
              >
                {actionLoading ? 'Saving...' : 'Submit Assessment Grade'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
