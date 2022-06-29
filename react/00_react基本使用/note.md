# react 基本概念

## react 是什么以及为什么使用 react

> react 官网的描述: A Javascript library building user interfaces
> 用于构**建用户界面**的 Javascript 库

目前前端项目构建依赖的三大技术：

1. **HTML** 构建网页的结构(相当于人的骨骼)
2. **CSS** 构建网页的样式(相当于人的衣服)
3. **JS** 页面动态内容以及交互(相当于人的动作)

如果我们不使用 react 或者 vue 这样的框架，同样可以构建网页，但会面临以下问题：

1. 原始 DOM 操作繁杂，API 非常不好记而且大量的原始 DOM 操作性能低下
2. 过多的兼容性代码
3. 代码组织和规范问题

使用 react 的好处：

1. **声明式编程**，提供优秀的状态管理功能
2. react 认为界面 UI 和内部逻辑本身有很**强耦合性**
3. **优化 DOM 操作**，API 更加简单而且对于大部分 DOM 操作多的部分场景来说虚拟 DOM 性能比原生使用 DOM API 更好
4. **组件化**开发更加优化代码结构

> react 选择了 jsx（js 的语法扩展），实现了巧妙的将 html 和 js 融合在一起编写，符合其内在耦合性

## 安装使用 react

react 主要有三种使用的方式

1. 通过 cdn 引入:(这种方式要记得跨域处理)，核心的三个库
   1. react：react 核心，创建 react 元素
   2. react-dom：react 操作 dom，将虚拟 DOM 映射到网页或者安卓原生(react-native)
   3. babel：转义(babel 可以做转义，把 JSX 翻译成浏览器看的懂的原生 JS)
2. 直接下载使用
3. **通过 npm 管理**
   1. 自己使用 webpack 配置
   2. 使用 create-react-app 创建 react 的项目
   3. **使用 vite**之类的新脚手架比 create-react-app 更加快速搭建项目
