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

基本使用方式:

1. 从 react-router-dom 中导入 Link，Route 组件，以及想使用的路由作为 Router
2. 路由跳转需要被 Router 标签包裹
3. Link 标签指定属性 to 的值来确定显示哪一个 Route 标签
4. Route 标签的属性 path 值用来和 to 标签的值进行匹配
5. 默认是模糊匹配，即按照 Link 上 to='/'的路径可以匹配到 Route 上 path='/\*(任意值)'，需要精准匹配必须给 Route 标签加上 exact

```jsx
// 试试BrowserRouter，hashRouter路径显示的差异
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Route path="/" exact component={HomePage} />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </div>
  );
}
```

## Route 渲染路由的三种方式

1. component 上面的示例已经演示了使用 component 属性渲染组件的效果
2. children: func
3. render: func
4. 三种渲染方式互斥，优先级 children>component>render
5. 三种方式在 props 都可以收到 history，location，match
6. 这三种方式主要区别是在于使用 component 的时候每次指定的组件和 React.createElement 会创建一个**新的组件**，使用内联函数的时候`<Route path='/' component={()=>(<HomePage />)}>`会导致频繁的组件卸载和挂载，严重影响性能

## 404 页面

Route 不写 path 值默认就可以匹配上，可以将一组 Route 组件用 Switch 包裹，这样就只会匹配到一个就停止匹配

```jsx
<Switch>
  <Route path="/" exact component={HomePage} />
  <Route path="/user" component={UserPage} />
  <Route path="/login" component={LoginPage} />
  <Route component={_404Page} />
</Switch>
```
