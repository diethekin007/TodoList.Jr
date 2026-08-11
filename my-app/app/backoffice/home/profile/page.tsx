'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from '../../signup/config';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Lightfall from '../../../Lightfall';

export default function Profile() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = Config.apiUrl + '/members/info';
      const token = localStorage.getItem('token');
      if (!token) return;

      const headers = {
        Authorization: 'Bearer ' + token
      };
      const res = await axios.get(url, { headers });

      if (res.status === 200) {
        setName(res.data.name || '');
        setUsername(res.data.username || '');
      }
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message || 'ไม่สามารถดึงข้อมูลโปรไฟล์ได้',
        icon: 'error',
        confirmButtonColor: '#ee09cf'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      if (password && password !== confirmPassword) {
        throw new Error('โปรดป้อนยืนยันรหัสผ่านให้ตรงกัน');
      }

      setSaving(true);
      const payload = {
        name,
        username,
        password
      };

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: 'Bearer ' + token
      };
      const url = Config.apiUrl + '/members/update';
      await axios.put(url, payload, { headers });

      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      
      setPassword('');
      setConfirmPassword('');
      fetchData();
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message || 'ไม่สามารถบันทึกข้อมูลได้',
        icon: 'error',
        confirmButtonColor: '#ee09cf'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 overflow-hidden">
      {/* Background Animated Lightfall */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0d0526"
          speed={0.25}
          streakCount={3}
          streakWidth={1.2}
          streakLength={1.4}
          glow={0.85}
          density={0.7}
          twinkle={0.6}
          zoom={2.8}
          backgroundGlow={0.35}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.8}
          mouseRadius={1}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 pt-20 md:pt-24 max-w-3xl mx-auto space-y-8">
        
        {/* Glassmorphic Profile Form Card */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl space-y-8">
          
          {/* Header & User Avatar Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-800/80 pb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-cyan-500 to-indigo-600 p-0.5 shadow-xl shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-cyan-400">
                  {name ? (
                    <span className="text-3xl font-extrabold uppercase">{name.charAt(0)}</span>
                  ) : (
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" title="ออนไลน์" />
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                แก้ไขข้อมูลส่วนตัว
              </h1>
              <p className="text-slate-400 text-xs font-light">
                อัปเดตชื่อผู้ใช้งานและรหัสผ่านสำหรับเข้าสู่ระบบ
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  placeholder="กรอกชื่อของคุณ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
                />
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ชื่อผู้ใช้ (Username)
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  รหัสผ่านใหม่
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ยืนยันรหัสผ่านใหม่
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
                />
              </div>

            </div>

            <p className="text-xs text-slate-500 italic">
              * หมายเหตุ: หากไม่ต้องการเปลี่ยนรหัสผ่าน สามารถเว้นว่างช่องรหัสผ่านไว้ได้
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => router.push('/backoffice/home')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-sm font-medium transition-all cursor-pointer"
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    บันทึกข้อมูล
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}