// middleware.js
import { NextRequest, NextResponse } from 'next/server';

// 中间件可以是 async 函数，如果使用了 await
export function middleware(request: NextRequest) {
  console.log('Middleware is running', request);
  return NextResponse.redirect(new URL('/', request.url));
}

// 设置匹配路径
export const config = {
  matcher: '/about/:path+'
};

// /about/:path* 匹配 /about、/about/xxx、/about/xxx/xxx
// /about/:path? 匹配 /about、/about/xxx
// /about/:path+ 匹配 /about/xxx、/about/xxx/xxx
