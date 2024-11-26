import { FC } from 'react';
import { PhotoParams, photos } from '@/app/shared';

// Error: Page "/photo/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
export async function generateStaticParams() {
  return photos.map((post) => ({
    id: post.id
  }));
}

const Page: FC<PhotoParams> = ({ params: { id } }) => {
  const photo = photos.find((p) => p.id === id);

  return <img className="block w-1/4 mx-auto mt-10" src={photo?.src} />;
};

export default Page;
