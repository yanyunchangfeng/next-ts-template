import { FC, use } from 'react';
import { sleep } from '../utils';

async function getData() {
  await sleep(3000);
  return {
    message: 'Hello, Blog!'
  };
}
const Blog: FC = () => {
  const { message } = use(getData());

  return (
    <div className="h-60 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      {message}
    </div>
  );
};

export default Blog;
