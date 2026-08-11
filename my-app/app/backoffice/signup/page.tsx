'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Config } from './config';
import axios from 'axios';
import WebThreads from '../../WebThreads';

export default function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name || !username || !password) {
      Swal.fire({
        title: 'แจ้งเตือน',
        text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        icon: 'warning',
        confirmButtonColor: '#02d5d7'
      });
      return;
    }

    try {
      setLoading(true);
      const url = Config.apiUrl + '/members/signup';
      const payload = { name, username, password };

      const res = await axios.post(url, payload);

      if (res.status === 200) {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        await Swal.fire({
          title: 'สำเร็จ!',
          text: 'สมัครสมาชิกเรียบร้อยแล้ว',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        router.push('/backoffice/signin');
      }
    } catch (err: unknown) {
      let errorMessage = 'ไม่สามารถสมัครสมาชิกได้';
      if (axios.isAxiosError(err) && err.response?.data) {
        errorMessage = err.response.data.error || err.response.data.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#ee09cf'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Animated WebThreads */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <WebThreads
          color1="#ee09cf"
          color2="#02d5d7"
          color3="#EAB308"
          speed={0.22}
          threadCount={7}
          frequency={4.8}
          spread={0.2}
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

      {/* Glassmorphic Sign Up Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-fuchsia-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            สร้างบัญชีใหม่
          </h1>
          <p className="text-slate-400 text-sm">
            กรอกข้อมูลเพื่อเริ่มต้นใช้งานระบบ Backoffice
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Name Input */}
          <div className="space-y-1.5">
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
              className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm"
            />
          </div>

          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              ชื่อผู้ใช้ (Username)
            </label>
            <input
              type="text"
              placeholder="กรอก Username สำหรับเข้าสู่ระบบ"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              รหัสผ่าน (Password)
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                สมัครสมาชิก
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
          มีบัญชีผู้ใช้งานอยู่แล้วใช่ไหม?{' '}
          <Link href="/backoffice/signin" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            เข้าสู่ระบบ
          </Link>
        </div>

      </div>
    </div>
  );
}