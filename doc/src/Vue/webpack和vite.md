# webpack 和 vite 打包配置及打包优化

## webpack 打包配置
1. Loader 和 Plugin
  
   `Loader` 让webpack处理各种类型的文件， `Plugin` 通过监听webpack构建过程中的事件 来执行自定义任务。
   ![Loader 和 Plugin](/assets/loader-plugin.png)
   ![Loader 详解](/assets/loader.png)
   ![Plugin 详解](/assets/plugin.png)

2. 打包优化
  - 2.1 提升构建速度
  
2.1.1 `缩小Loader处理范围`：使用 `include` 精准指定需要处理的目录，用 `exclude` 排除 node_modules 等无需处理的目录
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'), // 只处理src目录
      exclude: /node_modules/, // 排除node_modules
      use: ['babel-loader?cacheDirectory'] // 开启babel缓存[citation:10]
    }]
  }
};
```
2.1.2 `优化模块解析路径`：通过 `resolve` 配置减少Webpack的搜索层级
```js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')], // 明确第三方模块位置[citation:10]
    alias: { '@': path.resolve(__dirname, 'src') }, // 设置路径别名[citation:10]
    extensions: ['.js', '.json'] // 按需配置后缀，减少尝试[citation:10]
  }
};
```
2.1.3 使用缓存与多进程
 - 缓存：在性能开销大的`Loader（如 babel-loader）`前添加 `cache-loader`。
 - 多进程：在 `TerserPlugin` 中设置 `parallel: true` 来启用多线程压缩。
 - 并行检查：对于`TypeScript`项目，使用 `fork-ts-checker-webpack-plugin` 在独立进程中进行类型检查，不阻塞打包流程
```js
// 缓存
module.exports = {
    module: {
        rules: [
            {
                test: /\.ext$/,
                use: ['cache-loader', ...loaders],
                include: path.resolve('src'),
            },
        ],
    },
};
// 多进程
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
// 并行检查
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
  plugins: [
    new ForkTsCheckerWebpackPlugin({
    // 配置项...
    })
  ]
};
```

  - 2.2 优化输出
   ![优化输出](/assets/output.png)

## vite 打包配置
1. Vite的打包，其核心是`开发环境基于浏览器原生ESM的按需编译`，而`生产环境则使用高性能的打包器进行构建`

```js
// vite.config.js/ts 中通过 build 选项进行配置
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    // 输出目录
    outDir: 'dist',
    // 生成静态资源的存放目录
    assetsDir: 'assets',
    // 启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    // 构建后是否生成 source map
    sourcemap: false,
    // 自定义底层的 Rollup/Rolldown 打包配置
    rollupOptions: {
      // 入口文件，默认为根目录下 index.html
      input: {
        main: 'index.html',
      },
      output: {
        // 用于代码分割的手动分包策略（关键优化）
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 将第三方依赖拆分成独立的 'vendor' 块
            return 'vendor';
          }
        },
        // 输出文件命名（利用浏览器缓存）
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // 压缩选项
    minify: 'terser', // 或 'esbuild'
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除 console
        drop_debugger: true, // 生产环境删除 debugger
      },
    },
  },
});
```


2. 打包优化
- 代码分割与分包
   - 2.1  基础分包：将第三方依赖与业务代码分离
```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // 将 node_modules 中的依赖打包成 vendor 块
          }
        }
      }
    }
  }
};
```
  - 2.2 高级分包：进一步拆分大型库和公共模块
```js
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('echarts')) return 'echarts'; // 巨型库单独打包
    if (id.includes('lodash')) return 'lodash';
    if (id.includes('react')) return 'react-vendor'; // 框架核心打包在一起
    return 'vendor'; // 其余依赖
  }
  // 将项目公共工具、组件单独打包
  if (id.includes('src/utils/') || id.includes('src/components/')) {
    return 'common';
  }
}
```
  - 减少体积与加速构建
  - 2.3 关闭 Source Map：生产环境可关闭，能显著减少产物体积（10%-30%）并加快构建速度
```js
build: {
  sourcemap: false,
}
```
  - 2.4  清理调试代码：构建时自动移除 console、debugger 等。
```js
build: {
  minify: 'terser', // 或 'esbuild'
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true
    }
  }
}
```
  - 2.5 优化压缩器：Vite 默认用 esbuild 压缩（速度极快）。若追求极致压缩率可换用 terser，但构建会变慢
  - 2.6 图片压缩：使用 `vite-plugin-imagemin` 等插件自动压缩图片
  - 2.7 产物压缩：使用 `vite-plugin-compression` 生成 .gz 或 .br 文件，需服务器配合支持
  
