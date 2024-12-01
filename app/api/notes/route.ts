import { isDynamic } from '@/app/shared';
import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

export async function GET() {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const supabase = await createClient();
  const { data: notes, error, status, statusText } = await supabase.from('notes').select();
  if (error) {
    return NextResponse.json({ message: error.message }, { status, statusText });
  }
  return NextResponse.json(notes, { status: 200, statusText });
}
export async function POST(request: NextRequest) {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const body = await request.json();
  const { title } = body;
  // 验证数据是否包含 title
  if (!title) {
    return NextResponse.json({ message: 'Title is required' }, { status: 400 });
  }
  const supabase = await createClient();
  // insert() 不强制要求传递数组，你可以根据实际需求插入单条或多条数据。
  // 单条插入：直接传入一个对象。
  // 批量插入：传入一个对象数组。
  const { data, status, statusText, error } = await supabase.from('notes').insert({ title }).select('id');
  if (error) {
    return NextResponse.json({ message: error.message }, { status, statusText });
  }
  return NextResponse.json(data, { status: 200, statusText });
}

export async function PUT(request: NextRequest) {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const body = await request.json();
  const { id, title } = body;
  // 验证数据是否包含 title
  if (!id || !title) {
    return NextResponse.json({ message: 'ID and Title are required' }, { status: 400 });
  }
  const supabase = await createClient();
  const { data, error, status, statusText } = await supabase
    .from('notes')
    .update([{ title: title }])
    .eq('id', id);
  if (error) {
    return NextResponse.json({ message: error.message }, { status, statusText });
  }
  return NextResponse.json(data, { status: 200, statusText });
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
  const { data, error, status, statusText } = await supabase.from('notes').delete().eq('id', id); // 通过 id 删除笔记
  // 错误处理
  if (error) {
    return NextResponse.json({ message: error.message }, { status, statusText });
  }
  // 返回删除成功的数据
  return NextResponse.json(data, { status: 200, statusText });
}
