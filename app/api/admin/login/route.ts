import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === 'admin@barbarossa.id' && password === 'admin123') return NextResponse.json({ success: true, token: 'mock-token' });
  return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
}
