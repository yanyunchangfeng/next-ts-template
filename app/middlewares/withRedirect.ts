import {
  NextRequest
  //  NextResponse
} from 'next/server';

export const withRedirect = (index: number, next: (request: NextRequest) => void) => {
  return async (request: NextRequest) => {
    console.log(`Middleware withRedirect index is ${index} running`, request.url);
    // 条件语句
    // 第二种方法是使用条件语句：(两种不能合用 配置了matcher 只有matcher匹配才会生效)
    // if (request.nextUrl.pathname.startsWith('/about/')) {
    //   return NextResponse.rewrite(new URL('/', request.url));
    // }
    // if (request.nextUrl.pathname.startsWith('/dashboard/')) {
    //   return NextResponse.rewrite(new URL('/', request.url)); // 重写不会变更浏览器地址栏
    // }
    // const { pathname, searchParams } = request.nextUrl;
    // if (pathname === '/' && !searchParams.has('redirect')) {
    //   return NextResponse.redirect(new URL('/notes', request.url)); // matcher config 对应的处理逻辑
    // }
    return next(request);
  };
};
