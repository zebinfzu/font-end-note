# react-router

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

## 安装 react-router

```
yarn add react-router-dom@5
```

## 使用 react-router

react-router 最主要的 API 是给我们提供的一些组件

- BrowserRouter 或 HashRouter
  - Router 中包含了对路径改变的监听，并且会将相应的路径传递给子组件
  - BrowserRouter 使用 history 模式
  - HashRouter 使用 hash 模式
- Link 和 NavLink
  - 通常路径的跳转是使用 Link 组件，最终会被渲染成 a 元素
  - NavLink 是在 Link 基础之上增加了一些样式属性
  - to 属性：Link 中最重要的属性，用于设置跳转到的路径
- Route
  - 用于路径的匹配
  - path 属性：用于设置匹配到的路径
  - component 属性：设置匹配到路径后，渲染的组件
  - exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件
