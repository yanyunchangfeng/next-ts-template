import { FC } from 'react';
// . 动态路由（Dynamic Routes）
// 1.1. [folderName]
// 使用动态路由，你需要将文件夹的名字用方括号括住，比如 [id]、[slug]。这个路由的名字会作为 params prop 传给布局、 页面、 路由处理程序 以及 generateMetadata 函数。
interface BlogSlugProps {
  params: {
    slug: string;
  };
}

const fetchPosts = async () => {
  return [{ slug: 'english' }];
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
  return (
    <div>
      <h1>blog {params.slug}</h1>
    </div>
  );
};

export default BlogSlug;
