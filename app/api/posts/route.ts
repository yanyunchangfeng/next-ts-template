import { NextResponse, NextRequest } from 'next/server';

// 路由处理程序是指使用 Web Request 和 Response API 对于给定的路由自定义处理逻辑。

// 简单的来说，前后端分离架构中，客户端与服务端之间通过 API 接口来交互。这个“API 接口”在 Next.js 中有个更为正式的称呼，就是路由处理程序。

// 1. 定义路由处理程序
// 写路由处理程序，你需要定义一个名为 route.ts的特殊文件。（注意是 route 不是 router）
// 该文件必须在 app目录下，可以在 app 嵌套的文件夹下，但是要注意 page.js和 route.js不能在同一层级同时存在。

// 想想也能理解，page.ts和 route.ts本质上都是对路由的响应。page.ts主要负责渲染 UI，route.ts主要负责处理请求。如果同时存在，Next.js 就不知道用谁的逻辑了。

// (1.3).传入参数;
// (1.4).缓存行为;
// 默认情况下，使用 Response 对象（NextResponse 也是一样的）的 GET 请求会被缓存。

// 退出缓存
// 但大家也不用担心默认缓存带来的影响。实际上，默认缓存的条件是非常“严苛”的，这些情况都会导致退出缓存：
// GET 请求使用 Request 对象
// 添加其他 HTTP 方法，比如 POST
// 使用像 cookies、headers 这样的动态函数
// 路由段配置项手动声明为动态模式

// 重新验证

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, context: { params: object }) {
  //  访问 /home, pathname 的值为 /home
  const pathname = request.nextUrl.pathname;
  // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
  const searchParams = request.nextUrl.searchParams;
  console.log('pathname', pathname);
  console.log('searchParams', searchParams);
  console.log('context', context);
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const article = await request.json();
  return NextResponse.json(
    {
      id: Math.random().toString(36).slice(-8),
      data: article
    },
    { status: 201 }
  );
}
