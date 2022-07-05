# hooks

hooks 的用途：

1. 解决函数组件没有内部状态 state 的问题
2. 解决函数组件没有生命周期的问题
3. 相比 class 组件使用函数组件+hooks 更加省代码，复用状态更容易

hooks 函数是一类方法的总成，比如用来维护 state 的 hook 函数 useState

## useState

用来维护 state 的 hook 函数

1. useState 方法会定义一个 state，接受唯一的参数作为 state 的初始化值
2. useState 方法返回值是一个数组，数组[0]是 state，数组[1]是 state 的 setState 方法
3. 可以使用 es6 的数组解构语法快速获取返回值并命名

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={(e) => setCount(count + 1)}>+</button>
    </div>
  );
};
```

## useEffect

用来模拟生命周期的 hook 函数，类似于网络请求、手动更新 DOM、一些事件的监听，都是 React 更新 DOM 的一些副作用（Side Effects），因此称为 useEffect

1. 通过 useEffect 的 Hook，可以告诉 React 需要在渲染后执行某些操作
2. useEffect 要求传入一个回调函数，在 React 执行完更新 DOM 操作之后，就会回调这个函数
3. 默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个 回调函数
4. 相比生命周期的好处：生命周期函数把很多没有关联的操作耦合再一个函数里面，而 useEffect 则允许**多次使用**，单独处理不同的逻辑代码

清除 effect

5. 在 class 组件的编写过程中，某些副作用的代码，需要在 componentWillUnmount 中进行清除
   1. 比如事件总线或 Redux 中手动调用 subscribe
   2. 都需要在 componentWillUnmount 有对应的取消订阅
6. useEffect 传入的回调函数 A 本身可以有一个返回值，这个返回值是另外一个回调函数 B
   1. 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数
   2. 如此可以将添加和移除订阅的逻辑放在一起

effect 性能优化：

1. 默认情况下，useEffect 的回调函数会在每次渲染时都重新执行，这会导致：
   1. 某些代码只是希望执行一次，类似于**componentDidMount 和 componentWillUnmount**中完成的事情
   2. 多次执行也会导致一定的性能问题
2. 控制 useEffect 的执行方法
   1. useEffect 参数一，要执行的回调函数
   2. useEffect 参数二，该 useEffect 在哪些 state 发生变化时，才重新执行（受谁的影响）
      - 不希望依赖任何值的时候传入[]，那么参数一的回调函数就相当于 componentDidMount 而参数一回调的返回值就相当于 componentWillUnmount

## useContext

使用 context 的 hook 函数，在函数组件里面可以直接使用 useContext(context)来使用 context，这样使用多个不同的 context 也不需要使用 context.Consumer 嵌套了

## useReducer

这个 hook 函数是 useState 的替代品，在 state 的处理比较复杂的时候更好用

1. useReducer 接受两个参数，第一个 state 的初始化值，第二个 reduce 函数指定处理行为
2. useReducer 返回一个数组，数组[0]是 state，数组[1]是 dispatch 函数(类似于 setState)

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
const App = () => {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  return (
    <div>
      <h2>Profile当前计数: {state.counter}</h2>
      <button onClick={(e) => dispatch({ type: "increment" })}>+1</button>
      <button onClick={(e) => dispatch({ type: "decrement" })}>-1</button>
    </div>
  );
};
```

## useCallback
