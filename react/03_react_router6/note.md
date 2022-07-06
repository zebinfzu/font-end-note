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

## react-router-6

项目初始化

```bash
npx create-react-app router6-nut && cd router6-nut
yarn add react-router-dom@6
yarn start
```

### react-router 简介

react-router 包含 3 个库：

1. react-router
   1. 提供最基本的路由功能
   2. 实际使用的时候根据是浏览器(安装 react-router-dom)或者 rn 开发(react-router-native)
2. react-router-dom
3. react-router-native

### BrowserRouter 与 HashRouter 对比

1. HashRouter 最简单，不需要服务器端渲染，靠浏览器的#的来区分 path 就可以，BrowserRouter 需要服务器端对不同的 URL 返回不同的 HTML，后端配置可[参考](https://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html)。
2. BrowserRouter 使用 HTML5 history API（ pushState，replaceState 和 popstate 事件），让页面的 UI 同步与 URL。
3. HashRouter 不支持 location.key 和 location.state，动态路由跳转需要通过?传递参数。
4. Hash history 不需要服务器任何配置就可以运行，如果你刚刚入门，那就使用它吧。但是我们不推荐在实际线上环境中用到它，因为每一个 web 应用都应该渴望使用 `browserHistory`。

### 路由

路由决定 React 渲染什么页面，以及如何嵌套。React Router 提供两种方式声明路由：

- Routes（类似 v5 里面的 Switch） 和 Route，用 JSX
- useRoutes(自定义 Hook)，用基于 js 对象的配置方式

还有一些内部使用的 API：

- matchPath - 返回一个基于 URL 匹配 path 的对象
- matchRoutes - 基于 location 返回一个路由集合
- createRoutesFromChildren - 创建一个 React 元素集合的路由配置

### 路由跳转

- Link 和 NavLink 元素渲染一个 a 元素
- useNavigate 和 Navigate 跳转导航，通常用在事件中，或者响应状态变化
  - useNavigate()返回一个方法，返回的方法用于导向之前 URL 地址

其他可以使用的一些 API：

- useResolvedPath - 基于现在的 location 返回一个相对路径
- useHref - 返回作为 `<a href>`的相对路径
- useLocation 和 useNavigationType - 当前的 location
- useLinkClickHandler - 当你在 react-router-dom 中，创建一个自定义 `<Link>` 的时候，useLinkClickHandler 返回一个导航事件
- useLinkPressHandler - 当你在 react-router-native 中，创建一个自定义 `<Link>` 的时候，useLinkClickHandler 返回一个导航事件
- resolvePath - 基于给定的 URL，返回一个相对路径

### 基本使用

```jsx
export default function App(props) {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout(props) {
  return (
    <div className="border">
      <Link to="/">首页</Link>
      <Link to="/product">商品</Link>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
function Product() {
  return (
    <div>
      <h1>Product</h1>
    </div>
  );
}
```

**Routes**和**Route**

1. 是 React Router 基于当前的 location 渲染页面的主要方法
2. 当 location 变化的时候，Routes 将会遍历它所有子 Route
3. Route 通过 path 来匹配，如果 path 匹配当前的 URL，则渲染它的 element，否则不渲染。`<Route caseSensitive>`判断大小写是否敏感，默认是 false
4. `<Route>`可能是**嵌套的**，嵌套路由也对应 URL。默认情况 Route 只会渲染 element，不会渲染里面的子路由，父路由通过父路由的 element 中使用`<Outlet>`来渲染子路由

**Outlet**： `<Outlet>`用在父路由中，这样在渲染子路由的时候，内部嵌套的 UI 也会被渲染。如果父路由是精确匹配， `<Outlet>`则会渲染一个标记 index 的子路由，如果没有 index 的子路由，那就什么都不渲染

**404**:
path 设置成\*(与 router4 以及 router5 不同)

### 嵌套路由和动态路由

嵌套路由

```jsx
// Route里面嵌套Route
function Father() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Child />}>
          {/*嵌套子路由，默认不显示，显示需要在父路由的element中使用Outlet*/}
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Child() {
  return (
    <>
      <h2>Child</h2>
      <Outlet />
    </>
  );
}
```

动态路由

```jsx
// 动态路由，使用:属性名获取
function Father() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Child />}>
          {/*嵌套子路由，默认不显示，显示需要在父路由的element中使用Outlet*/}
          <Route path="product" element={<Product />} />
            {/* 动态路由 */}
            <Route path=":id" element={<ProductDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

function Child() {
  return (
    <>
      <h2>Child</h2>
      <Outlet />
    </>
  );
}
```
