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

上例代码实现的多态性是通过makeSound函数中对对象来进行**类型判断**，这样的坏处就在与一旦新增新的对象类型，就必须在makeSound函数中添加逻辑判断。这样会导致makeSound函数变得非常巨大，且难以维护。

多态核心在于要把**谁去做**和**具体怎么做**分开，因此应该把**不变的**部分隔离出来，把可变的部分封装起来，这也符合**开放封闭原则**。

上面示例的改进代码

```javascript
const makeSound = function(animal) {
  animal.sound();
}

const Duck = function() {}
Duck.prototype.sound = function() {
  console.log("嘎嘎嘎")
}

const Chicken = function() {}
Chicken.prototype.sound = function() {
  console.log("咯咯咯")
}

makeSound( new Duck() );        // 嘎嘎嘎 
makeSound( new Chicken() );     // 咯咯咯

// 这样追加一只狗就只需要狗自己本身实现sound方法就可以了
const Dog = function(){} 
 
Dog.prototype.sound = function(){ 
    console.log( '汪汪汪' ); 
}; 
 
makeSound( new Dog() );     // 汪汪汪
```

### 类型检查和多态

由于javascript是动态类型的语言，因此说明多态的真正目的，这里只好使用c++来举例

```c++
std::string str;
str = "abc";
str = 2; // 报错 
```

尝试将上面的鸡鸭叫的代码转换成c++

```c++
class Duck {
public:
  void makeSound() {
    std::cout << "嘎嘎噶" << std::endl;
  }
};
class Chicken {
public:
  void makeSound() {
    std::cout << "咯咯咯" << std::endl;
  }
};
class AnimalSound() {
public:
  void makeSound(Duck duck) {
    duck.makeSound();
  }
};
```

好了，现在在animal类的方法makeSound当中可以使得鸭子叫唤了，但是要让鸡交换很困难，因此类型限制了，传入参数是鸡类的对象就会报错。

因此在静态类型的语言当中面向对象通常会设计成可以向上转换类型，意思就是一个变量的类型可以同时是这个类本身，也可以是该类的超类。即可以说一只鸭在叫，也可以说是一只动物在叫。

> 因此在静态类型语言中需要依赖于继承来实现多态

```c++
class Animal {};
class Duck: public Animal {
public:
  void makeSound() {
    std::cout << "嘎嘎噶" << std::endl;
  }
};
class Chicken: public Animal {
public:
  void makeSound() {
    std::cout << "咯咯咯" << std::endl;
  }
};
class AnimalSound() {
public:
  void makeSound(Animal animal) {
    animal.makeSound();
  }
};
```

> javascript中的多态
> 由于javascript是动态类型的语言，因此指使实例怎么做的function makeSound不在乎传入的object是什么类型，只关心该对象本身有没有makeSound方法

### 多态在程序设计中的作用

多态的根本做用就是干掉**大量的if else**，将过程化的条件分支语句转换为对象的多态性。

## 封装

封装的目的是**将信息隐藏**。一般而言，封装是指封装数据和封装实现。这里将讨论更广义的封装，不仅包括封装数据和封装实现，还包括封装类型和封装变化。

### 封装数据

在许多语言的对象系统中，封装数据是由**语法解析**来实现的，这些语言也许提供了private、public、protected 等关键字来提供不同的访问权限

由于javascript没有提供关键字，因此只能使用作用域来模拟public和private 

```javascript
// 利用立即执行函数创造一个局部作用域
const myObject = (function(){
  // 私有变量(private)
  const __name = 'sven';
  return {
    // 公开方法(public)利用闭包
    getName: function() {
      return __name
    }
  }
})();
console.log(myObject.getName()); // 输出: sven
console.log(myObject.__name); // undefined
```

在es6可以通过Symbol创建私有属性

```javascript
const People = (function() {
  const name = Symbol("name");
  class People {
    constructor(n) {
      this[name] = n;
    }
    getName() {
      return this[name];
    }
  }
})();
```

以上是数据的封装，但实际封装有更加广泛的用途，比如封装类型，封装实现细节。这样的好处是可以让对象之间的耦合变得松散，对象之间只通过暴露的API 接口来通信

## 原型模式

在以类为中心的面向对象编程语言中，类和对象的关系可以想象成铸模和铸件的关系，对象总是从类中创建而来。

但在原型编程思想当中，类不是必须的，对象可以是通过克隆另外一个对象得来的。

### 使用克隆的原型模式

原型继承实现的关键在于语言本身是否提供了clone方法，es5提供了API Object.create方法，用来克隆对象。

```js
var Plane = function(){ 
    this.blood = 100; 
    this.attackLevel = 1; 
    this.defenseLevel = 1; 
}; 
 
var plane = new Plane(); 
plane.blood = 500; 
plane.attackLevel = 10; 
plane.defenseLevel = 7; 
 
var clonePlane = Object.create(plane); 
console.log(clonePlane);   
// 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7}
```

静态类型的语言中，不同类型之间的解耦非常重要，依赖倒置原则则要求创建对象的时候要避免依赖具体的类型，而用new XXX 创建对象的方式显得很僵硬。工厂方法
模式和抽象工厂模式可以解决这个问题，但这两个模式会带来许多跟产品类平行的工厂类层次，也会增加很多额外的代码

### 原型编程的一些规则

一个对象B是从A克隆过来的，就说A对象是B对象的原型。

上面鸡鸭狗的案例中，Object是Animal的原型，而Animal是Dog的原型，尝试调用Dog对象的方法时，如果Dog上面没有这个方法，就会向原型链上委托给Animal，Animal上没有就继续向上委托给Object直到找到或者根对象上也没有。
