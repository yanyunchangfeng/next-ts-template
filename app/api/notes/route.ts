import { isStatic, isVercel } from '@/app/shared';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = isVercel || !isStatic ? 'force-dynamic' : 'force-static';

export async function GET() {
  if (!isVercel || isStatic) {
    return NextResponse.json([]);
  }
  const supabase = await createClient();
  const { data: notes } = await supabase.from('notes').select();
  return NextResponse.json(notes);
}
