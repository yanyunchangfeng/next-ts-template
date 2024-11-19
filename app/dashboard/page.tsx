import { FC } from 'react';
import { sleep } from '../utils';

async function getData() {
  await sleep(5000);
  return {
    message: 'Hello, DashBoard!'
  };
}
const DashBoard: FC = async () => {
  const { message } = await getData();
  return (
    <div className="h-60 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      {message}
    </div>
  );
};

export default DashBoard;
