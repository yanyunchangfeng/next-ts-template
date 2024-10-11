import { FC } from 'react';

const fetchPosts = async () => {
  return [{ slug: 'english' }];
};

export async function generateStaticParams() {
  // 从数据源获取所有博客文章的 slug
  const posts = await fetchPosts(); // 你需要根据实际情况修改 fetchPosts 函数

  return posts.map((post) => ({
    slug: post.slug
  }));
}

interface BlogSlugProps {
  params: {
    slug: string;
  };
}

const BlogSlug: FC<BlogSlugProps> = ({ params }) => {
  return (
    <div>
      <h1>blog {params.slug}</h1>
    </div>
  );
};

export default BlogSlug;
