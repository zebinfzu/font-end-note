# react 中的样式

## 内联样式

优点：

1. 内联样式不会导致冲突
2. 可以动态获取当前 state 中的状态

缺点：

1. 写法上都需要使用驼峰标识
2. 智能提示比较烂
3. 大量的样式, 代码混乱
4. 某些样式无法编写

## 普通的样式

普通的 css 通常会编写到一个单独的文件，之后再进行引入

缺点主要是普通的 css 都是全局 css，样式之间会互相影响

## css modules

React 的脚手架已经内置了 css modules 的配置，将.css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss 即可

## css in js

css-in-js 比较流行的库

1.  styled-components
2.  emotion
3.  glamorous

### styled-components

1. styled-components 的本质是通过函数的调用，最终创建出一个组件
2. 这个组件会被自动添加上一个不重复的 class
3. styled-components 会给该 class 添加相关的样式
4. 支持如 sass、less 一样的样式嵌套
   1. 支持直接子代选择器或后代选择器，并且直接编写样式
   2. 可以通过&符号获取当前元
   3. 直接伪类选择器、伪元素等

示例:

```jsx
// 从styled-components导入styled方法
import styled, { ThemeProvider } from "styled-components";
// 使用模板字符串调用styled可以创造一个包裹的标签，用在jsx中可以使得被包裹内容获得不重复的类
const MYbutton = styled.button`
  padding: 10px 20px;
  border-color: red;
  color: red;
`;
class App extends PureComponent {
  render() {
    return <MYbutton>我是普通按钮</MYbutton>;
  }
}
```

> 解决动态样式的问题:props 可以被传给 styled 组件，在组件内获取 props 需要${}传入一个方法

```js
const MYInput = styled.input.attrs({
  placeholder: "请填入密码",
  paddingLeft: (props) => props.left || "5px",
})`
  border-color: red;
  padding-left: ${(props) => props.paddingLeft};
  &: focus {
    outline-color: orange;
  }
`;
```

styled 高级特性：

1. 支持样式继承

   ```jsx
   const MYbutton = styled.button`
     padding: 8px, 30px;
     border-radius: 5px;
   `;
   const MYWarnButton = styled(MYButton)`
     background-color: red;
     color: #fff;
   `;
   ```

2. 支持设置主题

   ```jsx
   <ThemeProvider theme={{ color: "red", fontSize: "30px" }}>
     <Profile />
   </ThemeProvider>;
   // Profile
   const ProfileWrapper = styled.div`
     color: ${(props) => props.theme.color};
     font-size: ${(props) => props.theme.fontSize};
   `;
   ```
