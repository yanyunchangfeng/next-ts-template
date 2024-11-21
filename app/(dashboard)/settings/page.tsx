import { sleep } from '@/app/utils';
import { FC } from 'react';

const Settings: FC = async () => {
  await sleep(3000);
  return (
    <div>
      <h1>Settings</h1>
      <p>This is the Settings page</p>
    </div>
  );
};
export default Settings;
