import { sleep } from '@/app/utils';

export async function Weather() {
  await sleep(8000);
  return <h1>Hello Weather</h1>;
}
