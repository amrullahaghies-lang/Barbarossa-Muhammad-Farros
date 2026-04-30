'use client';
import { useEffect, useMemo, useState } from 'react';

type P = any;
export default function Dashboard(){
  const [rows,setRows]=useState<P[]>([]);const [search,setSearch]=useState('');const [activity,setActivity]=useState('');const [region,setRegion]=useState('');
  useEffect(()=>{ if(localStorage.getItem('admin-auth')!=='1') location.href='/admin/login'; fetch('/api/admin/data').then(r=>r.json()).then(d=>setRows(d.data)); },[]);
  const filtered = useMemo(()=>rows.filter(r=>(!search||r.fullName.toLowerCase().includes(search.toLowerCase())||r.nik.includes(search))&&(!activity||r.activity===activity)&&(!region||r.provinsi===region)),[rows,search,activity,region]);
  const today = new Date().toISOString().slice(0,10);
  const todayCount = rows.filter(r=>r.createdAt.slice(0,10)===today).length;
  const perAct = Object.entries(rows.reduce((a,r)=>(a[r.activity]=(a[r.activity]||0)+1,a),{} as Record<string,number>));
  const perRegion = Object.entries(rows.reduce((a,r)=>(a[r.provinsi]=(a[r.provinsi]||0)+1,a),{} as Record<string,number>));
  const exportCSV=()=>{const header='Nama,NIK,HP,Aktivitas,Alamat,Created At\n';const body=filtered.map(r=>`${r.fullName},${r.nik},${r.phone},${r.activity},${r.kelurahan} ${r.kecamatan} ${r.kabupaten} ${r.provinsi},${r.createdAt}`).join('\n');const blob=new Blob([header+body]);const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='participants.csv';a.click();};
  return <div className="max-w-6xl mx-auto mt-6 space-y-4"><div className="grid md:grid-cols-2 gap-3"><div className="card"><h3 className="font-bold">Total Data</h3><p className="text-2xl">{rows.length}</p><p>Data Hari Ini: {todayCount}</p></div><div className="card"><h3 className="font-bold">Stat Aktivitas</h3>{perAct.map(([k,v])=><p key={k}>{k}: {String(v)}</p>)}</div><div className="card md:col-span-2"><h3 className="font-bold">Stat Wilayah</h3>{perRegion.map(([k,v])=><p key={k}>{k}: {String(v)}</p>)}</div></div>
  <div className="card"><div className="grid md:grid-cols-4 gap-2 mb-3"><input className="input" placeholder="Cari nama/NIK" value={search} onChange={e=>setSearch(e.target.value)}/><input className="input" placeholder="Filter aktivitas" value={activity} onChange={e=>setActivity(e.target.value)}/><input className="input" placeholder="Filter provinsi" value={region} onChange={e=>setRegion(e.target.value)}/><button className="bg-redAccent text-white rounded" onClick={exportCSV}>Export CSV</button></div>
  <div className="overflow-auto"><table className="min-w-full text-sm"><thead><tr className="text-left"><th>Nama</th><th>NIK</th><th>Phone</th><th>Activity</th><th>Address</th><th>Created</th></tr></thead><tbody>{filtered.map((r,i)=><tr key={i} className="border-t border-slate-300"><td>{r.fullName}</td><td>{r.nik}</td><td>{r.phone}</td><td>{r.activity}</td><td>{r.kelurahan}, {r.kecamatan}, {r.kabupaten}, {r.provinsi}</td><td>{new Date(r.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div></div></div>
}
