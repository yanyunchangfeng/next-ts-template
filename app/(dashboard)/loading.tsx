import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="flex justify-center items-center  flex-1">
      <div className="animate-spin rounded-full  h-10 w-10 border-b-2 border-red-900"></div>
    </div>
  );
};
export default Loading;
