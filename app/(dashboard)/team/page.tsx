import { sleep } from '@/app/utils';
import { FC } from 'react';

const Team: FC = async () => {
  await sleep(2000);
  return (
    <div className="flex-1 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center mb-6">
      Hello, Team!
    </div>
  );
};
export default Team;
