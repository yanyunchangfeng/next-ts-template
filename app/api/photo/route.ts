import { NextResponse } from 'next/server';
import { isDynamic } from '@/app/shared';
import { createClient } from '@/app/utils/supabase/server';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

export async function GET() {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const res = await fetch('https://dog.ceo/api/breeds/image/random', { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error('Failed to fetch photos');
  }
  const dogData: { message: string; status: string } = await res.json();
  const supabase = await createClient();
  const { status, statusText, error } = await supabase
    .from('photos')
    .insert([{ src: dogData.message }])
    .select('id');
  if (error) {
    return NextResponse.json({ message: error.message }, { status, statusText });
  }
  const { data: photos } = await supabase.from('photos').select().order('id', { ascending: false }).range(0, 2);
  return NextResponse.json(photos);
}
