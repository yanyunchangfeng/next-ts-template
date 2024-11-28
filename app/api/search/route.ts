// app/api/search/route.ts
// 2.1. 如何获取网址参数？
import { isVercel } from '@/app/shared';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = isVercel ? 'force-dynamic' : 'force-static';

// 访问 /api/search?query=react
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query'); // query
  console.log(query);
  return NextResponse.json({ query }, { status: 200 });
};
