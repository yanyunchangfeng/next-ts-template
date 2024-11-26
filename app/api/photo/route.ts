import { NextResponse } from 'next/server';
import { photos } from '@/app/shared';

export async function GET() {
  return NextResponse.json({ data: photos }, { status: 200 });
}
