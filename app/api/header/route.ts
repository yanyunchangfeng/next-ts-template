import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { isStatic, isVercel } from '@/app/shared';

// 2.2. 如何处理 Cookie？
// 其中，request 是一个 NextRequest 对象。正如上节所说，NextRequest 相比 Request 提供了更为便捷的用法，这就是一个例子。

// 此外，虽然我们使用 set 设置了 cookie，但设置的是请求的 cookie，并没有设置响应的 cookie。

// 第二种方法是通过next/headers包提供的 cookies方法。

// 2.3. 如何处理 Headers ？
// export async function GET(request) {
//   const headersList = new Headers(request.headers)
//   const referer = headersList.get('referer')
// }
export const dynamic = isVercel || !isStatic ? 'force-dynamic' : 'force-static';

export const GET = async () => {
  //   const token = request.cookies.get('token');
  //   console.log('token', token);
  //   request.cookies.set(`token2`, '123');
  const headersList = headers();
  const referer = headersList.get('referer');
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
  console.log('token', token);
  return NextResponse.json(
    { data: 'hello world' },
    {
      status: 200,
      headers: {
        referer: referer ?? '',
        'Set-Cookie': `token=${token?.value}`
      }
    }
  );
};
