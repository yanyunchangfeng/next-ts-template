// app/api/search/route.ts
// 2.1. 如何获取网址参数？
import { NextRequest, NextResponse } from 'next/server';

// 访问 /api/search?query=react
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query'); // query
  console.log(query);
  return NextResponse.json({ query }, { status: 200 });
}
