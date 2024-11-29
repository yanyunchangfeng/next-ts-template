import { NextRequest, NextResponse } from 'next/server';

// 中间件可以是 async 函数，如果使用了 await
export function middleware(request: NextRequest) {
  // console.log('Middleware is running', request);
  // 条件语句
  // 第二种方法是使用条件语句：(两种不能合用 配置了matcher 只有matcher匹配才会生效)
  // if (request.nextUrl.pathname.startsWith('/about/')) {
  //   return NextResponse.rewrite(new URL('/', request.url));
  // }
  // if (request.nextUrl.pathname.startsWith('/dashboard/')) {
  //   return NextResponse.rewrite(new URL('/', request.url)); // 重写不会变更浏览器地址栏
  // }
  return NextResponse.redirect(new URL('/', request.url)); // matcher config 对应的处理逻辑
}

// 设置匹配路径
// 1.matcher 配置项
export const config = {
  matcher: [
    {
      source: '/about/:path+'
    }
  ]
};

// /about/:path* 匹配 /about、/about/xxx、/about/xxx/xxx
// /about/:path? 匹配 /about、/about/xxx
// /about/:path+ 匹配 /about/xxx、/about/xxx/xxx
