'use client';
import { FC, PropsWithChildren, useState } from 'react';

const ClientComponent: FC<PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  );
};

export default ClientComponent;
