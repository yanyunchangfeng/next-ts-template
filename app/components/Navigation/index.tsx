'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FC, memo } from 'react';

const Navigation: FC = () => {
  const path = usePathname(); // 获取当前路径
  const router = useRouter();
  return (
    <nav className="flex items-center justify-center gap-10 text-blue-600 mb-6">
      <Link href="/blog" className={path === '/blog' ? 'text-blue' : 'text-black'}>
        blog
      </Link>
      <Link href="/a" className={path === '/a' || path === '/b' ? 'text-blue' : 'text-black'}>
        a/b
      </Link>
      {/* <Link href="/blog">blog</Link> */}
      <Link href="/dashboard" className={path === '/dashboard' ? 'text-blue' : 'text-black'}>
        dashboard
      </Link>
      {/* <Link href="/dashboard">dashboard</Link> */}
      <Link
        href="/about"
        className={path === '/about' || path === '/settings' || path === '/team' ? 'text-blue' : 'text-black'}
      >
        dashboard group
      </Link>
      <Link href="/page-views" className={path === '/page-views' ? 'text-blue' : 'text-black'}>
        PageViews
      </Link>
      <Link href="/visitors" className={path === '/visitors' ? 'text-blue' : 'text-black'}>
        Visitors
      </Link>
      {/* <Link href="/about">dashboard group</Link> */}
      {/* App Router 的默认行为是滚动到新路由的顶部，
    或者在前进后退导航时维持之前的滚动距离。
    如果你想要禁用这个行为，你可以给 <Link> 组件传递一个 scroll={false}属性，
    或者在使用 router.push和 router.replace的时候，设置 scroll: false */}
      <button onClick={() => router.push('/', { scroll: false })} className="text-blue-600">
        返回首页
      </button>
      {/* <Link href="/">返回首页</Link> */}
    </nav>
  );
};

export default memo(Navigation);
