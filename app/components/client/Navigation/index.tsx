'use client';

// import clsx from 'clsx';
// import Link from 'next/link';
import {
  // usePathname,
  useRouter
} from 'next/navigation';
import React from 'react';
import { SignOut } from '@/app/components';
import { Button } from '@/components/ui/button';

export const Navigation: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const path = usePathname(); // 获取当前路径
  const router = useRouter();
  // const notesClasses = clsx('hover:text-red-600', {
  //   'text-red-500': path === '/notes'
  // });
  // const blogClasses = clsx('hover:text-red-600', {
  //   'text-red-500': path === '/blog'
  // });
  // const homeClasses = clsx('hover:text-red-600', {
  //   'text-red-500': path === '/'
  // });
  return (
    <nav className="flex items-center justify-center gap-2  py-4">
      {children}
      <Button onClick={() => router.push('/notes', { scroll: false })} variant="link">
        notes
      </Button>
      <Button onClick={() => router.push('/blog', { scroll: false })} variant="link">
        blog
      </Button>
      {/* App Router 的默认行为是滚动到新路由的顶部，
    或者在前进后退导航时维持之前的滚动距离。
    如果你想要禁用这个行为，你可以给 <Link> 组件传递一个 scroll={false}属性，
    或者在使用 router.push和 router.replace的时候，设置 scroll: false */}
      <Button onClick={() => router.push('/?redirect=false', { scroll: false })} variant="link">
        home
      </Button>
      <SignOut />
    </nav>
  );
};
