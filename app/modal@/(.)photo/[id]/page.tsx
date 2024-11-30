import { FC } from 'react';
import {
  PhotoParams,
  photos
  // isDynamic,
} from '@/app/shared';

// export const dynamicParams = isDynamic;
// Error: Page" /(.)photo/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
export async function generateStaticParams() {
  return photos.map((post) => ({
    id: post.id
  }));
}

const Page: FC<PhotoParams> = ({ params: { id } }) => {
  const photo = photos.find((p) => p.id === id);

  console.log('render @modal photo page');
  return (
    <div className="flex justify-center items-center fixed bottom-0 bg-slate-300 w-full">
      <img src={photo?.src} className="w-52" />
    </div>
  );
};

export default Page;
