import { FC } from 'react';
import { PhotoParams, photos } from '@/app/shared';

// Error: Page "/photo/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
export async function generateStaticParams() {
  return photos.map((post) => ({
    id: post.id
  }));
}

const Page: FC<PhotoParams> = ({ params: { id } }) => {
  const photo = photos.find((p) => p.id === id) ?? photos[1];

  return <img className="max-w-96 max-h-96 mx-auto self-center " src={photo?.src} />;
};

export default Page;
