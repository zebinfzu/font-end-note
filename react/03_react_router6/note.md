# react-router

## 前端路由

路由的概念最早是在后端，通过前端请求不同的 URL 路径来返回不同的静态资源。现在的前端路由则通过 URL 路径改变不会触发请求的方式(哈希，history)不通过服务器解析，而是**前端监控路径的变化**决定渲染的内容。

优点：

1. 比起多页面(map)来说，不设计页面跳转，内容不需要重新加载，服务器压力小
2. 只涉及组件之间的切换，切换流畅，用户体验好
3. 页面切换的动画好
4. 组件化开发快捷

缺点：

1. 首屏加载过慢
2. 对 SEO 优化（可以通过 SSR 弥补一部分）
3. 页面复杂度提高很高

## 原生 js 实现前端路由

1. 监听页面加载完成的事件，通过哈希值来渲染
2. 监听页面的 hashchange 事件，更新页面显示的内容

## react-router-5

创建项目并启动：

```bash
npx create-react-app router-nut
cd router-nut
yarn start
```

安装 react-router：
依赖**react-router，react-router-dom**，react-router-native

```bash
yarn add react-router-dom
```

BrowserRouter 和 hashRouter 对比

1. hashRouter 最简单，不需要服务器渲染，靠浏览器的#来区分就可以，BrowserRouter 需要服务器端对不同的 URL 返回 HTML
2. BrowserRouter 使用 HTML5 的 history API，让页面内容同步 URL
3. HistoryRouter 不支持 location.key 和 location.state，动态路由需要通过?传参数
