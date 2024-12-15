'use client';

import { useUserStore } from '@/app/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { Skeleton } from '@/app/components';

export const User: React.FC = () => {
  const { loading, user, fetchUser } = useUserStore();

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return (
      <Avatar>
        <AvatarFallback>
          <Skeleton />
        </AvatarFallback>
      </Avatar>
    );
  return (
    <Avatar>
      <AvatarImage src={user?.user_metadata?.avatar_url} />
      <AvatarFallback>{user?.user_metadata?.name || 'N/A'}</AvatarFallback>
    </Avatar>
  );
};
