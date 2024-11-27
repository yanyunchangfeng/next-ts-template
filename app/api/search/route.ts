// app/api/search/route.ts
// 2.1. 如何获取网址参数？
import { isVercel } from '@/app/shared';
import { NextRequest, NextResponse } from 'next/server';

// 访问 /api/search?query=react
const dynamicGet = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query'); // query
  console.log(query);
  return NextResponse.json({ query }, { status: 200 });
};
const staticGet = async () => {
  // const searchParams = request.nextUrl.searchParams;
  // const query = searchParams.get('query'); // query
  // console.log(query);
  return NextResponse.json({ query: 'nextjs' }, { status: 200 });
};

export const GET = isVercel ? dynamicGet : staticGet;
