import { FC } from 'react';

const WebApi: FC = () => {
  if (typeof window !== 'undefined') return <div>Hello Browser</div>;
  return <div>Hello Node!</div>;
};

export default WebApi;
