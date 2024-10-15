'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_YYCF);
    console.log('non-strictMode render only once');
  }, []);
  return <></>;
}
