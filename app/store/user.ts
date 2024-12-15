/* eslint-disable */

import { createPersistStore } from '@/app/utils';
import { createClient } from '@/app/utils/supabase/client';

const DEFAULT_USER = {
  user: null as any,
  error: null as any,
  loading: true
};

export const useUserStore = createPersistStore(
  { ...DEFAULT_USER },
  (set, _get) => {
    function get() {
      return {
        ..._get(),
        ...methods
      };
    }
    const methods = {
      async fetchUser() {
        const supabase = createClient();
        supabase.auth.onAuthStateChange((event, session) => {
          switch (event) {
            case 'INITIAL_SESSION':
              set({ user: session?.user as any });
              break;
            case 'SIGNED_IN':
              // 这里不会触发 因为我们是在服务端登录后导航的，所以这里不会触发 因此主动调用fetchUser
              // console.log('User signed in:', session);
              // 本地没有触发 然而在vercel上可以触发 所以注释掉
              break;
            case 'SIGNED_OUT':
              set({ user: session?.user as any });
          }
          set({ loading: false });
        });
      },
      setUser(user: Record<keyof any, any>) {
        set({ user });
      }
    };
    return methods;
  },
  { name: 'user' }
);
