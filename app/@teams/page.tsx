import { FC } from 'react';
import { sleep } from '../utils';

const Team: FC = async () => {
  await sleep(1000);
  return (
    <div className="h-20 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      Hello, Teams!
    </div>
  );
};

export default Team;
