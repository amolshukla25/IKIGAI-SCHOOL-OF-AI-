'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  User, 
  Grid
} from 'lucide-react';
import CentreHeadDashboard from '@/components/dashboards/CentreHeadDashboard';
import DeskAdminDashboard from '@/components/dashboards/DeskAdminDashboard';
import TeacherDashboard from '@/components/dashboards/TeacherDashboard';
import StudentDashboard from '@/components/dashboards/StudentDashboard';

export default function DashboardRouterPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>('');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('ikigai_token');
    const storedUser = localStorage.getItem('ikigai_user');

    if (!storedToken || !storedUser) {
      router.push('/login');
    } else {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setAuthChecked(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ikigai_token');
    localStorage.removeItem('ikigai_user');
    router.push('/login');
  };

  if (!authChecked || !user) {
    return (
      <div className="flex-grow flex items-center justify-center text-gray-800">
        <div className="text-sm font-black tracking-wider text-gray-500 animate-pulse">Verifying Credentials...</div>
      </div>
    );
  }

  // Format Role Name for Header display
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'centre_head': return 'Centre Head (Director)';
      case 'desk_admin': return 'Desk Administrator';
      case 'teacher': return 'Academic Faculty';
      case 'student': return 'Student Scholar';
      default: return 'User';
    }
  };

  return (
    <div className="flex-grow flex flex-col">
      
      {/* Floating Claymorphic Portal Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sticky top-0 z-40">
        <div className="clay-panel w-full bg-white/70 backdrop-blur-md px-6 sm:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <span className="clay-badge bg-rose-50 text-rose-600 text-[10px]">
              Portal
            </span>
            <div className="h-5 w-0.5 bg-gray-300" />
            <span className="text-sm font-black text-gray-700">
              {getRoleDisplayName(user.role)}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
                <User className="w-4 h-4 text-indigo-500" />
              </div>
              <span className="text-xs font-black text-gray-700 hidden sm:inline">{user.name}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-gray-100 bg-white hover:bg-rose-50 hover:text-rose-600 transition-colors text-gray-700 cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-[2px_2px_8px_rgba(99,102,241,0.05)]"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Core Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        
        {/* Welcome Section */}
        <div className="mb-8 pb-6 border-b border-gray-200/50">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight flex items-center gap-2.5">
            <Grid className="w-6 h-6 text-indigo-500" /> Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xs font-extrabold text-gray-500 mt-1.5">
            {getRoleDisplayName(user.role)} Access Portal &bull; Ikigai School of AI, Ludhiana
          </p>
        </div>

        {/* Dashboard Dynamic Component Mount */}
        <div className="relative z-10">
          {user.role === 'centre_head' && <CentreHeadDashboard token={token} />}
          {user.role === 'desk_admin' && <DeskAdminDashboard token={token} />}
          {user.role === 'teacher' && <TeacherDashboard token={token} />}
          {user.role === 'student' && <StudentDashboard token={token} />}
        </div>

      </div>
    </div>
  );
}
