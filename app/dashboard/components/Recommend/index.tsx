import { sleep } from '@/app/utils';

export async function Recommend() {
  await sleep(5000);
  return <h1>Hello Recommend</h1>;
}
