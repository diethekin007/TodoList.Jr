'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from '../backoffice/signup/config';
import Swal from 'sweetalert2';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
  const [name, setName] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const fetchData = async () => {
    try {
      const url = Config.apiUrl + '/members/info';
      const token = localStorage.getItem('token');
      if (!token) return;

      const headers = {
        Authorization: 'Bearer ' + token
      };

      const res = await axios.get(url, { headers });

      if (res.status === 200 && res.data?.name) {
        setName(res.data.name);
      }
    } catch (err) {
      // silent fallback
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const signOut = async () => {
    const confirmButton = await Swal.fire({
      title: 'ออกจากระบบ',
      text: 'คุณต้องการออกจากระบบใช่ไหม?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#ee09cf',
      cancelButtonColor: '#334155',
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก'
    });

    if (confirmButton.isConfirmed) {
      localStorage.removeItem('token');
      router.push('/backoffice/signin');
    }
  };

  return (
    <nav className="max-w-6xl mx-auto rounded-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 px-6 py-3 flex items-center justify-between shadow-2xl transition-all">
      
      {/* Left: Brand Logo & Title */}
      <Link href="/backoffice/home" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Todo List
        </span>
      </Link>

      {/* Middle: Navigation Links */}
      <div className="hidden sm:flex items-center gap-1 md:gap-2">
        <Link
          href="/backoffice/home"
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === '/backoffice/home'
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/20 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          หน้าแรก
        </Link>

        <Link
          href="/backoffice/home/dashboard"
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === '/backoffice/home/dashboard'
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/20 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/backoffice/home/todo"
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === '/backoffice/home/todo'
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/20 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          บันทึกงาน
        </Link>

        <Link
          href="/backoffice/home/profile"
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === '/backoffice/home/profile'
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/20 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          แก้ไขโปรไฟล์
        </Link>
      </div>

      {/* Right: User Info & Actions */}
      <div className="flex items-center gap-3">
        {name && (
          <span className="hidden md:inline-flex text-xs font-medium text-slate-300 items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {name}
          </span>
        )}

        <button
          onClick={() => router.push('/backoffice/home/profile')}
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          แก้ไข
        </button>

        <button
          onClick={signOut}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-white text-slate-900 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>

    </nav>
  );
}