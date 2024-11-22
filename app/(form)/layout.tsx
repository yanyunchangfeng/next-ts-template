import { FC, PropsWithChildren, Suspense } from 'react';
import { CustomComponent } from '@/app/components';
import Loading from '../loading';
import Link from 'next/link';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-5 text-white">
      <nav className="flex items-center justify-center gap-10 text-blue-600">
        <Link href="/a">a</Link>
        <Link href="/b">b</Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <CustomComponent title="layout" />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
