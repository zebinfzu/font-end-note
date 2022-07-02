# reactDOM

React.createElement 创造出来是 ReactElement 对象：

1. react 用 ReactElement 对象组成一颗 JavaScript 的对象树
2. 这颗树就是虚拟 DOM(Virtual DOM)
3. 原生 DOM 通过 document.createElement 创建出来的对象极其复杂，频繁操作非常损耗性能
4. 而 react 使用虚拟 DOM 每次更新新的虚拟 DOM 树之后会和之前的树做 diff，只有真正变化的节点才会去更新真实 DOM，大部分场景下性能更优

即 react 的渲染流程为：JSX->虚拟 DOM->真实 DOM

## react 更新机制

react 的更新流程：props/state 变化 -> render 函数重新执行返回新的 ReactElement 对象 -> 新的虚拟 DOM 树和老的虚拟 DOM 树进行 diff -> 计算出差异 -> 更新到真实的 DOM

- React 在 props 或 state 发生改变时，会调用 React 的 render 方法，会创建一颗不同的树
- React 需要基于这两颗不同的树之间的差别来判断如何有效的更新 U
  - 如果一棵树参考另外一棵树进行完全比较更新，那么即使是最先进的算法，该算法的复杂程度为 **O(n ^ 3 )**，其中 n 是树中元素的数量
  - 如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围
- 因此 React 使用了简化版的算法，事件复杂度**O(n)**
  - 同层节点之间相互比较，不会垮节点比较
  - 不同类型的节点，产生不同的树结构
  - 开发中，可以通过 key 来指定哪些节点在不同的渲染下保持稳定

reactDOM 更新对比的处理

1. 节点为不同元素，React 会卸载原有的树，建立新的树
2. 两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性
3. 在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation

## render 函数的调用

```jsx
class Main extends React.Component {
  render() {
    console.log("Main组件render函数被调用");
    return <div>main</div>;
  }
}
class Header extends React.Component {
  render() {
    console.log("Header组件render函数被调用");
    return <div>Header</div>;
  }
}
class Footer extends React.Component {
  render() {
    console.log("Footer组件render函数被调用");
    return <div>Footer</div>;
  }
}
class App extends React.Component {
  construct(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  render() {
    console.log("App组件render函数被调用");
    return (
      <div>
        <Header />
        <Main />
        <button onClick={(e) => this.increment()}>+</button>
        <span>this.state.counter</span>
        <Footer />
      </div>
    );
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
}
```

在上面的示例代码中，明明只有 App 依赖的 this.state.counter 变化了，但是发现 App 中包含的其他组件也重新渲染了，子组件的 render 函数都重新 render 了

- 如果只要是修改父组件的数据，子组件就全部需要重新 render，对性能的损耗就太大了
  - 实际上很多子组件就不应该重新渲染
  - 调用 render 应该有一个前提，就是依赖的数据（state、props）发生改变时，再调用自己的 render 方法
- 使用 **shouldComponentUpdate** 方法可以控制 render 函数如何被调用
  - 参数一：nextProps 修改之后，最新的 props 属
  - 参数二：nextState 修改之后，最新的 state 属性
  - 返回值：布尔值，true 表示应该更新，false 表示不需要更新
- 如果所有类都手动实现 shouldComponentUpdate 方法太繁琐了，可以让类继承自**PureComponent**自动实现只有页面中依赖的 state 和 props 变化时才会调用 render 的功能
- 对于函数组件可以将组件传给高阶函数**memo**，会返回一个 Pure 化的函数组件

## ref

React 当中一般不需要获取 或直接操作原生 DOM，但当有些场景任然需要使用和操作原生 DOM 的时候，React 提供了 refs，常见与以下场景：

1. 管理焦点、文本选择或者媒体播放
2. 强制触发动画
3. 集成制作第三方 DOM 库

创建 refs 来获取对应 DOM 的方式：

1. 传入字符串，使用时通过 this.refs.传入的字符串格式获取对应的元素
2. 传入一个对象
   - 对象通过 React.createRef()来创建
   - 使用时获取到创建的对象其中有一个 current 属性就是对应的元素
3. 传入一个函数
   - 该函数会在 DOM 被挂载时进行回调，这个函数会传入一个 元素对象
   - 使用时，直接拿到之前保存的元素对象即可

添加 ref 的方式：在要使用 ref 的元素上添加属性 ref 并赋值，赋值类型可以是字符串、对象或者回调函数

在内存中拿到 ref 的方式：

1. ref="str", 在内存中使用 this.refs.str
2. ref={this.refObj} 在内存中使用 this.refObj.current
3. ref={arg => this.refCallback = arg} 在内存中使用 this.refCallback

ref 的类型：

1. 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性
2. 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性
3. **不能在函数组件上使用 ref 属性**，因为他们没有实例
