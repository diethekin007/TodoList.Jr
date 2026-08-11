'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Config } from '../signup/config';
import axios from 'axios';
import FloatingLines from '../../FloatingLines';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username || !password) {
      Swal.fire({
        title: 'แจ้งเตือน',
        text: 'กรุณากรอก Username และ Password ให้ครบถ้วน',
        icon: 'warning',
        confirmButtonColor: '#06B6D4'
      });
      return;
    }

    try {
      setLoading(true);
      const payload = { username, password };
      const url = Config.apiUrl + '/members/signin';
      const res = await axios.post(url, payload);

      if (res.status === 200) {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        await Swal.fire({
          title: 'ยินดีต้อนรับ!',
          text: 'เข้าสู่ระบบสำเร็จแล้ว',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        router.push('/backoffice/home');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        Swal.fire({
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: 'Username หรือ Password ไม่ถูกต้อง',
          icon: 'warning',
          confirmButtonColor: '#e945f5'
        });
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: (err as Error).message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
          icon: 'error',
          confirmButtonColor: '#e945f5'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 overflow-hidden font-sans tracking-tight">
      {/* Background Animated FloatingLines */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <FloatingLines
          linesGradient={['#e945f5', '#06B6D4', '#EAB308']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 8, 8]}
          lineDistance={[8, 8, 8]}
          bendRadius={8}
          bendStrength={-2}
          interactive={true}
          parallax={true}
          animationSpeed={1}
        />
      </div>

      {/* Glassmorphic Minimal Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="text-center space-y-2.5 mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            เข้าสู่ระบบ
          </h1>
          <p className="text-slate-400 text-xs font-light tracking-wide">
            ยินดีต้อนรับกลับสู่ระบบจัดการ Backoffice
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              ชื่อผู้ใช้ (Username)
            </label>
            <input
              type="text"
              placeholder="กรอกชื่อผู้ใช้ของคุณ"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800/40 border border-slate-700/70 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-light"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              รหัสผ่าน (Password)
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/40 border border-slate-700/70 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-light"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white font-medium shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                เข้าสู่ระบบ
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400 font-light">
          ยังไม่มีบัญชีผู้ใช้งานใช่ไหม?{' '}
          <Link href="/backoffice/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            สมัครสมาชิก
          </Link>
        </div>

      </div>
    </div>
  );
}