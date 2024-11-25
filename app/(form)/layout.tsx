'use client';
import { FC, PropsWithChildren, Suspense } from 'react';
import { CustomComponent } from '@/app/components';
import Loading from '../loading';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const path = usePathname(); // 获取当前路径
  return (
    <div className="p-5 text-red-500">
      <nav className="flex items-center justify-center gap-5 text-blue-600">
        <Link href="/a" className={path === '/a' ? 'text-blue' : 'text-black'}>
          a
        </Link>
        <Link href="/b" className={path === '/b' ? 'text-blue' : 'text-black'}>
          b
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <CustomComponent title="layout" />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
