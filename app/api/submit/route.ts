import { NextResponse } from 'next/server';
import { participants } from '@/lib/mockStore';

export async function POST(req: Request) {
  const body = await req.json();
  const required = ['activity','nik','fullName','phone','provinsi','kabupaten','kecamatan','kelurahan','dusun','rtrw','kodePos'];
  for (const f of required) if (!body[f]) return NextResponse.json({ error: `${f} wajib` }, { status: 400 });
  if (!/^\d{16}$/.test(body.nik)) return NextResponse.json({ error: 'NIK invalid' }, { status: 400 });
  if (!/^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(body.phone)) return NextResponse.json({ error: 'Phone invalid' }, { status: 400 });
  if (!/^\d{3}\/\d{3}$/.test(body.rtrw)) return NextResponse.json({ error: 'RT/RW invalid' }, { status: 400 });
  if (!/^\d{5}$/.test(body.kodePos)) return NextResponse.json({ error: 'Kode pos invalid' }, { status: 400 });
  participants.unshift({ ...body, createdAt: new Date().toISOString() });
  return NextResponse.json({ success: true });
}
