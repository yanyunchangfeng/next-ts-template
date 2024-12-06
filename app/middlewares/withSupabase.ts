import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const withSupabase = (
  index: number
  // next: (request: NextRequest) => void
) => {
  return async (request: NextRequest) => {
    console.log(`Middleware withSupabase index is ${index} running`, request.url);
    // Create an unmodified response
    let supabaseResponse = NextResponse.next({
      request
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // setAll 本质上是在以下情景中调用的：
            // 会话初始化：当用户首次登录，或者会话信息需要更新时，Supabase 会将新的认证信息存储到 cookies。
            // 会话更新：当你刷新会话（例如通过 auth.refreshSession()）时，更新后的会话信息会通过 setAll 被写入 cookies。
            // token 刷新：在某些操作中，可能会生成新的 token，这时也需要调用 setAll 更新 cookies 中的 token 信息。
            console.log('Setting cookies:', cookiesToSet);
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request
            });
            cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
          }
        }
      }
    );
    const { origin } = new URL(request.url);
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/v1/callback`,
        // redirectTo: `https://epcmgkebpuxlvuoplnrg.supabase.co/auth/v1/callback`
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    if (data.url) {
      console.log('Redirecting to:', data.url);
      return NextResponse.redirect(data.url);
    }

    return supabaseResponse;
  };
};
