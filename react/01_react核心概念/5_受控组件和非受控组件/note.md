# 受控组件

在 React 中，HTML 表单的处理方式和普通的 DOM 元素不太一样：表单元素通常会保存在一些内部的 state

表单元素的示例代码

```jsx
<form>
  <label>
    名字：
    <input type="text" name="name" />
  </label>
  <input type="submit" value="提交" />
</form>
```

1. 上面表单元素默认的 HTML 行为：在用户点击提交时会提交到某个服务器中，并且刷新页面
2. React 没有阻止默认的 HTML 行为
3. 但是通常情况下会使用 JavaScript 函数来方便的处理表单提交，同时还可以访问用户填写的表单数据
4. 实现这种效果的标准方式是使用“受控组件”

## 受控组件的用法

1. 在 HTML 中，表单元素（如\<input>、 \<textarea> 和 \<select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新
2. 而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新
   - 把两者结合起来，使 React 的 state 作为唯一的数据源
   - 渲染表单的 React 组件还控制着用户输入过程中表单发生的操作
   - 被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”
3. 由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源
4. 由于 handleUsernameChange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新

| Element               | Value Property       | ChangeCallback | new Value in the Callback |
| --------------------- | -------------------- | -------------- | ------------------------- |
| input type="text"     | value="string"       | onChange       | event.target.value        |
| input type="checkbox" | checked={boolean}    | onChange       | event.target.checked      |
| input type="radio"    | checked={boolean}    | onChange       | event.target.checked      |
| textarea              | value="string"       | onChange       | event.target.value        |
| select                | value="option value" | onChange       | event.target.value        |

## 非受控组件

React 推荐大多数情况下使用 受控组件 来处理表单数据：

- 一个受控组件中，表单数据是由 React 组件来管理的
- 另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理
