import { FC } from 'react';
import ClientComponent from '@/app/client-with-server/client-component';
import ServerComponent from '@/app/client-with-server/server-component';

const Page: FC = () => {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  );
};
export default Page;
