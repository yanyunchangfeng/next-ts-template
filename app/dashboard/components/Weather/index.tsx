import { sleep } from '@/app/utils';

export async function Weather() {
  await sleep(1000 * 8);
  return <h1>燕云长风</h1>;
}
