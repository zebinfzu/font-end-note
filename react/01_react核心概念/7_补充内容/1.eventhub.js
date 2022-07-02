import React, { PureComponent } from "react";

import { EventEmitter } from "events";

// 创建对象
const eventBus = new EventEmitter();

class Home extends PureComponent {
  componentDidMount() {
    // 挂载时添加监听
    eventBus.addListener("sayHello", this.handleSayHelloListener);
  }

  componentWillUnmount() {
    // 组件从页面卸载时删除监听
    eventBus.removeListener("sayHello", this.handleSayHelloListener);
  }

  handleSayHelloListener(num, message) {
    console.log(num, message);
  }

  render() {
    return <div>Home</div>;
  }
}

class Profile extends PureComponent {
  render() {
    return (
      <div>
        Profile
        {/* Profile中的方法跨组件通知Home组件要触发事件 */}
        <button onClick={(e) => this.emitEvent()}>点击了profile按钮</button>
      </div>
    );
  }

  emitEvent() {
    // 通知事件触发
    eventBus.emit("sayHello", 123, "Hello Home");
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
        <Profile />
      </div>
    );
  }
}
