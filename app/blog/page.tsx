import { FC, use } from 'react';

const getData = async () => {
  // 基于时间的重新验证;
  // 使用基于时间的重新验证，你需要在使用 fetch 的时候设置 next.revalidate 选项（以秒为单位）：
  const res = await fetch('https://api.thecatapi.com/v1/images/search', { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// 异步组件
// const Blog: FC = async () => {
//   const { message } = await getData();
//   return (
//     <div className="h-60 mt-5 flex-1 rounded-xl  text-white flex items-center justify-center">
//       {message}
//     </div>
//   );
// };

const Blog: FC = () => {
  const data = use(getData());

  return (
    <div className="mt-5 flex-1 rounded-xl text-white flex items-center justify-center">
      <img src={data[0].url} alt="cat" width={200} height={200} />
    </div>
  );
};

export default Blog;
