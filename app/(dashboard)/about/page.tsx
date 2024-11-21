import { sleep } from '@/app/utils';
import { FC } from 'react';

const About: FC = async () => {
  await sleep(2000);
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
    </div>
  );
};
export default About;
