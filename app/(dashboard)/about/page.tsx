import { sleep } from '@/app/utils';
import { FC } from 'react';

const About: FC = async () => {
  await sleep(2000);
  return (
    <div className="flex-1 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center mb-6">
      Hello, About!
    </div>
  );
};
export default About;
