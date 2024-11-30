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

    createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    });

    return supabaseResponse;
  };
};
