import { FC } from 'react';
import { sleep } from '@/app/utils';

const Analytics: FC = async () => {
  await sleep(1000 * 2);
  return (
    <div className="h-20 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      Hello, Analytics!
    </div>
  );
};
export default Analytics;
