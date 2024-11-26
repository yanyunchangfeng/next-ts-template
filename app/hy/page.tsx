'use client';
import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Time from '@/app/hy/time/page';

// 2 禁用特定组件的 SSR 渲染
const WebApi = dynamic(() => import('@/app/hy/webapi/page'), { ssr: false });
// 导致水合错误的原因有很多：

// 渲染的时候，使用了诸如 typeof window !== 'undefined' 这样的判断
// 渲染的时候，使用了仅限浏览器的 API，比如 window 或 localStorage
// 渲染的时候，使用了时间相关的 API，比如 Date()
// 浏览器扩展修改了 HTML
const HY: FC = () => {
  const [isClient, setIsClient] = useState(false);
  // 1.使用 useEffect 仅在客户端运行
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>
      <WebApi />
      <Time />
    </>
  );
};

export default HY;
