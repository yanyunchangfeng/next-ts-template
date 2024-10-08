'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log('non-strictMode render only once');
  }, []);
  return (
    <>
      <div>长风几万里 吹度玉门关</div>
    </>
  );
}
