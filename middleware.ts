import { chain } from '@/app/utils';
import { withRedirect, withLogging } from '@/app/middlewares';

export default chain([withLogging, withRedirect]);
// 设置匹配路径
// 1.matcher 配置项
export const config = {
  matcher: [
    {
      source: '/about/:path+'
    }
  ]
};

// /about/:path* 匹配 /about、/about/xxx、/about/xxx/xxx
// /about/:path? 匹配 /about、/about/xxx
// /about/:path+ 匹配 /about/xxx、/about/xxx/xxx
