import { sleep } from '@/app/utils';

export async function PostFeed() {
  await sleep(2000);
  return <h1>Hello PostFeed</h1>;
}
