'use client';

import { useState, useEffect, FC, PropsWithChildren, Suspense } from 'react';
import { CustomComponent } from '@/app/components';
import Loading from './loading';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

//   更具体的来说，模板会在导航的时候为每个子级创建一个新实例
const Template: FC<PropsWithChildren> = ({ children }) => {
  const [text, setText] = useState('');
  const router = useRouter();
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
        {/* App Router 的默认行为是滚动到新路由的顶部，
        或者在前进后退导航时维持之前的滚动距离。
        如果你想要禁用这个行为，你可以给 <Link> 组件传递一个 scroll={false}属性，
        或者在使用 router.push和 router.replace的时候，设置 scroll: false */}
        <button onClick={() => router.push('/', { scroll: false })} className="text-blue-600">
          返回首页
        </button>
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
