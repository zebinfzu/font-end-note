# 补充内容

## 事件总线

context 相关 API 主要是用于跨代组件的数据通信，而跨组件之间的事件传递可以使用观察者模式(事件总线)来完成，react 常用的第三方事件总线库 events

常用 API：

- 创建 EventEmitter 对象：eventBus 对象
- 发出事件：eventBus.emit("事件名称", 参数列表)
- 监听事件：eventBus.addListener("事件名称", 监听函数)
- 移除事件：eventBus.removeListener("事件名称", 监听函数)
