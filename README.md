### 初始化项目
```
pnpm create vite@latest
```

### 安装依赖文件
安装 node-sass
```
pnpm install node-sass sass 
```
安装资源加载器
```
pnpm install sass-resources-loader // 资源加载器
```

安装 axios
```
pnpm install axios
```
安装 UI框架
直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
```
pnpm add antd-mobile
```




安装 px2rem lib-flexible 依赖
```
pnpm install lib-flexible --save

pnpm install postcss-px2rem

pnpm install tailwindcss
pnpm install vite-plugin-tailwind
```
1. 配置tailwindcss
```javascript
// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```
2. 配置 `postcss-px2rem`：

在项目根目录下创建一个名为 `postcss.config.js` 的文件，然后配置 `postcss-px2rem` 插件。例如：

```javascript
module.exports = {
  plugins: [
    require('postcss-px2rem')({
      remUnit: 75 // 在 750px 屏幕下，1px = 75rem
    })
  ]
};
```

3. 引入 `lib-flexible` 并配置基准值：

在入口文件中引入 `lib-flexible` 并配置基准值，如：

```javascript 
import 'lib-flexible';
import { setRem } from 'lib-flexible';

setRem(750); // 设计稿宽度为 750px
```

重要提示：`postcss-px2rem` 转换后的 rem 值与 `lib-flexible` 所设置的基准值有关，所以一定要保证两者的设置一致。

4. 在代码中使用像素值进行开发：

在 CSS 文件中使用像素值进行开发，例如：

```css
.div {
  width: 150px;  /* 会被自动转换为 2rem */
  height: 100px; /* 会被自动转换为 1.3333rem */
  font-size: 24px; /* 会被自动转换为 0.32rem */
}
```

这样配置之后，代码中的像素值会被自动转换为 rem 值，实现移动端屏幕的适配。

如果想要在某些情况下依然使用像素值，例如需要使用 `border` 等样式时，可以将其转换为 `px`，例如：

```css
.div {
  border: 1px solid #000;
  margin-bottom: 15px; /* 会被自动转换为 0.2rem */
}
```

上述是 `postcss-px2rem` 和 `lib-flexible` 在 React 中的结合使用方法。

安装eslint代码检测
```
 pnpm install eslint
```
生成eslint 文件 
```
npx eslint --init
```
如何选择eslint 配置 
> 1.To check syntax only // 只检测语法性错误 (我选择这个)
> 
> 2.To check syntax and find problems // 检查语法错误并发现问题代码
> 
> 3.To check syntax, find problems, and enforce code style // 检查语法错误，发现问题代码，校验代码风格

项目使用什么类型的模块？(这里我选择1)
> 1.JavaScript modules (import/export) // 允许import/export
> 
> 2.CommonJS (require/exports) // 允许require/exports
> 
> 3.None of these // 没有任何模块化

项目使用哪个框架？(选择1)
> 1.React
> 
> 2.Vue.js
> 
> 3.None of these
>
项目使用Ts？(Yes)
> Does your project use TypeScript? › No / Yes
>
代码运行环境？(浏览器)
> 1.Browser // 浏览器
> 
> 2.Node // node环境
>
如何定义项目定义样式？(使用流行的风格指南)
✔ What format do you want your config file to be in? >  JavaScript
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
✔ Would you like to install them now? · 我选择 Yes 
✔ Which package manager do you want to use? · 我选择 pnpm


安装 @types/node
```
pnpm install @types/node
```

修改vite.config.ts配置文件 配置别名
这里需要 安装 @types/node 
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:{
      "@":path.resolve(__dirname,'./src')//配置@别名
    }
  },
})
```

为了ts不报错需要配置 tsconfig.json 具体tsconfig配置参数详解
```
{
  "compilerOptions": {
    "target": "ESNext",// 指定ECMAScript目标版本
    "useDefineForClassFields": true,//此标志用作迁移到即将推出的类字段标准版本的一部分
    "lib": ["DOM", "DOM.Iterable", "ESNext"],//用于指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载
    "allowJs": false, // 允许 ts 编译器编译 js 文件
    "skipLibCheck": true, // 跳过声明文件的类型检查
    "esModuleInterop": false,// es 模块互操作，屏蔽 ESModule和CommonJS之间的差异
    "allowSyntheticDefaultImports": true, // 允许通过import x from 'y' 即使模块没有显式指定 default 导出
    "strict": true,//true => 同时开启 alwaysStrict, noImplicitAny, noImplicitThis 和 strictNullChecks
    "forceConsistentCasingInFileNames": true, // 对文件名称强制区分大小写
    "module": "ESNext",// 指定生成哪个模块系统代码
    "moduleResolution": "Node",// 模块解析（查找）策略
    "resolveJsonModule": true,// 防止 ts文件中引入json文件，会报如下红色波浪线
    "isolatedModules": true,// 是否将没有 import/export 的文件视为旧（全局而非模块化）脚本文件。
    "noEmit": true,  // 编译时不生成任何文件（只进行类型检查）
    "jsx": "react-jsx",  // 指定将 JSX 编译成什么形式
    "baseUrl": "./src",//配置paths前先配置baseUrl
    "paths": {
      "@/*": ["*"], // 模块名到基于 baseUrl的路径映射的列表
    },
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

路由 react-router-dom@6配置
```
pnpm add react-router-dom@6  @types/react-router-dom --save-dev
```
在根文件main.tsx里面 修改 在app外层用BrowserRouter包裹
```
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
 
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```
创建 router 文件夹下创建index.tsx
```
import { Routes, Route } from "react-router-dom";
import {lazy} from "react";
 
const Home = lazy(() => import("@/pages/home")) 
const Login = lazy(() => import("@/pages/login")) 
 
function RootRoute() :JSX.Element{
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default RootRoute
```

### 封装axios
新增http文件夹
新建.env 区分环境
修改package.json 启动命令
```
  "scripts": {
    "dev": "vite serve --mode development",
    "build:pro": "tsc && vite build --mode production",
  },
  ```
  axiosCancel.ts

💡 Tips：先下载qs模块
```
pnpm install qs
```
如确认下载qs模块后 遇见qs报错 则需要 下载@types/qs
```
pnpm install @types/qs -D
```

vite配置代码压缩
1. 安装 `rollup-plugin-terser` 插件

```bash
npm install rollup-plugin-terser --save-dev
```

2. 配置 `vite.config.js` 文件

```javascript
import { defineConfig } from 'vite';
import { terser } from 'rollup-plugin-terser'; // 导入 rollup-plugin-terser 插件

export default defineConfig({
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'], // 指定需要删除的不必要函数，例如这里删除了所有的 console.
      },
    },
    rollupOptions: {
      plugins: [
        terser(), // 使用 rollup-plugin-terser 插件
      ],
    },
  },
});
```