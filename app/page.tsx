// import { useState } from 'react';

// 1.在 Next.js 中，组件默认就是服务端组件。

// 2. 优势
// 使用服务端渲染有很多好处：
// 数据获取：通常服务端环境（网络、性能等）更好，离数据源更近，在服务端获取数据会更快。通过减少数据加载时间以及客户端发出的请求数量来提高性能
// 安全：在服务端保留敏感数据和逻辑，不用担心暴露给客户端
// 缓存：服务端渲染的结果可以在后续的请求中复用，提高性能
// bundle 大小：服务端组件的代码不会打包到 bundle 中，减少了 bundle 包的大小
// 初始页面加载和 FCP：服务端渲染生成 HTML，快速展示 UI
// Streaming：服务端组件可以将渲染工作拆分为 chunks，并在准备就绪时将它们流式传输到客户端。用户可以更早看到页面的部分内容，而不必等待整个页面渲染完毕
// 因为服务端组件的诸多好处，在实际项目开发的时候，能使用服务端组件就尽可能使用服务端组件。

// 3. 限制
// 虽然使用服务端组件有很多好处，但使用服务端组件也有一些限制，比如不能使用 useState 管理状态，不能使用浏览器的 API 等等。如果我们使用了 Next.js 会报错

import Link from 'next/link';
import { use, type FC } from 'react';
import { photos } from './shared';

const fetchData = async () => {
  // const url = process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  // console.log('url', url);
  // const res = await fetch(`${url}/api/photo`);
  // const data = await res.json();
  // return data.data as { src: string; id: string }[];
  return photos;
};

const Home: FC = () => {
  const photos = use(fetchData());

  console.log('render home', photos);

  return (
    <main className="flex justify-center">
      {photos.map(({ src, id }) => {
        return (
          <Link key={id} href={`/photo/${id}`}>
            <img width="100" src={src} className="m-1" />
          </Link>
        );
      })}
    </main>
  );
};
export default Home;
