# Vite 全面入门指南

## 什么是 Vite？

Vite（法语意为"快速"，发音为 /vit/）是一个现代化的前端构建工具，由 Vue.js 的作者尤雨溪开发。它提供了极快的开发服务器启动和热模块替换（HMR），以及高效的构建能力。

## 为什么选择 Vite？

1. **极速启动**：利用浏览器原生 ES 模块（ESM）和 esbuild 的超快编译
2. **闪电般的热更新**：无论应用大小，HMR 都能保持快速
3. **丰富的功能**：支持 TypeScript、JSX、CSS 预处理器等
4. **优化的构建**：使用 Rollup 进行生产构建，支持代码分割
5. **通用插件**：兼容 Rollup 插件生态系统
6. **完全类型化的 API**：提供良好的 TypeScript 支持

## 安装 Vite

### 创建新项目

使用 npm：
```bash
npm create vite@latest
```

使用 yarn：
```bash
yarn create vite
```

使用 pnpm：
```bash
pnpm create vite
```

按照提示选择项目名称、框架（Vue、React、Svelte 等）和变体（TypeScript/JavaScript）。

### 已有项目添加 Vite

```bash
npm install vite --save-dev
# 或
yarn add vite --dev
# 或
pnpm add vite --save-dev
```

## 项目结构

典型的 Vite 项目结构：

```
my-vite-project/
├── node_modules/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue (或 .jsx/.tsx)
│   └── main.js (或 .ts)
├── index.html
├── package.json
├── vite.config.js
└── tsconfig.json (如果使用 TypeScript)
```

## 基本配置

### vite.config.js

```javascript
import {defineConfig} from 'src/vite/vite入门指南'
import vue from '@vitejs/plugin-vue' // 如果使用 Vue

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true
    }
})
```

### 常用配置选项

- **root**: 项目根目录
- **base**: 公共基础路径
- **mode**: 开发/生产模式
- **plugins**: 使用的插件数组
- **server**: 开发服务器选项
- **build**: 构建选项
- **resolve**: 解析选项
- **css**: CSS 相关选项
- **json**: JSON 相关选项
- **esbuild**: esbuild 转换选项
- **optimizeDeps**: 依赖优化选项

## 开发服务器

启动开发服务器：
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 服务器配置示例

```javascript
server: {
  port: 3000,
  open: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```

## 生产构建

构建生产版本：
```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 构建配置示例

```javascript
build: {
  outDir: 'dist',
  assetsDir: 'assets',
  assetsInlineLimit: 4096,
  cssCodeSplit: true,
  sourcemap: false,
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'vue-router']
      }
    }
  }
}
```

## 环境变量

Vite 使用 `.env` 文件来加载环境变量：

- `.env`: 所有情况下都会加载
- `.env.local`: 本地覆盖，不提交到版本控制
- `.env.[mode]`: 只在指定模式下加载
- `.env.[mode].local`: 指定模式的本地覆盖

变量必须以 `VITE_` 开头才能在客户端访问：

```env
VITE_API_URL=https://api.example.com
```

在代码中使用：

```javascript
console.log(import.meta.env.VITE_API_URL)
```

## 插件系统

Vite 可以使用 Rollup 插件和 Vite 特有插件。常用插件：

- **@vitejs/plugin-vue**: Vue 单文件组件支持
- **@vitejs/plugin-vue-jsx**: Vue JSX 支持
- **@vitejs/plugin-react**: React 支持
- **@vitejs/plugin-legacy**: 传统浏览器支持
- **vite-plugin-pwa**: PWA 支持
- **vite-plugin-svg-icons**: SVG 图标支持
- **vite-plugin-compression**: 压缩资源

### 插件使用示例

```javascript
import {defineConfig} from 'src/vite/vite入门指南'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
    plugins: [
        vue(),
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ]
})
```

## CSS 处理

Vite 内置支持 CSS、CSS Modules 和 PostCSS：

```javascript
css: {
  modules: {
    localsConvention: 'camelCaseOnly'
  },
  postcss: {
    plugins: [
      require('autoprefixer')
    ]
  },
  preprocessorOptions: {
    scss: {
      additionalData: `@import "./src/styles/variables.scss";`
    }
  }
}
```

## 静态资源处理

Vite 可以处理各种静态资源：

```javascript
// 导入图片
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl

// 导入 JSON
import json from './example.json'

// 导入 Worker
import Worker from './worker.js?worker'
const worker = new Worker()
```

## TypeScript 支持

Vite 天然支持 TypeScript，只需安装 `typescript` 和 `@types/node`：

```bash
npm install typescript @types/node --save-dev
```

配置 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "vite.config.ts"],
  "exclude": ["node_modules"]
}
```

## 性能优化

### 依赖预构建

Vite 会自动预构建依赖项（node_modules 中的 CommonJS/UMD 模块）以提高性能。

手动优化：

```javascript
optimizeDeps: {
  include: ['vue', 'vue-router', 'lodash-es'],
  exclude: ['vue-demi']
}
```

### 代码分割

使用 Rollup 的代码分割功能：

```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'vue-router', 'vuex'],
        utils: ['lodash-es', 'axios']
      }
    }
  }
}
```

## 部署

### 静态部署

构建后，`dist` 目录可以部署到任何静态文件服务器：

```bash
npm run build
```

### SPA 部署

对于单页应用，需要配置服务器将所有请求重定向到 `index.html`。

### SSR 部署

Vite 支持 SSR，但需要自定义服务器逻辑。

## 常见问题解决

1. **端口冲突**：修改 `vite.config.js` 中的 `server.port`
2. **依赖未预构建**：手动添加到 `optimizeDeps.include`
3. **路径别名问题**：配置 `resolve.alias`
4. **浏览器兼容性问题**：使用 `@vitejs/plugin-legacy`
5. **环境变量未加载**：确保变量以 `VITE_` 开头

## 进阶主题

1. **自定义插件开发**
2. **SSR 支持**
3. **库模式打包**
4. **测试集成**
5. **微前端架构**
6. **WebAssembly 支持**
7. **自定义中间件**

## 总结

Vite 作为新一代前端构建工具，凭借其极快的开发体验和高效的构建能力，已经成为现代前端开发的首选工具之一。通过本指南，你应该已经掌握了 Vite 的基本使用和核心概念，可以开始构建高效、现代化的前端应用了。

## 资源推荐

- https://vitejs.dev/
- https://github.com/vitejs/vite
- https://github.com/vitejs/awesome-vite#plugins
- https://chat.vitejs.dev/