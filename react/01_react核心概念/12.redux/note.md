# redux

## 纯函数

一个函数是纯函数的条件：

1. 此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或状态无关，也和由 I/O 设备产生的外部输出无关
2. 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等

> React 中就要求我们无论是函数还是 class 声明一个组件，这个组件都必须像纯函数一样，保护它们的 props 不被修改

> redux 中，reducer 也被要求是一个纯函数

## redux 的作用

redux 的作用是帮助管理 JS 开发中的状态，包括但不限制于：括服务器返回的数据、缓存数据、用户操作产生的数据等等，也包括一些 UI 的状态，比如某些元素是否被选中，是否显示加载动效，当前分页

这些数据如果都依赖 react 组件内部的 state 有的很难管理：

1. 状态之间相互会存在依赖，一个状态的变化会引起另一个状态的变化，View 页面也有可能会引起状态的变化
2. 当应用程序复杂时，state 在什么时候，因为什么原因而发生了变化，发生了怎么样的变化，会变得非常难以控制和追踪
3. Redux 就是一个帮助我们管理 State 的容器：Redux 是 JavaScript 的状态容器，提供了可预测的状态管理
4. Redux 除了和 React 一起使用之外，它也可以和其他界面库一起来使用（比如 Vue）

### redux 核心 API

1. 创建一个对象作为要保存的状态
2. 创建 Store 来存储 state
   1. 创建 Store 的时候必须创建 reducer
   2. 可以通过 store.getState 来获取当前的 state
3. 通过 action 来修改 state
   1. dispatch 来派发 action
   2. 通常 action 中都会有 type 属性，也可以携带其他的数据
4. 修改 reducer 中的处理代码，reducer 是一个纯函数，不需要直接修改 state
5. 派发 action 之前，监听 store 的变化

```js
// 初始化第一次的state
const initialState = {};
// reducer函数接收state和action，内部处理dispatch到action的时候应该怎么处理，返回值是新的state
const reducer = (state = initialState, action) => {};
// 1. 创建一个store
const store = redux.createStore(reducer); // createStore接受一个reducer函数
// 1.1 添加subscribe监听，传入的回调，这将会在dispatch之后被立即执行
store.subscribe(() => {
  console.log(store.getState());
});
// 2. 定义各种action
const action1 = { type: "" };
// 3. 通过dispatch触发action
store.dispatch(action1);
```

## redux 核心三大原则

1. 单一数据源
   1. 整个应用程序的 state 应该被存储在一个 object tree 当中，并且这个 Object tree 只能存储在一个 store 当中
   2. Redux 并没有强制不让创建多个 store，只是那样不好维护
   3. 单一数据源更适合维护，追踪和修改
2. State 是只读的
   1. 唯一修改 State 的方法只有触发 action
3. 通过纯函数来修改
   1. 通过 reducer 将旧的 state 和 action 联系起来，返回一个新的 state

### 通常 redux 的工程化文件管理

> 默认 node 不支持 es6 的 import 语法，需要在 package.json 中加入"type":"module"

目录结构:

1. index.js
   1. 订阅派发发生后的回调
   2. 派发 action
2. store 文件夹
   1. index.js 创建仓库
   2. reducer.js
   3. constants.js 维护所有的常量
   4. actionCreator.js 所有的 action 函数

## react 和 redux 使用

1. 手动创立联系

   ```jsx
   import store from './store';
   import {addAction} from './store/actionCreator';
   class App extends PureComponent {
      constructor() {
         this.state = {
            counter: this.getState().counter;
         }
      }
      componentDidMount() {
       this.unsubscribue = store.subscribe(() => {
         // 手动建立联系，设置state变化
         this.setState({
           counter: store.getState().counter,
         });
       });
     }
     componentWillUnmount() {
       this.unsubscribue();
     }
      render() {
         return (
            <div>
               <h2>{this.state.counter}</h2>
               <button onClick={e=>addCounter(5)}>+5</button>
            </div>
         )
      }
      addCounter(num) {
         store.dispatch(addAction(5));
      }
   }
   ```

2. 自定义 connect

   1. 添加工具函数(一般放在 utils 文件夹中)
   2. connect 函数将组件和 redux 的 state 结合到一起
   3. connect 需要两个参数 mapStateToProps, mapDispatchToProps
   4. connect 函数返回的是一个高阶组件

   ```jsx
   // connect函数
   export function connect(mapStateToProps, mapDispatchToProp) {
     // 返回一个高阶组件
     return function enhanceHOC(WrappedComponent) {
       class EnhanceComponent extends PureComponent {
         constructor(props, context) {
           super(props, context);

           this.state = {
             storeState: mapStateToProps(context.getState()),
           };
         }

         componentDidMount() {
           this.unsubscribe = this.context.subscribe(() => {
             this.setState({
               storeState: mapStateToProps(this.context.getState()),
             });
           });
         }

         componentWillUnmount() {
           this.unsubscribe();
         }

         render() {
           return (
             <WrappedComponent
               {...this.props}
               {...mapStateToProps(this.context.getState())}
               {...mapDispatchToProp(this.context.dispatch)}
             />
           );
         }
       }

       EnhanceComponent.contextType = StoreContext;

       return EnhanceComponent;
     };
   }

   // 组件当中使用就容易了
   function About(props) {
     return (
       <div>
         <hr />
         <h1>About</h1>
         <h2>当前计数: {props.counter}</h2>
         <button onClick={(e) => props.decrement()}>-1</button>
         <button onClick={(e) => props.subNumber(5)}>-5</button>
       </div>
     );
   }
   const mapStateToProps = (state) => {
     return {
       counter: state.counter,
     };
   };
   const mapDispatchToProps = (dispatch) => {
     return {
       decrement: function () {
         dispatch(decAction());
       },
       subNumber: function (num) {
         dispatch(subAction(num));
       },
     };
   };

   export default connect(mapStateToProps, mapDispatchToProps)(About);
   ```

3. 使用 redux 提供的 connect 函数
