import { FC } from 'react';
import { sleep } from '../utils';

const Analytics: FC = async () => {
  await sleep(1000 * 5);
  return <h1>Analytics</h1>;
};
export default Analytics;
