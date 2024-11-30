import Link from 'next/link';
import { isDynamic } from '@/app/shared';

// export const revalidate = 0; //动态流式渲染 会影响github pages的静态网页404

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';
// 2. 路由组（Route groups）
// 在 app目录下，文件夹名称通常会被映射到 URL 中，但你可以将文件夹标记为路由组，阻止文件夹名称被映射到 URL 中。
// 2.1. 按逻辑分组
// 将路由按逻辑分组，但不影响 URL 路径
// 2.2. 创建不同布局
// 借助路由组，即便在同一层级，也可以创建不同的布局：
// 2.3. 创建多个根布局
// 创建多个根布局：
// 创建多个根布局，你需要删除掉 app/layout.js 文件，然后在每组都创建一个 layout.js文件。创建的时候要注意，因为是根布局，所以要有 <html> 和 <body> 标签。

// 这个功能很实用，比如你将前台购买页面和后台管理页面都放在一个项目里，一个 C 端，一个 B 端，两个项目的布局肯定不一样，借助路由组，就可以轻松实现区分。

// 再多说几点：

// 路由组的命名除了用于组织之外并无特殊意义。它们不会影响 URL 路径。
// 注意不要解析为相同的 URL 路径。举个例子，因为路由组不影响 URL 路径，所以 (marketing)/about/page.js和 (shop)/about/page.js都会解析为 /about，这会导致报错。
// 创建多个根布局的时候，因为删除了顶层的 app/layout.js文件，访问 /会报错，所以app/page.js需要定义在其中一个路由组中。
// 跨根布局导航会导致页面完全重新加载，就比如使用 app/(shop)/layout.js根布局的 /cart 跳转到使用 app/(marketing)/layout.js根布局的 /blog 会导致页面重新加载（full page load）。

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <nav className="flex items-center justify-center gap-10 text-blue-600 mb-6">
        <Link href="/about">About</Link>
        <Link href="/settings">Settings</Link>
        <Link href="/team">Team</Link>
      </nav>
      {children}
    </section>
  );
}
