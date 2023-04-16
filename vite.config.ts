import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import { terser } from 'rollup-plugin-terser'; // 导入 rollup-plugin-terser 插件
// import createTailwindPlugin from 'vite-plugin-tailwind';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // root: process.cwd(),
  // 配置 Public 目录
  // publicDir: 'public',
  // publicDir: resolve('static'),//静态资源文件夹
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')//配置@别名
    }
  },
  css: {
    modules: {
      // scopeBehaviour: 'global' | 'local',
      localsConvention: 'camelCaseOnly', // 使用 camelCase 命名 CSS 类名
    },
    postcss: './postcss.config.cjs', // 内联的 PostCSS 配置 如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源
    preprocessorOptions: { // css的预处理器选项
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  // 打包输出目录
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'], // 指定需要删除的不必要函数，例如这里删除了所有的 console.
      },
    },
    minify: "terser", // 必须开启：使用terserOptions才有效果
    //打包文件按照类型分文件夹显示
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
    //  库的打包
    // lib: {
    //   entry: 'src/main.tsx', // 库的入口文件
    //   name: 'mobile', // 库名称
    //   fileName: 'myMobile', // 输出文件名
    // },
    // rollupOptions: {
    //   plugins: [
    //     terser(), // 使用 rollup-plugin-terser 插件
    //   ],
    //   // 处理输出的打包文件
    //   output: {
    //     globals: {
    //       react: 'React',
    //       'react-dom': 'ReactDOM',
    //     },
    //   },
    // },

  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // 只打包入口文件所需的依赖项
  },
  json: {
    namedExports: true, // 是否支持从.json文件中进行按名导入
    stringify: false, //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
  },
  // 代理配置
  server: {
    //使用IP能访问
    host: "0.0.0.0",
    // 热更新
    hmr: true,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    // 服务端口
    port: 8080,
    open: true,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api/, ''),
      // },
    },
  },
  // ssr: {
  //   external: [], // 列出的是要为 SSR 强制外部化的依赖,
  //   noExternal: '', // 列出的是防止被 SSR 外部化依赖项
  //   target: 'node', // SSR 服务器的构建目标
  // }
})
