import { NextResponse } from 'next/server';

// 这是因为 Next.js 拓展了原生的 fetch 方法，会自动缓存 fetch 的结果。现在我们使用 next.revalidate 设置 fetch 请求的重新验证时间，修改 app/api/image/route.ts，代码
export async function GET() {
  const res = await fetch('https://api.thecatapi.com/v1/images/search', { next: { revalidate: 5 } });
  const data = await res.json();
  console.log(data);
  return NextResponse.json(data);
}
