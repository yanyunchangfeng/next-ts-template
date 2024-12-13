'use client';

import React from 'react';
import { DropDownMenu } from '@/app/components';
import { User } from '@/app/components';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { logOut } from '@/app/utils';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks';

export const DropDownUser: React.FC<React.PropsWithChildren> = () => {
  const { user } = useUser();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleLogOut = async () => {
    await logOut();
    router.push('/blog');
    router.refresh();
  };
  return (
    <DropDownMenu
      open={open}
      onOpenChange={setOpen}
      dir="ltr"
      content={
        <>
          <DropdownMenuLabel>{user?.user_metadata?.name || 'N/A'}</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleLogOut} disabled={!user}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </>
      }
    >
      <User />
    </DropDownMenu>
  );
};
