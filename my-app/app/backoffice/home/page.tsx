'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WebThreads from '../../WebThreads';

export default function Home() {
  const [books] = useState([
    { id: 100, name: 'Java Programming', category: 'Backend' },
    { id: 200, name: 'PHP Development', category: 'Backend' },
    { id: 300, name: 'C# Masterclass', category: 'Software' },
    { id: 400, name: 'Python Data Science', category: 'Data Science' }
  ]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background Animated WebThreads */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <WebThreads
          color1="#ee09cf"
          color2="#02d5d7"
          color3="#EAB308"
          speed={0.25}
          threadCount={7}
          frequency={4.5}
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
      <div className="relative z-10 pt-24 md:pt-28 p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        
        {/* Hero Section Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 md:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              ระบบจัดการหลังบ้าน Backoffice
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              ยินดีต้อนรับสู่ระบบ Backoffice
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              จัดการงาน ข้อมูลส่วนตัว สรุปรายงาน และติดตามสถานะระบบได้ครบจบในที่เดียว ด้วยอินเทอร์เฟซที่ทันสมัยและใช้งานง่าย
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/backoffice/home/todo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-medium shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              ไปที่เก็บบันทึกงาน
            </Link>

            <Link
              href="/backoffice/home/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700/80 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              ดูสถิติ Dashboard
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6 hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">บันทึกภารกิจ (Todo)</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              จัดการรายการงานที่ต้องทำ เปลี่ยนสถานะงาน รอดำเนินการ กำลังทำ หรือเสร็จสิ้นอย่างเป็นระบบ
            </p>
            <Link href="/backoffice/home/todo" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 gap-1">
              เข้าใช้งาน <span>&rarr;</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6 hover:border-fuchsia-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">แก้ไขข้อมูลส่วนตัว</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              ตรวจสอบโปรไฟล์ผู้ใช้งาน อัปเดตชื่อผู้ใช้งาน และจัดการสิทธิ์ในระบบได้อย่างปลอดภัย
            </p>
            <Link href="/backoffice/home/profile" className="inline-flex items-center text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 gap-1">
              แก้ไขโปรไฟล์ <span>&rarr;</span>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6 hover:border-amber-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">รายงานสรุปผลภาพรวม</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              ดูตัวเลขสถิติยอดงานคงเหลือ งานที่ทำเสร็จแล้ว และประสิทธิภาพการทำงานของระบบ
            </p>
            <Link href="/backoffice/home/dashboard" className="inline-flex items-center text-sm font-semibold text-amber-400 hover:text-amber-300 gap-1">
              ดูภาพรวม <span>&rarr;</span>
            </Link>
          </div>

        </div>

        {/* Books / Resources Preview Table */}
        <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-100">หมวดหมู่คอร์สและหนังสือแนะนำ</h2>
              <p className="text-xs text-slate-400">รายการเทคโนโลยีหลักในระบบ</p>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
              {books.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <div key={book.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="text-xs text-cyan-400 font-mono mb-1">ID: #{book.id}</div>
                <div className="font-semibold text-slate-200 capitalize">{book.name}</div>
                <div className="mt-2 text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-400 w-fit">
                  {book.category}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}