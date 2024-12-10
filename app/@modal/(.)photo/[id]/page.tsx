import { FC } from 'react';
import {
  PhotoParams,
  photos
  // isDynamic,
} from '@/app/shared';

// export const dynamicParams = isDynamic;
// Error: Page" /(.)photo/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
// export async function generateStaticParams() {
//   return photos.map((post) => ({
//     id: post.id
//   }));
// }

const Page: FC<PhotoParams> = ({ params: { id } }) => {
  const photo = photos.find((p) => p.id === id);

  console.log('render @modal photo page');
  return (
    <div className="flex justify-center items-center fixed bottom-0 w-full -z-10 mb-4 opacity-50 ">
      <img src={photo?.src} className="w-64 h-64 rounded-full object-cover" />
    </div>
  );
};

export default Page;
