'use client';
import { FC } from 'react';

// 导致水合错误的原因有很多：

// 渲染的时候，使用了诸如 typeof window !== 'undefined' 这样的判断
// 渲染的时候，使用了仅限浏览器的 API，比如 window 或 localStorage
// 渲染的时候，使用了时间相关的 API，比如 Date()
// 浏览器扩展修改了 HTML
const SC: FC = () => {
  //   const [isClient, setIsClient] = useState(false);
  const eventDate = new Date();
  //   useEffect(() => {
  //     setIsClient(true);
  //   }, []);
  //   return <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>;
  //   if (typeof window !== 'undefined') return <div>Hello Browser</div>;
  //   return <div>Hello Node!</div>;
  return (
    <time dateTime={eventDate.toISOString()} suppressHydrationWarning>
      {eventDate.toISOString()}
    </time>
  );
};

export default SC;
