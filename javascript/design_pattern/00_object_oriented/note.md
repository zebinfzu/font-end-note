# 面向对象的 javascript

> JavaScript 没有提供传统面向对象语言中的**类式继承**，而是通过**原型委托**的方式来实现对象与对象之间的继承，ES6 的 class 关键字一样只是语法糖

编译语法可以分为静态类型和动态类型

- 静态类型：
  - 编译时就能发现**类型不匹配**的错误
  - 编译器可以在编译期做优化，提高运行效率
- 动态类型：
  - 变量类型要到程序运行才会具有某种类型(**JavaScript**是动态类型语言)
  - 可以让程序员专注业务逻辑，代码也会更加简洁

了解了 javascript 是动态类型语言之后，再来了解一下所谓鸭子类型（duck typing）：“如果它走起
路来像鸭子，叫起来也是鸭子，那么它就是鸭子。”

案例：希望找到 1000 只鸭子加入合唱团“嘎嘎嘎”，只能找到 999 只，这时候有一只鸡，也会嘎嘎嘎

示例代码：

```javascript
const duck = {
  duckSinging: function () {
    console.log("嘎嘎嘎");
  },
};
const chicken = {
  duckSinging: function () {
    console.log("嘎嘎嘎");
  },
};
const choir = []; // 合唱团
const joinChoir = function (animal) {
  if (animal && typeof animal.duckSinging === "function") {
    choir.push(animal);
    console.log("恭喜加入合唱团");
    console.log("合唱团已有成员数量:" + choir.length);
  }
};
joinChoir(duck); // 恭喜加入合唱团
joinChoir(chicken); // 恭喜加入合唱团
```

上面案例看到，其实我们不在乎具体的对象是什么类型，反正会嘎嘎嘎就好了，由此我们想要的是结论是：

- 在动态类型的语言中，类型对于程序员不是很重要
- 我们只要确保接口一致，这即是所谓**面向接口编程**
- 如果是静态类型的语言，这很难实现，需要借助**抽象类**或者接口等将对象进行**向上转型**
- 因此 javascript 中设计模式会和静态类型中差别很大

## 多态

> polymorphism，多态，可以理解为 poly(复数)+morph(形态)+ism

实际含义可以理解为：**同一操作**作用于不同的对象上面，可以产生不同的解释和**不同的执行结
果**。

简单举例：我们只知道两只动物会叫，我们不关心他们的具体种类，我们发指令让他们叫，实际上他们一只是鸡一只是鸭，所以我们让对象**都调用了 sound 方法**，一个对象返回了"嘎嘎嘎"，另外一个却返回了"咯咯咯"，这就是多态的表现。

代码示例

```javascript
const makeSound = function (animal) {
  if (animal instanceof Duck) {
    console.log("嘎嘎嘎");
  } else if (animal instanceof Chicken) {
    console.log("咯咯咯");
  }
};
const Duck = function () {};
const Chicken = function () {};
makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
```
