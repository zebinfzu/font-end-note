# react-router-5

## 路由

通常路由是指通过不同的 URL 地址，后端返回不同的静态资源再由前端显示。

## 前端路由

spa(single-page application)，即整个 web 应用实际只有一个页面，URL 变化不会重新从浏览器请求新的静态资源，而是通过 JavaScript 监听 URL 的改变，并且根据 URL 的不同去渲染新的页面

1. 前端路由是如何做到 URL 和内容进行映射呢？
   - 通过监听 URL 的改变
2. URL 发生变化，同时不引起页面的刷新有两个办法：
   - 通过 URL 的 **hash** 改变 URL
   - 通过 HTML5 中的 history 模式修改 URL
3. 当监听到 URL 发生变化时，通过判断**当前的 URL**，决定**渲染什么内容**

URL 的 hash

- URL 的 hash 也就是锚点(#), 本质上是改变 window.location 的 href 属性
- 可以通过直接赋值 location.hash 来改变 href, 但是页面不发生刷新

HTML5 的 history，它有六种模式改变 URL 而不刷新页面：

1. replaceState：替换原来的路径
2. pushState：使用新的路径
3. popState：路径的回退
4. go：向前或向后改变路径
5. forward：向前改变路径
6. back：向后改变路径

## 安装 react-router-5

```
yarn add react-router-dom@5
```

## 使用 react-router-5

react-router 最主要的 API 是给我们提供的一些组件

- BrowserRouter 或 HashRouter
  - Router 中包含了对路径改变的监听，并且会将相应的路径传递给子组件
  - BrowserRouter 使用 history 模式
  - HashRouter 使用 hash 模式
- Link 和 NavLink
  - 通常路径的跳转是使用 Link 组件，最终会被渲染成 a 元素
  - NavLink 是在 Link 基础之上增加了一些样式属性
    - NavLink 主要是当元素选中的时候会加上 activeStyle 属性传入的样式
  - to 属性：Link 中最重要的属性，用于设置跳转到的路径
- Route
  - 用于路径的匹配
  - path 属性：用于设置匹配到的路径
  - component 属性：设置匹配到路径后，渲染的组件
  - exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件，默认是模糊匹配的
- Switch
  - 用来包裹 Route 组件
  - 只会再包裹的 Route 里面匹配一个，一旦匹配到就不会继续匹配
- Redirect
  - 用来做重定向组件
  - 一旦被渲染出来就会直接跳转到 to 属性的路径里面

```jsx
function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Route path="/"></Route>
      </BrowserRouter>
    </div>
  );
}
```

### 路由嵌套

```jsx
function APP() {
  return (
    <div>
      <NavLink exact to="/about">
        企业历史
      </NavLink>
      <NavLink exact to="/about/culture">
        企业文化
      </NavLink>
      <NavLink exact to="/about/contact">
        联系我们
      </NavLink>
      <Switch>
        <Route exact to="/about" component={AboutHistory} />
        <Route to="/about/culture" component={AboutCulture} />
        <Route to="/about/contact" component={AboutContact} />
      </Switch>
    </div>
  );
}
```

### 手动路由跳转

不使用 Link 和 NavLink

1. 监听到点击事件
2. 触发事件，通过 props 上面的 history,location,match 几个 API，手动设置跳转
3. 使用对应修改 API 修改路径
4. 注意只有通过路由渲染出来的组件才会有 history 属性
5. 非路由的组件要使用相关 API 可以使用 withRouter(component)包裹，且父组件必须用 Router 包裹子组件

```jsx
function App(props) {
  const jumpToJoin = ()=>{
    props.history.push("/join")
  }
  return (
    <div>
      <Router>
        <Button onClick={jumpToJoin()}>加入我们</Button>
        <Route path="/join" component={Join}>
      </Router>
    </div>
  );
}
export default withRouter(App)
```

### 动态路由

路径使用:即可让后面的值变成动态值，path 就可以显示:的配置，url 显示真实的路径，然后可以动态在要渲染的组件当中通过来渲染不同的内容

```jsx
function App() {
  const [id, setId] = useState("abc");
  return (
    <div>
      <Router>
        <NavLink to={`/detail/${id}`}>跳转</NavLink>
        <Route path="/detail/:id" component={Product} />
      </Router>
    </div>
  );
}
function Product(props) {
  console.log(props.match);
  //{ path:"/detail/:id", url:"/detail/abc" }
  return (
    <div>
      <h2></h2>
    </div>
  );
}
```

### 参数传递

to 属性传递参数

1. 路径使用:
2. 使用?,?后面的内容使用 location 对象可以拿到 search 的字符串
3. 直接传一个对象，这个对象一定要有 pathname 属性，哈希模式要有 hash 属性，在 Route 渲染的组件里面 location.state 就是这个对象

### React-Router 统一路由管理

使用额外的一个包

```
yarn add react-router-config
```

使用

```jsx
// router.js 配置好路由
// import 相关的所有的Component
const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/about",
    component: About,
    routes: [
      {
        path: "/about",
        exact: true,
        component: AboutHistory,
      },
    ],
  },
];
export default routes;

// 使用Route
// App.js
import { renderRouters } from "react-router-config";
function App() {
  return <div>{renderRouters(routes)}</div>;
}

// 嵌套路由需要在父路由里面把占位写好
// About.js
function About() {
  return <div>{renderRouters(routes[1].routes)}</div>;
}
```
