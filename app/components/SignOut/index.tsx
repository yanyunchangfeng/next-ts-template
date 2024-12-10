'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';

export function SignOut() {
  const supabase = createClient();
  const router = useRouter();
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md  disabled:bg-red-300 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={handleLogout}
    >
      Sign out
    </button>
  );
}
