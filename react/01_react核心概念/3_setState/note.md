# setState

为什么要使用 setState 方法设置 state？

1. this.state 在类组件中维护的是组件的内部状态
2. state 的属性值变化了希望 react 能够知道并重新渲染页面
3. react 的 state 和 vue 不同，vue 对内部状态使用 Proxy API 做了代理和监听，存在双向绑定
4. 直接修改 this.state 的值内存中值变化了，但是 react**不知道**值变化了
5. 因此需要使用 setState 方法来**更新内部状态的值**
6. react 强调的是数据不可变，这里更应该把渲染到页面上的内容和内部状态理解为电影的一帧，新的内部状态是创造了一个新的帧，不代表使得原来的帧变化了
7. 该方法是从 Component 上继承下来的

## setState 更新机制

setState 改变 state 的值通常来说是异步的：

1. 设计成异步可以提高性能
   1. 如果每次调用 setState 都进行一次更新，那么意味着 render 函数会被频繁调用，界面重新渲染，这样效率是很低的
   2. 最好的办法应该是获取到多个更新，之后进行批量更新
2. 如果同步更新了 state，但是还没有执行 render 函数，那么 state 和 props 不能保持同步

如何获取异步的 setState 结果：

1. setState 的回调
   1. setState 可以接收第二个参数，该参数是一个回调函数，这个回调函数会在 state 更新之后被执行
   2. setState(partialState, callback)
2. 或者在生命周期函数 componentDidUpdate 中去查看 this.state 的值

setState 什么时候是异步的，什么时候是同步的？

1. 在组件生命周期函数或 React 合成事件中，setState 是异步的
2. 在原生 DOM 事件和 setTimeout 中是同步的

## setState 数据合并

示例代码

```js
this.state = {
  message: "hello",
  age: 19,
};
this.setState({
  message: "world",
});
```

上面示例代码通过 setState 去修改 message 的值，不会对 age 造成影响，源码中使用了 Object.assign 方法来对原有对象和新对象做合并，注意是将原来的 state 和新设置的对象往**一个空对象上合并**

```js
// 将老的state和新设置的对象合并到一个空对象，返回的是合并新对象
// 而不是将新设置的对象往原来的state上面合并
Object.assign({}, prevState, partialState);
```

因此多次合并的结果就和直观想法不同

```js
// 多次setState但是这里原来的state没有变化，因此最后得到的新state只加了1
increment() {
  this.setState({
    counter: this.state.counter + 1
  })
  this.setState({
    counter: this.state.counter + 1
  })
  this.setState({
    counter: this.state.counter + 1
  })
  this.setState({
    counter: this.state.counter + 1
  })
}

```

## 数据不可变

react 的设计理念是 state 应该是像电影的帧一样，所以下一帧不应该包含上一帧的内容，因此在更新 state 的时候，使用的数据应该是新生成的，务必不要使用原来的引用类型来设置新的 state

```js
this.state = {
  friends: [
    { name: "zhang", age: 12 },
    { name: "li", age: 12 },
    { name: "liu", age: 13 },
    { name: "wu", age: 14 },
  ],
};
// 1.在开发中不要这样来做
// const newData = {name: "tom", age: 30}
// this.state.friends.push(newData);
// this.setState({
//   friends: this.state.friends
// });
// 2. 推荐的做法
// 不是修改原数据而是产生新的数组（不一样的内存地址）
const newFriends = [...this.state.friends];
newFriends.push({ name: "tom", age: 30 });
this.setState({
  friends: newFriends,
});
```
