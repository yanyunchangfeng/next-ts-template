import { FC } from 'react';
// . 动态路由（Dynamic Routes）
// 1.1. [folderName]
// 使用动态路由，你需要将文件夹的名字用方括号括住，比如 [id]、[slug]。这个路由的名字会作为 params prop 传给布局、 页面、 路由处理程序 以及 generateMetadata 函数。
interface BlogSlugProps {
  params: {
    slug: string;
  };
}

// 1.2. [...folderName]
// 在命名文件夹的时候，如果你在方括号内添加省略号，比如 [...folderName]，这表示捕获所有后面所有的路由片段。

// 1.3. [[...folderName]]
// 在命名文件夹的时候，如果你在双方括号内添加省略号，比如 [[...folderName]]，这表示可选的捕获所有后面所有的路由片段。
// 它与上一种的区别就在于，不带参数的路由也会被匹配（就比如 /blog） 当你访问 /blog的时候，params 的值为 {}。
const fetchPosts = async () => {
  return [{ slug: ['english', 'daodejing'] }];
};

// Error: Page "/blog/[slug]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
export async function generateStaticParams() {
  // 从数据源获取所有博客文章的 slug
  const posts = await fetchPosts(); // 你需要根据实际情况修改 fetchPosts 函数

  return posts.map((post) => ({
    slug: post.slug
  }));
}

const BlogSlug: FC<BlogSlugProps> = ({ params }) => {
  console.log('params', params); // { slug: ['english', 'daodejing'] }
  return (
    <div>
      <h1>blog {JSON.stringify(params)}</h1>
    </div>
  );
};

export default BlogSlug;
