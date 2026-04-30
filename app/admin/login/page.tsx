'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [msg,setMsg]=useState('');
  const submit = async ()=>{
    const res = await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    if(res.ok){ localStorage.setItem('admin-auth','1'); router.push('/admin/dashboard'); } else setMsg('Login gagal');
  };
  return <div className="max-w-md mx-auto mt-10 card"><div className="flex flex-col items-center gap-2 mb-3"><h1 className="font-bold text-xl text-center">Barbarossa Muhammad Farros</h1><p className="font-semibold">Admin Login</p></div><input className="input mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" className="input mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/><button onClick={submit} className="w-full bg-redAccent text-white py-2 rounded">Masuk</button>{msg && <p className="text-red-700 mt-2">{msg}</p>}</div>;
}
