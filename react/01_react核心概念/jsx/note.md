# jsx

下面是最简单的 jsx 示例:

```jsx
const element = <div>jsx描述的UI</div>;
```

## jsx 是什么

jsx 不是 **js 语法**(不是 js 的字符串)，也不是 HTML，本质上属于 js 的一种**语法扩展**，jsx 可以生成 React"元素"(通过 babel 来翻译，翻译成 React.createElement()调用)。

> 为什么使用 jsx?
> React 认为渲染逻辑本质上和其他 UI 逻辑**内在耦合**，不应该分开

## jsx 的基本用法

jsx 从整体上看起来像是在 javascript 中书写 HTML，但是区别于 HTML，任然可以在 jsx 中继续使用 js：

1. 在 jsx 中插入 **js 的表达式使用{}**，遵循当前 js 的作用域
2. 任然**可以使用""**，但是其中就是相当于 js 当中的**字符串**，{}和""只能选择一个使用，不可以对同一个 HTML 属性同时使用
3. 由于 jsx 本质上是要转换成 js 的，所以遵循 js 的规则，在 jsx 中需要使用**小驼峰**命名法，把 HTML 中使用-链接的命名规则改成小驼峰
4. jsx 的 x 是指的 XML，所以单闭合标签必须是`<单闭合 />`
5. jsx 通常是 react 类组件的 render 函数的返回值或者函数式组件的返回值
6. jsx 只能**有一个根元素**，因此通常会用一个 div 来作为根元素包裹内容，同时使用()来包裹 div 元素，这样内部就可以正常换行了
   下面是一个典型的类组件的示例

```jsx
class Cpn extends React.Component {
  construct() {
    super();
    this.state = {
      message: "Hello React",
      counter: 0
    };
  }
  render() {
    const { message, counter } = this.state;
    // jsx
    return (
      <div>
        <span>{message}</span>
        <br></br>
        <button onClick={e=>{this.increase}}>+</button>
        <span>{counter}</span>
      </div>
    );
  }
  increase() {
    this.setState({
      counter: this.state.counter + 1;
    })
  }
}
```

## jsx 中的{} 使用

基本使用

1. jsx 中插入注释只能使用`{\* 这里是注释 *\}`
2. {}嵌入变量的情况
   1. 情况一：当变量为 Number，String，Array 的时候可以直接显示为变量的值
   2. 情况二：当变量为 null，undefined，Boolean 类型时，内容为空
   3. 情况三：对象类型不能作为子元素(not valid as a React child)，如果试图直接在页面中展示一个 js 的 object，将会直接**报错**
3. {}嵌入表达式的内容可以是
   1. 运算符表达式
   2. 三元运算符
   3. **执行一个函数**，会允许到此处时会立即执行，如果要给绑定事件请**传函数名**，而不是传一个函数的调用

常见的使用场景：

- 在 jsx 中通过{}来给 **HTML 绑定属性**
  - 任意元素的 title 属性
  - 任意元素的 class、style、id 属性
  - img 元素的 src 属性
- 在 jsx 中通过{}来给 HTML **绑定事件监听**

  - 相比于原生的 HTML，jsx 中使用小驼峰语法
  - 因此例如 on-click 需要写成 onClick
  - 通过{}来绑定一个函数，注意这**将被 react 进行处理**，要格外注意 **this** 的问题
  - react 处理后绑定的 function 在事件触发的时候同样可以第一个参数拿到当前 event 对象
    示例代码

  ```jsx
  class Cpn extends React.Component {
    construct() {
      this.state = {
        counter: 0,
      };
    }
    render() {
      return (
        <div>
          {/* 错误的事件绑定，丢失this */}
          <button onClick={this.increase}>+</button>
          {/* 解决方法一，传入的时候bind */}
          <button onClick={this.increase.bind(this)}>+</button>
          {/* 解决方法二，使用箭头函数 */}
          <button
            onClick={(e) => {
              this.increase();
            }}
          >
            +
          </button>
          {/* 解决方法三，ES6 class fields 语法 */}
          <button onClick={this.increase2}>+</button>
          <span>{counter}</span>
        </div>
      );
    }
    increase() {
      this.setState({
        counter: this.state.counter + 1,
      });
    }
    increase2 = () => {
      this.setState({
        counter: this.state.counter + 1,
      });
    };
  }
  ```

- 利用{}实现 vue 中 v-if,v-show 这样的指令的功能

  - 本身是利用布尔值或者 undefined 不显示实现的
  - 方式一：条件判断语句，适合**逻辑较多**的情况
  - 方式二：三元运算符，适合逻辑简单
  - 方式三：逻辑&&运算符，其实和三元运算符差不多
  - v-show：主要控制 display 属性是否则为 none

- 实现列表渲染，由于 jsx 及其自由，因此实现一个列表也很容易
  - jsx 中可以使用{}语法嵌入 js 表达式，js 表达式可以返回 jsx
  - 因此实现一个列表就可以使用数组的方法遍历生成一组 jsx
  - 或者使用一个方法返回列表 jsx 即可

## jsx 本质

本质上 jsx 只是 React.createElement(component, props, ...children)函数的语法糖

> 所有的 jsx 都会被 babel 成函数 React.createElement 的调用

React.createElement 的参数：

1. type，当前 ReactElement 元素的类型
   1. 如果
