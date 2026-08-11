'use client';

import { Config } from '../../signup/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import WebThreads from '../../../WebThreads';

export default function Todo() {
  const [name, setName] = useState('');
  const [remark, setRemark] = useState('');
  const [id, setId] = useState(0);
  const [todos, setTodos] = useState([]);
  const [statusList] = useState([
    { value: 'all', text: 'ทุกสถานะ' },
    { value: 'wait', text: 'รอทำ' },
    { value: 'doing', text: 'กำลังทำ' },
    { value: 'success', text: 'ทำเสร็จแล้ว' }
  ]);
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [status]);

  const filterData = async () => {
    try {
      setLoading(true);
      const url = Config.apiUrl + '/todo/filter/' + status;
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: 'Bearer ' + token
      };

      const res = await axios.get(url, { headers });

      if (res.status === 200) {
        setTodos(res.data);
      }
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message,
        icon: 'error',
        confirmButtonColor: '#ee09cf'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = Config.apiUrl + '/todo/list';
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: 'Bearer ' + token
      };

      const res = await axios.get(url, { headers });

      if (res.status === 200) {
        setTodos(res.data);
      }
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message,
        icon: 'error',
        confirmButtonColor: '#ee09cf'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name) {
      Swal.fire({
        title: 'แจ้งเตือน',
        text: 'กรุณากรอกชื่อสิ่งที่ต้องทำ',
        icon: 'warning',
        confirmButtonColor: '#02d5d7'
      });
      return;
    }

    try {
      const payload = { name, remark, id };
      const url = Config.apiUrl + '/todo/save';
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: 'Bearer ' + token
      };

      const res = await axios.post(url, payload, { headers });

      if (res.status === 200) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'บันทึกข้อมูลเรียบร้อยแล้ว',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        setName('');
        setRemark('');
        setId(0);
        fetchData();
      }
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message,
        icon: 'error',
        confirmButtonColor: '#ee09cf'
      });
    }
  };

  const handleRemove = async (itemId: number) => {
    try {
      const button = await Swal.fire({
        title: 'ยืนยันการลบ',
        text: 'คุณต้องการลบรายการนี้ใช่ไหม?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#334155',
        confirmButtonText: 'ลบรายการ',
        cancelButtonText: 'ยกเลิก'
      });

      if (button.isConfirmed) {
        const url = Config.apiUrl + '/todo/remove/' + itemId;
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: 'Bearer ' + token
        };

        const res = await axios.delete(url, { headers });

        if (res.status === 200) {
          fetchData();
        }
      }
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message,
        icon: 'error'
      });
    }
  };

  const handleEdit = (item: { id: number; name: string; remark: string }) => {
    setId(item.id);
    setName(item.name);
    setRemark(item.remark);
  };

  const updateStatus = async (itemId: number, newStatus: string) => {
    try {
      const url = Config.apiUrl + '/todo/updateStatus';
      const payload = { id: itemId, status: newStatus };
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: 'Bearer ' + token
      };

      const res = await axios.post(url, payload, { headers });

      if (res.status === 200) {
        fetchData();
      }
    } catch (err: unknown) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: (err as Error).message,
        icon: 'error'
      });
    }
  };

  const statusBadge = (st: string) => {
    if (st === 'wait' || st === 'use') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          รอดำเนินการ
        </span>
      );
    }
    if (st === 'doing') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          กำลังทำ
        </span>
      );
    }
    if (st === 'success') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          ทำเสร็จแล้ว
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
        -
      </span>
    );
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 overflow-hidden">
      {/* Background WebThreads */}
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
      <div className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto space-y-8">

        {/* Form Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {id > 0 ? 'แก้ไขสิ่งที่ต้องทำ' : 'บันทึกรายการใหม่'}
              </h1>
              <p className="text-slate-400 text-xs mt-1">กรอกข้อมูลงานที่คุณต้องการบันทึกในระบบ</p>
            </div>
            {id > 0 && (
              <button
                onClick={() => { setId(0); setName(''); setRemark(''); }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                ยกเลิกการแก้ไข
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">ชื่อสิ่งที่ต้องทำ *</label>
              <input
                type="text"
                placeholder="เช่น ออกแบบหน้าแดชบอร์ด, เขียน API..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">หมายเหตุ</label>
              <input
                type="text"
                placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {id > 0 ? 'อัปเดตข้อมูล' : 'บันทึกรายการ'}
            </button>
          </div>
        </div>

        {/* List & Table Section */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">

          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-100">รายการงานทั้งหมด</h2>
              <p className="text-xs text-slate-400">กรองและจัดการสถานะงานของคุณ</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">ตัวกรอง:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-cyan-500 cursor-pointer"
              >
                {statusList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-cyan-400 font-semibold border-b border-slate-700 text-xs tracking-wider">
                  <th className="p-4 w-[280px]">รายการที่ต้องทำ</th>
                  <th className="p-4">หมายเหตุ</th>
                  <th className="p-4 text-center w-[160px]">สถานะ</th>
                  <th className="p-4 text-center w-[360px]">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {todos.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                      {loading ? 'กำลังโหลดข้อมูล...' : 'ไม่พบรายการงานในระบบ'}
                    </td>
                  </tr>
                ) : (
                  todos.map((item: { id: number; name: string; remark: string; status: string }) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-semibold text-slate-100">{item.name}</td>
                      <td className="p-4 text-slate-400 text-xs">{item.remark || '-'}</td>
                      <td className="p-4 text-center">{statusBadge(item.status)}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => updateStatus(item.id, 'wait')}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all"
                            title="เปลี่ยนสถานะเป็นรอดำเนินการ"
                          >
                            รอดำเนิน
                          </button>
                          <button
                            onClick={() => updateStatus(item.id, 'doing')}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all"
                            title="เปลี่ยนสถานะเป็นกำลังทำ"
                          >
                            กำลังทำ
                          </button>
                          <button
                            onClick={() => updateStatus(item.id, 'success')}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
                            title="เปลี่ยนสถานะเป็นทำแล้ว"
                          >
                            ทำแล้ว
                          </button>

                          <div className="w-px h-4 bg-slate-800 mx-1" />

                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-all"
                            title="แก้ไข"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all"
                            title="ลบ"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}