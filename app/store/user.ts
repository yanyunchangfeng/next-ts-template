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
        try {
          const {
            data: { user },
            error
          } = await supabase.auth.getUser();
          if (error) throw error;
          if (user) {
            set({ user });
          }
        } catch (error) {
          set({ error });
        } finally {
          set({ loading: false });
        }
      },
      setUser(user: Record<keyof any, any>) {
        set({ user });
      }
    };
    return methods;
  },
  { name: 'user' }
);
