# 组件化开发

分治的思想：将复杂的问题化解为一个个小问题单独处理，前端的模块和组件化就是基于分治的思想。

组件化：

1. 一个页面的逻辑复杂处理起来困难，都写在一个文件里面也不好维护
2. 将页面拆成一个个**单独的模块**，不同的模块还可以再拆解成更小的组件
3. 这样如同把最小的组件当作单独的文件，整个项目就可以像拼积木一样搭起来
4. 这么做有利于代码的维护以及相似逻辑的复用，减少重复代码

## react 的组件化

组件化提供了一种抽象，可以开发出独立可复用的组件来构建我们的应用，任何应用都会被抽象成一颗组件树。

react 组件主要可以分为类组件(class component)和函数式组件(function component)

### 类组件

定义的要求：

1. 组件名以**大写**开头
2. 继承自 **React.Component**
3. 必须实现 render 函数
4. construct 函数内部说明的 this.state 用来**维护类组件内部状态**

**render 函数**调用将返回以下结果之一：

1. **React 元素**
   1. 通常使用 JSX 创建
   2. <div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件
   3. 无论是 div 还是 MyComponent 都是 React 元素
2. 数组或者 fragments：使得 render 函数可以返回多个元素
3. Portals：可以渲染子节点到不同的 DOM 子树中
4. 字符串或数值类型：它们在 DOM 中会被渲染为文本节点
5. 布尔值类型或者 null：什么都不会渲染

## 函数组件

定义要求：

1. 首字母必须大写
2. 返回值和类组件的 render 函数返回值相同
3. 没有生命周期、没有 this、没有内部状态，这些都需要使用 hooks 来模拟

## 生命周期函数

生物有生老病死，组件也有从内存中创建到页面上挂载，更新，卸载和从内存中删除的过程。而在指定在**不同的阶段会被执行**的函数就是生命周期函数。

注意，类组件才有生命周期函数，函数组件只能使用 hooks 模拟

常用的生命周期函数：

1. Construct 创建的时候调度
   1. 用来给 this.state 赋值初始化状态
   2. 为事件绑定 this
2. componentDidMount 组件挂载到 DOM 树中立即调用
   1. 依赖 DOM 的操作可以在这里执行
   2. 官方建议在这里进行**网络请求**的发送
   3. 添加一些订阅
3. componentDidUpdate 更新后立即被调用
   1. 当组件更新后，可以在这里对 DOM 做操作
   2. 对更新前后的 props 进行了比较，也可以选择在此处进行网络请求
4. componentWillUnmount 组件卸载及销毁之前直接调用
   1. 用来做必要的清理操作
   2. 取消订阅，清除 timer

## 组件间通信

1. **父传子使用 props**，父组件直接以类似 HTML 属性的方式写在子组件上面，子组件能够通过 construct 的参数 props 拿到
   ```jsx
   function Father() {
     return (
       <div>
         <Child name={"react"} age={18} />
       </div>
     );
   }
   function Child(props) {
     return (
       <div>
         <span>{props.name}</span>
         <span>{props.age}</span>
       </div>
     );
   }
   // 给组件设置默认的props
   Child.defaultProps = {
     name: "vue",
     age: 11,
   };
   ```
2. **子传父使用 props**，父组件将修改自身内部状态的操作封装成一个**回调函数**，把回调函数作为 Props 传给子组件，子组件就可以修改父组件的数据了
   ```jsx
   class Father extends React.Component {
    construct() {
      this.state = {
        counter: 0
      }
    }
    render() {
      return (
        <div>
          <Child increase={this.increase} />
          <div><counter: {counter}</div>
        </div>
      )
    }
    increase = ()=>{
      this.setState(
        counter: this.counter + 1
      )
    }
   }
   class Child extends React.Component {
    construct(props) {
      this.props = props
    }
    render() {
      return (
        <div onClick={this.props.increase}>+</div>
      )
    }
   }
   ```
3. **非父子组件使用 context**
   1. React.createContext 创建一个 共享的 context 对象
   2. context.Provider
   3. context.Consumer
4. 使用 redux 做数据管理，详细看 redux
