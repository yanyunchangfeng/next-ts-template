import { FC } from 'react';
import { PhotoParams, photos } from '@/app/shared';

const fetchPhotos = async () => {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
};

// Error: Page "/photo/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
export async function generateStaticParams() {
  const posts = await fetchPhotos(); // 你需要根据实际情况修改 fetchPosts 函数

  return posts.map((post) => ({
    id: post.id
  }));
}

const Page: FC<PhotoParams> = ({ params: { id } }) => {
  const photo = photos.find((p) => p.id === id);

  return <img className="block w-1/4 mx-auto mt-10" src={photo?.message} />;
};

export default Page;
