// 除了退出缓存，也可以设置缓存的时效，适用于一些重要性低、时效性低的页面。
// export const revalidate = 10 表示设置重新验证频率为 10s，但是要注意：

// 这句代码的效果并不是设置服务器每 10s 会自动更新一次 /api/time。而是最少 10s 后才重新验证。

// 举个例子，假设你现在访问了 /api/time，此时时间设为 0s，10s 内持续访问，/api/time返回的都是之前缓存的结果。当 10s 过后，假设你第 12s 又访问了一次 /api/time，此时虽然超过了 10s，但依然会返回之前缓存的结果，但同时会触发服务器更新缓存，当你第 13s 再次访问的时候，就是更新后的结果。

// 简单来说，超过 revalidate 设置时间的首次访问会触发缓存更新，如果更新成功，后续的返回就都是新的内容，直到下一次触发缓存更新。
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET() {
  return NextResponse.json({ data: new Date().toLocaleTimeString() });
}
