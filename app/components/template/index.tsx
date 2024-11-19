import { sleep } from '@/app/utils';
import { FC } from 'react';

export const CustomComponent: FC<{ title: string }> = async ({ title }) => {
  await sleep(1000);
  return (
    <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      Hello, {title}!
    </div>
  );
};
