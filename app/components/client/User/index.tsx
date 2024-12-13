'use client';

import { useUser } from '@/app/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const User: React.FC = () => {
  const { user } = useUser();

  return (
    <Avatar>
      <AvatarImage src={user?.user_metadata?.avatar_url} />
      <AvatarFallback>{user?.user_metadata?.name || 'N/A'}</AvatarFallback>
    </Avatar>
  );
};
