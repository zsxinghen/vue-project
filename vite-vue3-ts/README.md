    # Vue 3 + Typescript + Vite

### 项目初始化

参考: [体验 vite + vue3 + ts 搭建项目的全过程](https://juejin.cn/post/6973288527802925092)

```js
npm init @vitejs/app  // npm

yarn create @vitejs/app name// yarn
```

### 配置 vscode

参考：[配置 VSCode 编辑器适配 VUE3 开发]（https://zhuanlan.zhihu.com/p/302523778）

- 语法高亮 Vetur
- 格式化代码 Prettier
- 检查代码规范 ESLint

  详见[.eslintrc.js](./.eslintrc.js)

  详见[.eslintignore](./.eslintignore)

- 接口测试工具 REST Client

  详见[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

- VueHelper
- TSLint
  详见[使用 tslint 和 prettier 规范代码](https://segmentfault.com/a/1190000022665349)
- Debugger for Chrome
- Regex Previewer

  详见[VSCODE 插件之 Regex Previewer 使用](https://blog.csdn.net/u012733501/article/details/107817524)

- filesize
- ...

### 项目配置

详见 [.prettierrc.js](./.prettierrc.js)

- 添加 browserslist

  指定项目的目标浏览器的范围:[browserslist](https://github.com/browserslist/browserslist)

- 添加 gitHooks

  1.详见 [一文带你彻底学会 Git Hooks 配置](https://zhuanlan.zhihu.com/p/149294652) 2.详见 [GitHook 工具 —— husky 介绍及使用](https://www.cnblogs.com/jiaoshou/p/12222665.html)

  ```js
  // 当执行git commit时，pre-commit钩子执行lint-staged脚本, 可以用用于检查代码规范
  // 可使用git commit --no-verify -m 跳过检查代码规范
  "gitHooks": {
      "pre-commit": "lint-staged"
  },
  "lint-staged": {
      "*.{js,jsx,vue,ts,tsx}": [
      "vue-cli-service lint",
      "git add"
      ]
  }
  ```

- 配置 TypeScript

  ```js
  // 加入ts依赖
  yarn add --dev typescript

  // 配置 tsconfig.json
  ```

- 配置 vue-router

  1.详见[vue-router](./src/router/index.ts)

  2.详见[router-view ](./src/app.vue)

  ```js
  // 加入vue-router依赖
  yarn add i vue-router@4
  ```

- 配置 vuex

  1.详见[vuex](./src/store/index.ts)

  ```js
  // 加入vuex依赖
  yarn add vuex@next
  ```

* 配置 axios

  1.详见[axios](./src/utils/axios/index.ts)

  ```js
  // 加入axios依赖
  yarn add axios
  ```

- 添加 eslint

  ```js

  // 加入依赖
  yarn add --dev eslint eslint-plugin-vue
  ```

* 添加 Postcss

  1.详见[poctcss](./postcss.config.js)

  2.详见[如果你不会 Postcss，那么你就真的不会 Postcss](https://zhuanlan.zhihu.com/p/269051473)

  ```js
  // 加入依赖
  yarn add postcss postcss-loader
  yarn add autoprefixer
  ```

- 添加 jest

  ```js
  // 加入依赖
  yarn add --dev @types/jest
  // 创建jest.config.js

  ```

### 业务模块目录

- Api 接口

  ```js
  --业务模块名称
  --index.ts
  --interface.ts
  ```

- View 功能模块
  ```js
  业务模块名称
  --constant
  --interface.ts
  --config.ts
  --components
  --组件A
  --index.vue
  --index.less
  --组件B
  --index.vue
  --index.less
  --index.vue
  --index.less
  ```
