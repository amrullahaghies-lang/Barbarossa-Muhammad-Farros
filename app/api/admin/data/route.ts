import { NextResponse } from 'next/server';
import { participants } from '@/lib/mockStore';

export async function GET() {
  return NextResponse.json({ data: participants });
}
