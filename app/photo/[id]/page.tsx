'use client';

import { FC } from 'react';
import { isDynamic, PhotoParams, photos } from '@/app/shared';
import React from 'react';
import { Skeleton, AspectRatioImage } from '@/app/components';

// Error: Page "/photo/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
// export async function generateStaticParams() {
//   return photos.map((post) => ({
//     id: post.id
//   }));
// }

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

const Page: FC<PhotoParams> = ({ params: { id } }) => {
  const [photo, setPhoto] = React.useState<{ src: string; id: string }[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = async () => {
    if (!isDynamic) {
      return [photos[1]];
    }
    const res = await fetch(`/api/photo/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data as { src: string; id: string }[];
  };
  const fetchPhoto = async () => {
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);
    setPhoto(data);
  };

  React.useEffect(() => {
    fetchPhoto();
  }, []);

  const PhotoItem = React.useMemo(() => {
    if (isLoading) {
      return <Skeleton />;
    }
    const src = photo[0]?.src;
    return <AspectRatioImage src={src} fill alt="dog" className="w-[400px]  mx-auto self-center" />;
  }, [isLoading, photo]);

  return PhotoItem;
};

export default Page;
