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
    .eq('id', id)
    .select();

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
  //   eq 是单个字段的等值匹配，适用于比较一个字段与某个具体值是否相等。
  // match 是多条件匹配，适用于一次性检查多个字段与对应值的匹配，等价于多个 eq 条件的 AND 组合。
  const { data, error, status, statusText } = await supabase.from('notes').delete().match({ id }).select(); // 通过 id 删除笔记
  // 错误处理
  if (error) {
    return NextResponse.json({ message: error.message }, { status, statusText });
  }
  // 返回删除成功的数据
  return NextResponse.json(data, { status: 200, statusText });
}
