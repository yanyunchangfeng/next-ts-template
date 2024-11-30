import { isDynamic } from '@/app/shared';
import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

export async function GET() {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const supabase = await createClient();
  const { data: notes } = await supabase.from('notes').select();
  return NextResponse.json(notes);
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body, 'body');
  // 验证数据是否包含 title
  if (!body.title) {
    return NextResponse.json({ message: 'Title is required' }, { status: 400 });
  }
  console.log(body, 'body');
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const supabase = await createClient();
  const data = await supabase.from('notes').insert([{ title: body.title }]);
  console.log(data, 'insert');
  return NextResponse.json(data);
}
