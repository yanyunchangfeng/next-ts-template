// 'use client';
import { FC } from 'react';

const BlogSlug: FC<any> = ({ params }) => {
  return (
    <div>
      <h1>blog {params.slug}</h1>
    </div>
  );
};

export default BlogSlug;
