'use client';

import { useState, useEffect, FC, PropsWithChildren, Suspense } from 'react';
import { CustomComponent } from '@/app/components';
import Loading from './loading';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//   更具体的来说，模板会在导航的时候为每个子级创建一个新实例
const Template: FC<PropsWithChildren> = ({ children }) => {
  const [text, setText] = useState('');
  const path = usePathname();

  useEffect(() => {
    console.log('count page view');
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-center gap-10 text-blue-600">
        <Link href="/blog" className={path === '/blog' ? 'text-blue' : 'text-black'}>
          blog
        </Link>
        <Link href="/dashboard" className={path === '/dashboard' ? 'text-blue' : 'text-black'}>
          dashboard
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <CustomComponent title="template" />
      </Suspense>
      <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
        在这里随意输入一些内容：
      </label>
      <div className="mt-2">
        <input
          id="text"
          required
          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {children}
    </div>
  );
};

export default Template;
