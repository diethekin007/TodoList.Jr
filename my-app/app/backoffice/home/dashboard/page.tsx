'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from '../../signup/config';
import Swal from 'sweetalert2';
import Link from 'next/link';
import WebThreads from '../../../WebThreads';

export default function Dashboard() {
  const [countWait, setCountWait] = useState(0);
  const [countDoing, setCountDoing] = useState(0);
  const [countSuccess, setCountSuccess] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: 'Bearer ' + token
      };
      const url = Config.apiUrl + '/todo/dashboard';
      const res = await axios.get(url, { headers });

      if (res.status === 200) {
        setCountWait(res.data.countWait || 0);
        setCountDoing(res.data.countDoing || 0);
        setCountSuccess(res.data.countSuccess || 0);
      }
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message || 'ไม่สามารถโหลดข้อมูลสถิติได้',
        icon: 'error',
        confirmButtonColor: '#ee09cf'
      });
    } finally {
      setLoading(false);
    }
  };

  const totalTasks = countWait + countDoing + countSuccess;
  const successPercent = totalTasks > 0 ? Math.round((countSuccess / totalTasks) * 100) : 0;
  const doingPercent = totalTasks > 0 ? Math.round((countDoing / totalTasks) * 100) : 0;
  const waitPercent = totalTasks > 0 ? Math.round((countWait / totalTasks) * 100) : 0;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 overflow-hidden">
      {/* Background Animated WebThreads */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <WebThreads
          color1="#ee09cf"
          color2="#02d5d7"
          color3="#EAB308"
          speed={0.24}
          threadCount={7}
          frequency={4.6}
          spread={0.22}
          taper={1}
          position={0.5}
          fanMode="center"
          glow={0.03}
          falloff={0.65}
          thickness={1.2}
          brightness={0.7}
          opacity={0.85}
          mirror
          shimmer={true}
          grain
          grainIntensity={0.04}
          mouseInteraction
          mouseStrength={0.4}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Live Real-Time Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              สรุปภาพรวมสถิติงาน
            </h1>
            <p className="text-slate-400 text-sm">
              ติดตามปริมาณงาน สถานะการดำเนินงาน และเปอร์เซ็นต์ความสำเร็จในระบบ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <svg className={`w-4 h-4 text-cyan-400 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              รีเฟรชข้อมูล
            </button>

            <Link
              href="/backoffice/home/todo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white text-sm font-medium shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              เพิ่มรายการงาน
            </Link>
          </div>
        </div>

        {/* 3 Main Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Wait */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-amber-500/30 p-6 shadow-2xl hover:border-amber-500/60 transition-all group">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-amber-400 tracking-wider">รอดำเนินการ</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-extrabold text-slate-100">{countWait}</span>
              <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                {waitPercent}% ของงานทั้งหมด
              </span>
            </div>
            <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${waitPercent}%` }} />
            </div>
          </div>

          {/* Card 2: Doing */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyan-500/30 p-6 shadow-2xl hover:border-cyan-500/60 transition-all group">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-cyan-400 tracking-wider">กำลังดำเนินการ</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-extrabold text-slate-100">{countDoing}</span>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
                {doingPercent}% ของงานทั้งหมด
              </span>
            </div>
            <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${doingPercent}%` }} />
            </div>
          </div>

          {/* Card 3: Success */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-fuchsia-500/30 p-6 shadow-2xl hover:border-fuchsia-500/60 transition-all group">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-28 h-28 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-fuchsia-400 tracking-wider">เสร็จสิ้นแล้ว</span>
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-extrabold text-slate-100">{countSuccess}</span>
              <span className="text-xs text-fuchsia-400 font-mono bg-fuchsia-500/10 px-2 py-1 rounded-md border border-fuchsia-500/20">
                {successPercent}% อัตราความสำเร็จ
              </span>
            </div>
            <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-fuchsia-400 h-full rounded-full transition-all duration-500" style={{ width: `${successPercent}%` }} />
            </div>
          </div>

        </div>

        {/* Progress Breakdown & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Progress Breakdown Card */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-100">สัดส่วนสถานะงาน (Task Breakdown)</h3>
                <p className="text-xs text-slate-400">ภาพรวมสัดส่วนปริมาณงานตามสถานะ</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                รวมทั้งหมด {totalTasks} งาน
              </span>
            </div>

            {/* Stacked Bar */}
            <div className="w-full bg-slate-800 h-4 rounded-full flex overflow-hidden p-0.5 border border-slate-700">
              <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${waitPercent}%` }} title={`รอดำเนินการ: ${countWait}`} />
              <div className="bg-cyan-400 h-full transition-all duration-500" style={{ width: `${doingPercent}%` }} title={`กำลังทำ: ${countDoing}`} />
              <div className="bg-fuchsia-400 h-full transition-all duration-500" style={{ width: `${successPercent}%` }} title={`เสร็จแล้ว: ${countSuccess}`} />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <div>
                  <div className="text-xs text-slate-400">รอดำเนินการ</div>
                  <div className="text-sm font-bold text-slate-200">{countWait} งาน</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400" />
                <div>
                  <div className="text-xs text-slate-400">กำลังทำ</div>
                  <div className="text-sm font-bold text-slate-200">{countDoing} งาน</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-fuchsia-400" />
                <div>
                  <div className="text-xs text-slate-400">เสร็จสิ้นแล้ว</div>
                  <div className="text-sm font-bold text-slate-200">{countSuccess} งาน</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Widget */}
          <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-100">การดำเนินการด่วน</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                การจัดการภารกิจสามารถอัปเดตและบันทึกข้อมูลได้ที่หน้ารายการงาน
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/backoffice/home/todo"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-all hover:translate-x-1"
              >
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  ไปยังรายการบันทึกงาน
                </div>
                <span className="text-cyan-400 text-sm">&rarr;</span>
              </Link>

              <Link
                href="/backoffice/home/profile"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-all hover:translate-x-1"
              >
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                  จัดการโปรไฟล์ส่วนตัว
                </div>
                <span className="text-fuchsia-400 text-sm">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}