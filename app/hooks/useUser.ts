/* eslint-disable */

import React from 'react';
import { createClient } from '@/app/utils/supabase/client';

export function useUser() {
  const [user, setUser] = React.useState<Record<keyof any, any> | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<null>(null);
  const supabase = createClient();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // 这里不会触发 因为我们是在服务端登录后导航的，所以这里不会触发 因此主动调用fetchUser
        // console.log('User signed in:', session);
        // 本地没有触发 然而在vercel上可以触发 所以注释掉
      } else if (event === 'SIGNED_OUT') {
        setUser(session?.user as any);
      }
    });
    async function fetchUser() {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          setUser(user as any);
        }
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { loading, error, user };
}
