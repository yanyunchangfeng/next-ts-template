import { FC } from 'react';

// 3.使用 suppressHydrationWarning 消除警告
const Time: FC = () => {
  const eventDate = new Date();
  return (
    <time dateTime={eventDate.toISOString()} suppressHydrationWarning>
      {eventDate.toISOString()}
    </time>
  );
};
export default Time;
