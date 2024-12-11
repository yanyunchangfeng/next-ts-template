import { FC } from 'react';
import { Suspense } from 'react';
import { PostFeed, Weather, Recommend } from '@/app/dashboard/components';
import Loading from '@/app/loading';
import { isDynamic } from '@/app/shared';

// export const revalidate = 0; //动态流式渲染 会影响github pages的静态网页404

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

// <Suspense> 允许你推迟渲染某些内容，直到满足某些条件（例如数据加载完毕）。

// 你可以将动态组件包装在 Suspense 中，然后向其传递一个 fallback UI，以便在动态组件加载时显示。如果数据请求缓慢，使用 Suspense 流式渲染该组件，不会影响页面其他部分的渲染，更不会阻塞整个页面。

// 这个过程被称之为 Streaming Server Rendering（流式渲染），它解决了上节说的传统 SSR 的第一个问题，那就是数据获取必须在组件渲染之前。使用 Suspense，先渲染 Fallback UI，等数据返回再渲染具体的组件内容。
// 总结一下，使用 Suspense，可以解锁两个主要的好处，使得 SSR 的功能更加强大：

// Streaming Server Rendering（流式渲染）：从服务器到客户端渐进式渲染 HTML
// Selective Hydration（选择性水合）：React 根据用户交互决定水合的优先级
// Suspense 会影响 SEO 吗？
// 首先，Next.js 会等待 generateMetadata 内的数据请求完毕后，再将 UI 流式传输到客户端，这保证了响应的第一部分就会包含 <head> 标签。

// 其次，因为 Streaming 是流式渲染，HTML 中会包含最终渲染的内容，所以它不会影响 SEO。
// Suspense 如何控制渲染顺序？
// 在刚才的例子中，我们是将三个组件同时进行渲染，哪个组件的数据先返回，就先渲染哪个组件。

// 但有的时候，希望按照某种顺序展示组件，比如先展示 PostFeed，再展示Weather，最后展示Recommend，此时你可以将 Suspense 组件进行嵌套：
// Suspense 背后的这种技术称之为 Streaming。将页面的 HTML 拆分成多个 chunks，然后逐步将这些块从服务端发送到客户端。
// 在 Next.js 中有两种实现 Streaming 的方法：

// 页面级别，使用 loading.jsx
// 特定组件，使用 <Suspense>

const DashBoard: FC = async () => {
  console.log('render dashboard');
  return (
    <div className="flex-1  text-red-500 flex  flex-col justify-between items-center">
      <Suspense fallback={<Loading />}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Weather />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Recommend />
      </Suspense>
      {/* 答案是 8s，这些数据请求是同时发送的，所以当 Weather 组件返回的时候，Recommend 组件立刻就展示了出来。 */}
      {/* <Suspense fallback={<Loading />}>
        <PostFeed />
        <Suspense fallback={<Loading />}>
          <Weather />
          <Suspense fallback={<Loading />}>
            <Recommend />
          </Suspense>
        </Suspense>
      </Suspense> */}
    </div>
  );
};

export default DashBoard;
