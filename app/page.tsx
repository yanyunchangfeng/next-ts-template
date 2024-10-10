'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log('non-strictMode render only once');
  }, []);
  return <></>;
}
