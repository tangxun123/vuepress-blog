# Vite 打包优化配置都有哪些

Vite 作为一个现代化的构建工具，在打包优化方面已经内置了很多优化策略，同时也提供了一些自定义配置项供我们使用。下面是一些常用的 Vite 打包优化配置：

## build.rollupOptions：
rollup 打包相关的配置项。可以通过该选项来修改 rollup 打包的配置，例如通过配置 terser 来压缩代码、通过 brotliSize 配置项开启 Brotli 压缩等。

```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash-es']
        }
      }
    }
  }
};
```

## build.commonjsOptions：
将 CommonJS 模块转换为 ES6 模块的配置项。可以通过该选项来优化 CommonJS 模块的加载方式，以提升打包速度和代码质量。

```js
// vite.config.js
export default {
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
};
```

## build.assetsInlineLimit：
文件内联的大小限制。可以通过该选项来控制文件内联的大小，以提升加载速度。

```js
// vite.config.js
export default {
  build: {
    assetsInlineLimit: 4096
  }
};
```

## build.minify：
代码压缩的配置项。可以通过该选项来配置代码压缩的方式和级别，以达到更小的文件体积和更快的加载速度。

```js
// vite.config.js
export default {
  build: {
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
};
```
## build.splitChunks：
代码分割的配置项。可以通过该选项来控制代码分割的方式和级别，以减小文件体积和提升加载速度。

```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  }
};
```

## build.cssCodeSplit：
CSS 代码分割的配置项。可以通过该选项来控制 CSS 代码分割的方式和级别，以减小文件体积和提升加载速度。

```js
// vite.config.js
export default {
  build: {
    cssCodeSplit: true
  }
};
```

## build.target：
目标浏览器的配置项。可以通过该选项来控制目标浏览器，以使打包后的代码更加兼容。

```js
// vite.config.js
export default {
  build: {
    target: 'es2015'
  }
};
```

```js
build.minify.minifyJS：是否对 JavaScript 代码进行压缩。默认为 true。
build.minify.minifyCSS：是否对 CSS 代码进行压缩。默认为 true。
build.minify.minifyHTML：是否对 HTML 代码进行压缩。默认为 true。
build.minify.minifyJSON：是否对 JSON 代码进行压缩。默认为 true。
build.minify.removeComments：是否移除代码中的注释。默认为 true。
build.minify.removeEmptyAttributes：是否移除标签中的空属性。默认为 true。
build.minify.removeEmptyElements：是否移除代码中的空元素。默认为 true。
build.minify.removeRedundantAttributes：是否移除标签中的冗余属性。默认为 true。
build.minify.removeScriptTypeAttributes：是否移除 script 标签中的 type 属性。默认为 true。
build.minify.removeStyleLinkTypeAttributes：是否移除 style 和 link 标签中的 type 属性。默认为 true。
build.rollupOptions.input：指定打包的入口文件。可以通过该选项指定打包的入口文件，默认为 src/main.js。
build.rollupOptions.output.format：指定打包输出的格式。可以通过该选项指定打包输出的格式，默认为 es。
build.rollupOptions.output.entryFileNames：指定打包输出的入口文件名。可以通过该选项指定打包输出的入口文件名，默认为 [name].js。
build.rollupOptions.output.chunkFileNames：指定打包输出的代码块文件名。可以通过该选项指定打包输出的代码块文件名，默认为 [name]-[hash].js。
build.rollupOptions.output.assetFileNames：指定打包输出的资源文件名。可以通过该选项指定打包输出的资源文件名，默认为 [name]-[hash][extname]。
build.commonjsOptions.sourceMap：是否生成 CommonJS 代码的 Source Map。默认为 false。
build.commonjsOptions.include：指定需要打包的模块路径。可以通过该选项指定需要打包的模块路径，默认为 node_modules/**。
build.commonjsOptions.exclude：指定不需要打包的模块路径。可以通过该选项指定不需要打包的模块路径，默认为空。
build.cssCodeSplit.minSize：指定 CSS 代码拆分的最小大小。可以通过该选项指定 CSS 代码拆分的最小大小，默认为 2000。
build.cssCodeSplit.maxSize：指定 CSS 代码拆分的最大大小。可以通过该选项指定 CSS 代码拆分的最大大小，默认为 200000。
build.cssCodeSplit：是否启用 CSS 代码拆分。默认为 true。开启 CSS 代码拆分可以让每个页面只加载所需的 CSS，从而减少加载时间和网络带宽的占用。
build.manifest：是否生成构建 manifest 文件。构建 manifest 文件可以记录构建过程中每个模块的 ID、资源路径、依赖关系等信息，便于后续调试和分析。
build.minify：是否启用代码压缩。默认为 true。
build.polyfillDynamicImport：是否在打包时自动添加动态导入的 polyfill。默认为 true。
build.report：是否生成构建报告。构建报告可以提供打包过程中各个模块的大小、依赖关系等信息，便于优化打包结果。
build.target：打包目标平台。可以通过该选项指定打包的目标平台，例如 es2015、es2017 等。根据目标平台的不同，Vite 会自动进行代码转换以兼容不同的浏览器或 Node.js 版本。
build.workerLoader：Worker 模块的加载器。可以通过该选项指定 Worker 模块的加载器，例如默认的 default、worker-loader 等。
build.watch：是否启用文件监听。默认为 true。开启文件监听可以让 Vite 在开发过程中自动检测文件变化并重新编译，从而提高开发效率。
build.write：是否生成构建输出文件。默认为 true。可以通过该选项禁止生成构建输出文件，仅进行构建分析等操作。
```

## webpack 的 webpack-bundle-analyzer 这个插件，在 vite 里面有差不多的插件吗
是的，Vite 也有类似于 webpack-bundle-analyzer 的插件用于分析打包后的代码，它叫做 rollup-plugin-visualizer。

可以通过以下步骤在 Vite 项目中使用它：

1. 安装 rollup-plugin-visualizer：

```js
npm install rollup-plugin-visualizer --save-dev
```
2. 在 vite.config.js 中添加以下配置：

```js
import visualizer from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true, // 是否自动打开浏览器窗口以显示可视化报告
      gzipSize: true, // 是否包含 gzip 压缩后的大小
      brotliSize: true // 是否包含 Brotli 压缩后的大小
    })
  ]
};
```

3. 运行 npm run build，打包完成后，可视化报告将自动在浏览器中打开。

该插件提供了一个可视化界面，以便您可以更好地理解打包后的代码。界面中展示了打包后的模块大小，模块之间的依赖关系和模块内部的具体细节等信息。

## vite 打出.gzip 包怎么做
Vite 内置了对生成 gzip 包的支持，您可以通过以下步骤启用 gzip 压缩功能：

1. 确保您的服务器支持 gzip，如果您使用的是 Node.js 作为服务器，那么您不需要额外配置，Node.js 默认支持 gzip。

2. 在 vite.config.js 文件中添加 build.rollupOptions.output 配置，将 compress 设置为 true，示例如下：

```js
export default {
  build: {
    rollupOptions: {
      output: {
        // 开启 gzip 压缩
        compress: true
      }
    }
  }
};
```
此时，当您运行 npm run build 时，Vite 将会在打包过程中生成 gzip 压缩包。在浏览器请求静态资源时，服务器将会返回已压缩的文件，从而提升网页的加载速度和用户体验。

需要注意的是，启用 gzip 压缩功能可能会增加 CPU 负载和打包时间，因此建议在需要优化网络传输的情况下使用。