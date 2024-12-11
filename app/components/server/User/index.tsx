import { createClient } from '@/app/utils/supabase/server';

export async function User() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <div className="flex items-center gap-2">
      <img
        src={user?.user_metadata.avatar_url || 'https://via.placeholder.com/32'}
        alt="User avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
      <h1 className="font-medium"> {user?.user_metadata.name || 'N/A'}</h1>
    </div>
  );
}
