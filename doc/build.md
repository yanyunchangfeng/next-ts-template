- 加载目标路由一共所需的 JS 大小 = 每个路由都需要依赖的 JS 大小 + 目标路由单独依赖的 JS 大小
  - 加载目标路由一共所需的 JS 大小就是 First Load JS
  - 目标路由单独依赖的 JS 大小就是 Size
  - 每个路由都需要依赖的 JS 大小就是图中单独列出来的 First load JS shared by all
- First Load - JS = Size + First load JS shared by all
  - Size：导航到该路由时下载的资源大小，每个路由的大小只包括它自己的依赖项
  - First Load JS：加载该页面时下载的资源大小
  - First load JS shared by all：所有路由共享的 JS 大小会被单独列出来

Next.js 项目常用的脚本有三个：

- npm run dev 用于开发时使用

- npm run build 用于构建生产版本

- npm run start 用于运行生产版本
