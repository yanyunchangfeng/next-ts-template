import { sleep } from '@/app/utils';
import { FC } from 'react';

const Team: FC = async () => {
  await sleep(4000);
  return (
    <div>
      <h1>Team</h1>
      <p>This is the Team page</p>
    </div>
  );
};
export default Team;
