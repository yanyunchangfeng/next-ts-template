'use client';

import { useState, useEffect, FC, PropsWithChildren, Suspense } from 'react';
import { CustomComponent, Navigation } from '@/app/components';
import Loading from '@/app/loading';

//   更具体的来说，模板会在导航的时候为每个子级创建一个新实例
const Template: FC<PropsWithChildren> = ({ children }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('count page view');
  }, []);

  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loading />}>
        <CustomComponent title="template" />
      </Suspense>
      <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
        在这里随意输入一些内容：
      </label>
      <div className="mt-2">
        <input
          id="text"
          required
          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {children}
    </div>
  );
};

export default Template;
