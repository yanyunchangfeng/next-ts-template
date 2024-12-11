'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { Button } from '@/components/ui/button';

export function SignOut() {
  const supabase = createClient();
  const router = useRouter();
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/blog');
    router.refresh();
  }

  return <Button onClick={handleLogout}>Sign out</Button>;
}
