import { FC, use } from 'react';

const getData = async () => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search', { next: { revalidate: 1000 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// 异步组件
// const Blog: FC = async () => {
//   const { message } = await getData();
//   return (
//     <div className="h-60 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
//       {message}
//     </div>
//   );
// };

const Blog: FC = () => {
  const data = use(getData());
  console.log('render Blog', data);

  return (
    <div className="h-60 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      <img src={data[0].url} alt="cat" width={200} height={200} />
    </div>
  );
};

export default Blog;
