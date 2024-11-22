import { FC } from 'react';
import { sleep } from '../utils';

const Team: FC = async () => {
  await sleep(1000 * 10);
  return <h1>Team</h1>;
};

export default Team;
