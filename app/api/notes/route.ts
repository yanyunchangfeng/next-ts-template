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
export async function PUT(request: NextRequest) {
  const body = await request.json();
  console.log(body, 'body');
  // 验证数据是否包含 title
  if (!body.id || !body.title) {
    return NextResponse.json({ message: 'ID and Title are required' }, { status: 400 });
  }
  console.log(body, 'body');
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const supabase = await createClient();
  const data = await supabase
    .from('notes')
    .update([{ title: body.title }])
    .eq('id', body.id);
  console.log(data, 'update');
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body; // 获取笔记的 id
  // 确保传递了 id
  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }
  const supabase = await createClient();
  // 执行删除操作
  const { data, error } = await supabase.from('notes').delete().eq('id', id); // 通过 id 删除笔记

  // 错误处理
  if (error) {
    console.error('Error deleting data:', error.message);
    return NextResponse.json({ message: 'Error deleting data', error: error.message }, { status: 500 });
  }
  // 返回删除成功的数据
  return NextResponse.json(data, { status: 200 });
}
