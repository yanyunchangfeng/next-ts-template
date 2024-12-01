import { NextResponse } from 'next/server';
import { isDynamic } from '@/app/shared';
import { createClient } from '@/app/utils/supabase/server';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

export async function GET() {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const supabase = await createClient();
  const { data: photos } = await supabase.from('photos').select();
  return NextResponse.json(photos);
}
