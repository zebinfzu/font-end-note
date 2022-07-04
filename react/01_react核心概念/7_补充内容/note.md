# 补充内容

## 事件总线

context 相关 API 主要是用于跨代组件的数据通信，而跨组件之间的事件传递可以使用观察者模式(事件总线)来完成，react 常用的第三方事件总线库 events

常用 API：

- 创建 EventEmitter 对象：eventBus 对象
- 发出事件：eventBus.emit("事件名称", 参数列表)
- 监听事件：eventBus.addListener("事件名称", 监听函数)
- 移除事件：eventBus.removeListener("事件名称", 监听函数)

## Portal

特定情况希望渲染内容独立于父组件，甚至独立于当前挂载到的 DOM 元素中。这种状况使用 Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案：

- 以 ReactDOM.createPortal(child, container)作为 render 函数的返回值或者是函数组件的返回值
  - 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment
  - 第二个参数（container）是一个 DOM 元素

常见的场景比如点击一个按钮，弹出一个模态框，这个模态框希望出现在整个页面的正中，就可以使用 Portal 渲染到 body 的末尾

## fragment

由于 jsx 只能有一个根标签，因此组件中总是返回一个 div 元素，如果不希望渲染 div，则可以使用 fragment，jsx 还提供了 fragment 的短语法`<></>`，如果要添加 key 则不能使用短语法

## StrictMode

1. 在 JSX 中使用标签 React.StrictMode 本身不会渲染出可见 UI，但包裹的元素以及其后代都会被进行检查
2. 检查的内容
   1. 识别不安全的生命周期
   2. 使用过时的 refAPI
   3. 使用废弃的 findDOMNode 方法
   4. 检查意外的副作用
   5. 检测过时的 context API
