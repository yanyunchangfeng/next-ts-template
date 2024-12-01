import { sleep } from '@/app/utils';

export async function PostFeed() {
  await sleep(2000);
  return <h1>长风几万里</h1>;
}
