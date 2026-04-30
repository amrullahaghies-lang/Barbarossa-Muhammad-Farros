'use client';
import { useMemo, useState } from 'react';
import { wilayahData } from '@/lib/wilayah';

const activities = ['Pencak Silat','Fun Run Pendekar','Bazar UMKM','Lomba Tumpeng Pecel Madiun','Lomba Videografi','Lomba Foto','Festival Musik Rakyat'];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ activity:'', nik:'', fullName:'', phone:'', provinsi:'', kabupaten:'', kecamatan:'', kelurahan:'', dusun:'', rtrw:'', kodePos:'', detailAlamat:'' });
  const kabupatenOptions = useMemo(()=>wilayahData.find(w=>w.provinsi===form.provinsi)?.kabupaten ?? [],[form.provinsi]);
  const kecamatanOptions = useMemo(()=>kabupatenOptions.find(k=>k.nama===form.kabupaten)?.kecamatan ?? [],[kabupatenOptions,form.kabupaten]);
  const kelurahanOptions = useMemo(()=>kecamatanOptions.find(k=>k.nama===form.kecamatan)?.kelurahan ?? [],[kecamatanOptions,form.kecamatan]);

  const set = (k:string,v:string)=>setForm(p=>({ ...p, [k]:v }));
  const validate1 = ()=> form.activity && /^\d{16}$/.test(form.nik) && form.fullName && /^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(form.phone);
  const validate2 = ()=> form.provinsi && form.kabupaten && form.kecamatan && form.kelurahan && form.dusun && /^\d{3}\/\d{3}$/.test(form.rtrw) && /^\d{5}$/.test(form.kodePos);
  const submit = async ()=>{
    const res = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    setMsg(res.ok ? 'Data berhasil disimpan.' : 'Gagal menyimpan data.');
  };

  return <div className="card max-w-3xl mx-auto mt-6">
    <div className="flex flex-col items-center mb-4"><h1 className="text-xl font-bold mt-2 text-center">Barbarossa Muhammad Farros</h1><p className="text-sm">Pendaftaran Peserta</p></div>
    {step===1 && <div className="space-y-3"> <select className="input" value={form.activity} onChange={e=>set('activity',e.target.value)}><option value="">Pilih Aktivitas</option>{activities.map(a=><option key={a}>{a}</option>)}</select>
      <input className="input" placeholder="NIK (16 digit)" value={form.nik} onChange={e=>set('nik',e.target.value.replace(/\D/g,''))}/>
      <input className="input" placeholder="Nama Lengkap" value={form.fullName} onChange={e=>set('fullName',e.target.value)}/>
      <input className="input" placeholder="Nomor HP" value={form.phone} onChange={e=>set('phone',e.target.value.replace(/\s/g,''))}/>
      <button disabled={!validate1()} onClick={()=>setStep(2)} className="bg-redAccent text-white px-4 py-2 rounded disabled:opacity-50">Lanjut</button>
    </div>}
    {step===2 && <div className="space-y-3">
      <select className="input" value={form.provinsi} onChange={e=>setForm(p=>({...p,provinsi:e.target.value,kabupaten:'',kecamatan:'',kelurahan:''}))}><option value="">Pilih Provinsi</option>{wilayahData.map(w=><option key={w.provinsi}>{w.provinsi}</option>)}</select>
      <select className="input" value={form.kabupaten} onChange={e=>setForm(p=>({...p,kabupaten:e.target.value,kecamatan:'',kelurahan:''}))}><option value="">Pilih Kabupaten/Kota</option>{kabupatenOptions.map(k=><option key={k.nama}>{k.nama}</option>)}</select>
      <select className="input" value={form.kecamatan} onChange={e=>setForm(p=>({...p,kecamatan:e.target.value,kelurahan:''}))}><option value="">Pilih Kecamatan</option>{kecamatanOptions.map(k=><option key={k.nama}>{k.nama}</option>)}</select>
      <select className="input" value={form.kelurahan} onChange={e=>set('kelurahan',e.target.value)}><option value="">Pilih Kelurahan/Desa</option>{kelurahanOptions.map(k=><option key={k}>{k}</option>)}</select>
      <input className="input" placeholder="Dusun" value={form.dusun} onChange={e=>set('dusun',e.target.value)}/>
      <input className="input" placeholder="RT/RW 000/000" value={form.rtrw} onChange={e=>set('rtrw',e.target.value)}/>
      <input className="input" placeholder="Kode Pos" value={form.kodePos} onChange={e=>set('kodePos',e.target.value.replace(/\D/g,''))}/>
      <textarea className="input" placeholder="Detail Alamat (opsional)" value={form.detailAlamat} onChange={e=>set('detailAlamat',e.target.value)}/>
      <div className="flex gap-2"><button onClick={()=>setStep(1)} className="px-4 py-2 rounded border">Kembali</button><button disabled={!validate2()} onClick={()=>setStep(3)} className="bg-redAccent text-white px-4 py-2 rounded disabled:opacity-50">Lanjut</button></div>
    </div>}
    {step===3 && <div className="space-y-2">{Object.entries(form).map(([k,v])=><p key={k}><b>{k}:</b> {v || '-'}</p>)}<div className="flex gap-2"><button onClick={()=>setStep(2)} className="px-4 py-2 rounded border">Kembali</button><button onClick={submit} className="bg-redAccent text-white px-4 py-2 rounded">Submit</button></div>{msg && <p className="text-green-700 font-semibold">{msg}</p>}</div>}
  </div>;
}
