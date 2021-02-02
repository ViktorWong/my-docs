# 深入 JavaScript

## 作用域闭包

### 执行上下文

当执行 JS 代码时，会产生三种执行上下文

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

每个执行上下文中都有三个重要的属性

- 变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
- 作用域链（JS 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
- this

```js
var a = 10
function foo(i) {
  var b = 20
}
foo()
```

对于上述代码，执行栈中有两个上下文：全局上下文和函数 `foo` 上下文。

```js
stack = [globalContext, fooContext]
```

对于全局上下文来说，VO 大概是这样的

```js
globalContext.VO === globe
globalContext.VO = {
    a: undefined,
	foo: <Function>,
}
```

对于函数 `foo` 来说，VO 不能访问，只能访问到活动对象（AO）

```js
fooContext.VO === foo.AO
fooContext.AO {
    i: undefined,
	b: undefined,
    arguments: <>
}
// arguments 是函数独有的对象(箭头函数没有)
// 该对象是一个伪数组，有 `length` 属性且可以通过下标访问元素
// 该对象中的 `callee` 属性代表函数本身
// `caller` 属性代表函数的调用者
```

对于作用域链，可以把它理解成包含自身变量对象和上级变量对象的列表，通过 `[[Scope]]` 属性查找上级变量

```js
fooContext.[[Scope]] = [
    globalContext.VO
]
fooContext.Scope = fooContext.[[Scope]] + fooContext.VO
fooContext.Scope = [
    fooContext.VO,
    globalContext.VO
]
```

接下来让我们看一个老生常谈的例子，`var`

```js
b() // call b
console.log(a) // undefined

var a = 'Hello world'

function b() {
  console.log('call b')
}
```

想必以上的输出大家肯定都已经明白了，这是因为函数和变量提升的原因。通常提升的解释是说将声明的代码移动到了顶部，这其实没有什么错误，便于大家理解。但是更准确的解释应该是：在生成执行上下文时，会有两个阶段。第一个阶段是创建的阶段（具体步骤是创建 VO），JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 undefined，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用。

在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

```js
b() // call b second

function b() {
  console.log('call b fist')
}
function b() {
  console.log('call b second')
}
var b = 'Hello world'
```

`var` 会产生很多错误，所以在 ES6 中引入了 `let`。`let` 不能在声明前使用，但是这并不是常说的 `let` 不会提升，`let` 提升了声明但没有赋值，因为临时死区导致了并不能在声明前使用。

对于非匿名的立即执行函数需要注意以下一点

```js
var foo = 1(
  (function foo() {
    foo = 10
    console.log(foo)
  })()
) // -> ƒ foo() { foo = 10 ; console.log(foo) }
```

因为当 JS 解释器在遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函数名称作为这个对象的属性，因此函数内部才可以访问到 `foo`，但是这个值又是只读的，所以对它的赋值并不生效，所以打印的结果还是这个函数，并且外部的值也没有发生更改。

```js
specialObject = {};

Scope = specialObject + Scope;

foo = new FunctionExpression;
foo.[[Scope]] = Scope;
specialObject.foo = foo; // {DontDelete}, {ReadOnly}

delete Scope[0]; // remove specialObject from the front of scope chain
```

### 闭包

闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

```js
function A() {
  let a = 1
  function B() {
    console.log(a)
  }
  return B
}
```

你是否会疑惑，为什么函数 A 已经弹出调用栈了，为什么函数 B 还能引用到函数 A 中的变量。因为函数 A 中的变量这时候是存储在堆上的。现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。

经典面试题，循环中使用闭包解决 `var` 定义函数的问题

```Js
for ( var i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );
}
```

首先因为 `setTimeout` 是个异步函数，所有会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6。

解决办法两种，第一种使用闭包

```js
for (var i = 1; i <= 5; i++) {
  ;(function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

第二种就是使用 `setTimeout` 的第三个参数

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

第三种就是使用 `let` 定义 `i` 了

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

因为对于 `let` 来说，他会创建一个块级作用域，相当于

```js
{ // 形成块级作用域
  let i = 0
  {
    let ii = i
    setTimeout( function timer() {
        console.log( ii );
    }, i*1000 );
  }
  i++
  {
    let ii = i
  }
  i++
  {
    let ii = i
  }
  ...
}
```

## this 全面解析

`this` 是很多人会混淆的概念，但是其实他一点都不难，你只需要记住几个规则就可以了。

```js
function foo() {
	console.log(this.a)
}
var a = 1
foo()

var obj = {
	a: 2,
	foo: foo
}
obj.foo()

// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况

// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo()
c.a = 3
console.log(c.a)

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```

以上几种情况明白了，很多代码中的 `this` 应该就没什么问题了，下面让我们看看箭头函数中的 `this`

```js
function a() {
    return () => {
        return () => {
        	console.log(this)
        }
    }
}
console.log(a()()())
```

箭头函数其实是没有 `this` 的，这个函数中的 `this` 只取决于他外面的第一个不是箭头函数的函数的 `this`。在这个例子中，因为调用 `a` 符合前面代码中的第一个情况，所以 `this` 是 `window`。并且 `this` 一旦绑定了上下文，就不会被任何代码改变。

## 深浅拷贝原理

>

::: tip
作者：木易杨说

链接：https://juejin.im/post/5c45112e6fb9a04a027aa8fe

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
:::

### 赋值、浅拷贝和深拷贝的区别

#### 一、赋值（Copy）

赋值是将某一数值或对象赋给某个变量的过程，分为下面 2 部分

- 基本数据类型：赋值，赋值之后两个变量互不影响
- 引用数据类型：赋址，两个变量具有相同的引用，指向同一个对象，相互之间有影响

对基本类型进行赋值操作，两个变量互不影响。

```js
// 木易杨
let a = 'muyiy'
let b = a
console.log(b)
// muyiy

a = 'change'
console.log(a)
// change
console.log(b)
// muyiy
```

对引用类型进行赋址操作，两个变量指向同一个对象，改变变量 `a` 之后会影响变量 `b`，哪怕改变的只是对象 `a` 中的基本类型数据。

```js
// 木易杨
let a = {
  name: 'muyiy',
  book: {
    title: "You Don't Know JS",
    price: '45'
  }
}
let b = a
console.log(b)
// {
// 	name: "muyiy",
// 	book: {title: "You Don't Know JS", price: "45"}
// }

a.name = 'change'
a.book.price = '55'
console.log(a)
// {
// 	name: "change",
// 	book: {title: "You Don't Know JS", price: "55"}
// }

console.log(b)
// {
// 	name: "change",
// 	book: {title: "You Don't Know JS", price: "55"}
// }
```

通常在开发中并不希望改变变量 `a` 之后会影响到变量 `b`，这时就需要用到浅拷贝和深拷贝。

#### 二、浅拷贝（Shallow Copy）

**1、什么是浅拷贝**
创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
![img](https://user-gold-cdn.xitu.io/2018/12/24/167de3ac36bb9de7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

上图中，SourceObject 是原对象，其中包含基本类型属性 field1 和引用类型属性 refObj。浅拷贝之后基本类型数据 field2 和 filed1 是不同属性，互不影响。但引用类型 refObj 仍然是同一个，改变之后会对另一个对象产生影响。

简单来说可以理解为浅拷贝只解决了第一层的问题，拷贝第一层的基本类型值，以及第一层的引用类型地址。

**2、浅拷贝使用场景**

- `Object.assign()`

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

有些文章说`Object.assign()` 是深拷贝，其实这是不正确的。

```js
// 木易杨
let a = {
  name: 'muyiy',
  book: {
    title: "You Don't Know JS",
    price: '45'
  }
}
let b = Object.assign({}, a)
console.log(b)
// {
// 	name: "muyiy",
// 	book: {title: "You Don't Know JS", price: "45"}
// }

a.name = 'change'
a.book.price = '55'
console.log(a)
// {
// 	name: "change",
// 	book: {title: "You Don't Know JS", price: "55"}
// }

console.log(b)
// {
// 	name: "muyiy",
// 	book: {title: "You Don't Know JS", price: "55"}
// }
```

上面代码改变对象 `a` 之后，对象 `b` 的基本属性保持不变。但是当改变对象 `a` 中的对象 `book` 时，对象 `b` 相应的位置也发生了变化。

- 展开语法 `Spread`

```js
// 木易杨
let a = {
  name: 'muyiy',
  book: {
    title: "You Don't Know JS",
    price: '45'
  }
}
let b = { ...a }
console.log(b)
// {
// 	name: "muyiy",
// 	book: {title: "You Don't Know JS", price: "45"}
// }

a.name = 'change'
a.book.price = '55'
console.log(a)
// {
// 	name: "change",
// 	book: {title: "You Don't Know JS", price: "55"}
// }

console.log(b)
// {
// 	name: "muyiy",
// 	book: {title: "You Don't Know JS", price: "55"}
// }
```

通过代码可以看出实际效果和 `Object.assign()` 是一样的。

- `Array.prototype.slice()`

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin`和 `end`（不包括`end`）决定的原数组的浅拷贝。原始数组不会被改变。

```js
// 木易杨
let a = [0, '1', [2, 3]]
let b = a.slice(1)
console.log(b)
// ["1", [2, 3]]

a[1] = '99'
a[2][0] = 4
console.log(a)
// [0, "99", [4, 3]]

console.log(b)
//  ["1", [4, 3]]
```

可以看出，改变 `a[1]` 之后 `b[0]` 的值并没有发生变化，但改变 `a[2][0]` 之后，相应的 `b[1][0]` 的值也发生变化。说明 `slice()` 方法是浅拷贝，相应的还有`concat`等，在工作中面对复杂数组结构要额外注意。

#### 三、深拷贝（Deep Copy）

**1、什么是深拷贝**

深拷贝会拷贝所有的属性，并拷贝属性指向的动态分配的内存。当对象和它所引用的对象一起拷贝时即发生深拷贝。深拷贝相比于浅拷贝速度较慢并且花销较大。拷贝前后两个对象互不影响。

![img](https://user-gold-cdn.xitu.io/2018/12/24/167de3ac3846927b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**2、深拷贝使用场景**

`JSON.parse(JSON.stringify(object))`

```js
// 木易杨
let a = {
  name: 'muyiy',
  book: {
    title: "You Don't Know JS",
    price: '45'
  }
}
let b = JSON.parse(JSON.stringify(a))
console.log(b)
// {
// 	name: "muyiy",
// 	book: {title: "You Don't Know JS", price: "45"}
// }

a.name = 'change'
a.book.price = '55'
console.log(a)
// {
// 	name: "change",
// 	book: {title: "You Don't Know JS", price: "55"}
// }

console.log(b)
// {
// 	name: "muyiy",
// 	book: {title: "You Don't Know JS", price: "45"}
// }
```

完全改变变量 a 之后对 b 没有任何影响，这就是深拷贝的魔力。

我们看下对数组深拷贝效果如何。

```js
// 木易杨
let a = [0, '1', [2, 3]]
let b = JSON.parse(JSON.stringify(a.slice(1)))
console.log(b)
// ["1", [2, 3]]

a[1] = '99'
a[2][0] = 4
console.log(a)
// [0, "99", [4, 3]]

console.log(b)
//  ["1", [2, 3]]
```

对数组深拷贝之后，改变原数组不会影响到拷贝之后的数组。

但是该方法有以下几个问题。

1、会忽略 `undefined`

2、会忽略 `symbol`

3、不能序列化函数

4、不能解决循环引用的对象

5、不能正确处理`new Date()`

6、不能处理正则

- `undefined`、`symbol` 和函数这三种情况，会直接忽略。

```js
// 木易杨
let obj = {
  name: 'muyiy',
  a: undefined,
  b: Symbol('muyiy'),
  c: function() {}
}
console.log(obj)
// {
// 	name: "muyiy",
// 	a: undefined,
//  b: Symbol(muyiy),
//  c: ƒ ()
// }

let b = JSON.parse(JSON.stringify(obj))
console.log(b)
// {name: "muyiy"}
```

- 循环引用情况下，会报错。

```js
// 木易杨
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
}
obj.a = obj.b
obj.b.c = obj.a

let b = JSON.parse(JSON.stringify(obj))
// Uncaught TypeError: Converting circular structure to JSON
```

- `new Date` 情况下，转换结果不正确。

```js
// 木易杨
new Date()
// Mon Dec 24 2018 10:59:14 GMT+0800 (China Standard Time)

JSON.stringify(new Date())
// ""2018-12-24T02:59:25.776Z""

JSON.parse(JSON.stringify(new Date()))
// "2018-12-24T02:59:41.523Z"
```

解决方法转成字符串或者时间戳就好了。

```js
// 木易杨
let date = new Date().valueOf()
// 1545620645915

JSON.stringify(date)
// "1545620673267"

JSON.parse(JSON.stringify(date))
// 1545620658688
```

- 正则情况下

```js
// 木易杨
let obj = {
  name: 'muyiy',
  a: /'123'/
}
console.log(obj)
// {name: "muyiy", a: /'123'/}

let b = JSON.parse(JSON.stringify(obj))
console.log(b)
// {name: "muyiy", a: {}}
```

PS：为什么会存在这些问题可以学习一下 `JSON`。

除了上面介绍的深拷贝方法，常用的还有`jQuery.extend()` 和 `lodash.cloneDeep()`，后面文章会详细介绍源码实现，敬请期待！

#### 四、总结

| ---    | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 | 原数据中包含子对象       |
| ------ | ------------------------ | ------------------------ | ------------------------ |
| 赋值   | 是                       | 改变会使原数据一同改变   | 改变会使原数据一同改变   |
| 浅拷贝 | 否                       | 改变不会使原数据一同改变 | 改变会使原数据一同改变   |
| 深拷贝 | 否                       | 改变不会使原数据一同改变 | 改变不会使原数据一同改变 |

### 实现一个浅拷贝

#### 浅拷贝 `Object.assign`

`Object.assign`，将所有可枚举属性的值从一个或多个源对象复制到目标对象，同时返回目标对象。（来自 `MDN`）

语法如下所示：

> `Object.assign(target, ...sources)`

其中 `target` 是目标对象，`sources` 是源对象，可以有多个，返回修改后的目标对象 `target`。

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后来的源对象的属性将类似地覆盖早先的属性。

**示例 1**

我们知道浅拷贝就是拷贝第一层的**基本类型值**，以及第一层的**引用类型地址**。

```js
// 木易杨
// 第一步
let a = {
  name: 'advanced',
  age: 18
}
let b = {
  name: 'muyiy',
  book: {
    title: "You Don't Know JS",
    price: '45'
  }
}
let c = Object.assign(a, b)
console.log(c)
// {
// 	name: "muyiy",
//  age: 18,
// 	book: {title: "You Don't Know JS", price: "45"}
// }
console.log(a === c)
// true

// 第二步
b.name = 'change'
b.book.price = '55'
console.log(b)
// {
// 	name: "change",
// 	book: {title: "You Don't Know JS", price: "55"}
// }

// 第三步
console.log(a)
// {
// 	name: "muyiy",
//  age: 18,
// 	book: {title: "You Don't Know JS", price: "55"}
// }
```

1、在第一步中，使用 `Object.assign` 把源对象 `b` 的值复制到目标对象 `a` 中，这里把返回值定义为对象 `c`，可以看出 `b` 会替换掉 `a` 中具有相同键的值，即如果目标对象（`a`）中的属性具有相同的键，则属性将被源对象（`b`）中的属性覆盖。这里需要注意下，返回对象 `c` 就是 目标对象 `a`。

2、在第二步中，修改源对象 `b` 的基本类型值（`name`）和引用类型值（`book`）。

3、在第三步中，浅拷贝之后目标对象 `a` 的基本类型值没有改变，但是引用类型值发生了改变，因为 `Object.assign()` 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也**只拷贝那个引用地址**。

**示例 2**

`String` 类型和 `Symbol` 类型的属性都会被拷贝，而且不会跳过那些值为 `null` 或 `undefined` 的源对象。

```js
// 木易杨
// 第一步
let a = {
  name: 'muyiy',
  age: 18
}
let b = {
  b1: Symbol('muyiy'),
  b2: null,
  b3: undefined
}
let c = Object.assign(a, b)
console.log(c)
// {
// 	name: "muyiy",
//  age: 18,
// 	b1: Symbol(muyiy),
// 	b2: null,
// 	b3: undefined
// }
console.log(a === c)
// true
```

#### `Object.assign` 模拟实现

实现一个 `Object.assign` 大致思路如下：

1、判断原生 `Object` 是否支持该函数，如果不存在的话创建一个函数 `assign`，并使用 `Object.defineProperty` 将该函数绑定到 `Object` 上。

2、判断参数是否正确（目标对象不能为空，我们可以直接设置{}传递进去,但必须设置值）。

3、使用 `Object()` 转成对象，并保存为 `to`，最后返回这个对象 `to`。

4、使用 `for..in` 循环遍历出所有可枚举的自有属性。并复制给新的目标对象（使用 `hasOwnProperty` 获取自有属性，即非原型链上的属性）。

实现代码如下，这里为了验证方便，使用 `assign2` 代替 `assign`。注意此模拟实现不支持 `symbol` 属性，因为`ES5` 中根本没有 `symbol` 。

```js
// 木易杨
if (typeof Object.assign2 != 'function') {
  // Attention 1
  Object.defineProperty(Object, 'assign2', {
    value: function(target) {
      'use strict'
      if (target == null) {
        // Attention 2
        throw new TypeError('Cannot convert undefined or null to object')
      }

      // Attention 3
      var to = Object(target)

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]

        if (nextSource != null) {
          // Attention 2
          // Attention 4
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}
```

针对上面的代码做如下扩展。

**注意 1：可枚举性**

原生情况下挂载在 `Object` 上的属性是不可枚举的，但是直接在 `Object` 上挂载属性 `a` 之后是可枚举的，所以这里必须使用 `Object.defineProperty`，并设置 `enumerable: false` 以及 `writable: true`, `configurable: true`。

```js
// 木易杨
for (var i in Object) {
  console.log(Object[i])
}
// 无输出

Object.keys(Object)
// []
```

上面代码说明原生 `Object` 上的属性不可枚举。

我们可以使用 2 种方法查看 `Object.assign` 是否可枚举，使用 `Object.getOwnPropertyDescriptor` 或者 `Object.propertyIsEnumerable` 都可以，其中`propertyIsEnumerable(..)` 会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 `enumerable: true`。具体用法如下：

```js
// 木易杨
// 方法1
Object.getOwnPropertyDescriptor(Object, 'assign')
// {
// 	value: ƒ,
//  writable: true, 	// 可写
//  enumerable: false,  // 不可枚举，注意这里是 false
//  configurable: true	// 可配置
// }

// 方法2
Object.propertyIsEnumerable('assign')
// false
```

上面代码说明 `Object.assign` 是不可枚举的。

介绍这么多是因为直接在 `Object` 上挂载属性 `a` 之后是可枚举的，我们来看如下代码。

```js
// 木易杨
Object.a = function() {
  console.log('log a')
}

Object.getOwnPropertyDescriptor(Object, 'a')
// {
// 	value: ƒ,
//  writable: true,
//  enumerable: true,  // 注意这里是 true
//  configurable: true
// }

Object.propertyIsEnumerable('a')
// true
```

所以要实现 `Object.assign` 必须使用 `Object.defineProperty`，并设置 `writable: true`, `enumerable: false`, `configurable: true`，当然默认情况下不设置就是 `false`。

```js
// 木易杨
Object.defineProperty(Object, 'b', {
  value: function() {
    console.log('log b')
  }
})

Object.getOwnPropertyDescriptor(Object, 'b')
// {
// 	value: ƒ,
//  writable: false, 	// 注意这里是 false
//  enumerable: false,  // 注意这里是 false
//  configurable: false	// 注意这里是 false
// }
```

所以具体到本次模拟实现中，相关代码如下。

```js
// 木易杨
// 判断原生 Object 中是否存在函数 assign2
if (typeof Object.assign2 != 'function') {
  // 使用属性描述符定义新属性 assign2
  Object.defineProperty(Object, "assign2", {
    value: function (target) {
      ...
    },
    // 默认值是 false，即 enumerable: false
    writable: true,
    configurable: true
  });
}
```

**注意 2：判断参数是否正确**

有些文章判断参数是否正确是这样的。

```js
// 木易杨
if (target === undefined || target === null) {
  throw new TypeError('Cannot convert undefined or null to object')
}
```

这样肯定没问题，但是这样写没有必要，因为 `undefined` 和 `null` 是相等的（高程 3 P52 ），即 `undefined == null` 返回 `true`，只需要按照如下方式判断就好了。

```js
// 木易杨
if (target == null) {
  // TypeError if undefined or null
  throw new TypeError('Cannot convert undefined or null to object')
}
```

**注意 3：原始类型被包装为对象**

```js
// 木易杨
var v1 = 'abc'
var v2 = true
var v3 = 10
var v4 = Symbol('foo')

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4)
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj)
// { "0": "a", "1": "b", "2": "c" }
```

上面代码中的源对象 `v2`、`v3`、`v4` 实际上被忽略了，原因在于他们自身没有可枚举属性。

```js
// 木易杨
var v1 = 'abc'
var v2 = true
var v3 = 10
var v4 = Symbol('foo')
var v5 = null

// Object.keys(..) 返回一个数组，包含所有可枚举属性
// 只会查找对象直接包含的属性，不查找[[Prototype]]链
Object.keys(v1) // [ '0', '1', '2' ]
Object.keys(v2) // []
Object.keys(v3) // []
Object.keys(v4) // []
Object.keys(v5)
// TypeError: Cannot convert undefined or null to object

// Object.getOwnPropertyNames(..) 返回一个数组，包含所有属性，无论它们是否可枚举
// 只会查找对象直接包含的属性，不查找[[Prototype]]链
Object.getOwnPropertyNames(v1) // [ '0', '1', '2', 'length' ]
Object.getOwnPropertyNames(v2) // []
Object.getOwnPropertyNames(v3) // []
Object.getOwnPropertyNames(v4) // []
Object.getOwnPropertyNames(v5)
// TypeError: Cannot convert undefined or null to object
```

但是下面的代码是可以执行的。

```js
// 木易杨
var a = 'abc'
var b = {
  v1: 'def',
  v2: true,
  v3: 10,
  v4: Symbol('foo'),
  v5: null,
  v6: undefined
}

var obj = Object.assign(a, b)
console.log(obj)
// {
//   [String: 'abc']
//   v1: 'def',
//   v2: true,
//   v3: 10,
//   v4: Symbol(foo),
//   v5: null,
//   v6: undefined
// }
```

原因很简单，因为此时 `undefined`、`true` 等不是作为对象，而是作为对象 `b` 的属性值，对象 `b` 是可枚举的。

```js
// 木易杨
// 接上面的代码
Object.keys(b) // [ 'v1', 'v2', 'v3', 'v4', 'v5', 'v6' ]
```

这里其实又可以看出一个问题来，那就是目标对象是原始类型，会包装成对象，对应上面的代码就是目标对象 `a` 会被包装成 `[String: 'abc']`，那模拟实现时应该如何处理呢？很简单，使用 `Object(..)` 就可以了。

```js
// 木易杨
var a = 'abc'
console.log(Object(a))
// [String: 'abc']
```

到这里已经介绍很多知识了，让我们再来延伸一下，看看下面的代码能不能执行。

```js
// 木易杨
var a = 'abc'
var b = 'def'
Object.assign(a, b)
```

答案是否定的，会提示以下错误。

```js
// 木易杨
TypeError: Cannot assign to read only property '0' of object '[object String]'
```

原因在于 `Object("abc")` 时，其属性描述符为不可写，即 `writable: false`。

```js
// 木易杨
var myObject = Object('abc')

Object.getOwnPropertyNames(myObject)
// [ '0', '1', '2', 'length' ]

Object.getOwnPropertyDescriptor(myObject, '0')
// {
//   value: 'a',
//   writable: false, // 注意这里
//   enumerable: true,
//   configurable: false
// }
```

同理，下面的代码也会报错。

```js
// 木易杨
var a = 'abc'
var b = {
  0: 'd'
}
Object.assign(a, b)
// TypeError: Cannot assign to read only property '0' of object '[object String]'
```

但是并不是说只要 `writable: false` 就会报错，看下面的代码。

```js
// 木易杨
var myObject = Object('abc')

Object.getOwnPropertyDescriptor(myObject, '0')
// {
//   value: 'a',
//   writable: false, // 注意这里
//   enumerable: true,
//   configurable: false
// }

myObject[0] = 'd'
// 'd'

myObject[0]
// 'a'
```

这里并没有报错，原因在于 `JS` 对于不可写的属性值的修改静默失败（`silently failed`）,在严格模式下才会提示错误。

```js
// 木易杨
'use strict'
var myObject = Object('abc')

myObject[0] = 'd'
// TypeError: Cannot assign to read only property '0' of object '[object String]'
```

所以我们在模拟实现 `Object.assign` 时需要使用严格模式。

**注意 4：存在性**

如何在不访问属性值的情况下判断对象中是否存在某个属性呢，看下面的代码。

```js
// 木易杨
var anotherObject = {
  a: 1
}

// 创建一个关联到 anotherObject 的对象
var myObject = Object.create(anotherObject)
myObject.b = 2

'a' in myObject // true
'b' in myObject // true

myObject.hasOwnProperty('a') // false
myObject.hasOwnProperty('b') // true
```

这边使用了 `in` 操作符和 `hasOwnProperty` 方法，区别如下（你不知道的 JS 上卷 P119）：

1、`in` 操作符会检查属性是否在对象及其 `[[Prototype]]` 原型链中。

2、`hasOwnProperty(..)` 只会检查属性是否在 myObject 对象中，不会检查 `[[Prototype]]` 原型链。

`Object.assign` 方法肯定不会拷贝原型链上的属性，所以模拟实现时需要用 `hasOwnProperty(..)` 判断处理下，但是直接使用 `myObject.hasOwnProperty(..)` 是有问题的，因为有的对象可能没有连接到 `Object.prototype` 上（比如通过 `Object.create(null)` 来创建），这种情况下，使用 `myObject.hasOwnProperty(..)` 就会失败。

```js
// 木易杨
var myObject = Object.create(null)
myObject.b = 2

'b' in myObject
// true

myObject.hasOwnProperty('b')
// TypeError: myObject.hasOwnProperty is not a function
```

解决方法也很简单，使用`call` 就可以了，使用如下。

```js
// 木易杨
var myObject = Object.create(null)
myObject.b = 2

Object.prototype.hasOwnProperty.call(myObject, 'b')
// true
```

所以具体到本次模拟实现中，相关代码如下。

```js
// 木易杨
// 使用 for..in 遍历对象 nextSource 获取属性值
// 此处会同时检查其原型链上的属性
for (var nextKey in nextSource) {
  // 使用 hasOwnProperty 判断对象 nextSource 中是否存在属性 nextKey
  // 过滤其原型链上的属性
  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
    // 赋值给对象 to,并在遍历结束后返回对象 to
    to[nextKey] = nextSource[nextKey]
  }
}
```

### 实现一个深拷贝

#### 第一步：简单实现

其实深拷贝可以拆分成 2 步，浅拷贝 + 递归，浅拷贝时判断属性值是否是对象，如果是对象就进行递归操作，两个一结合就实现了深拷贝。
我们可以写出简单浅拷贝代码如下。

```js
// 木易杨
function cloneShallow(source) {
  var target = {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key]
    }
  }
  return target
}
```

上面代码是浅拷贝实现，只要稍微改动下，加上是否是对象的判断并在相应的位置使用递归就可以实现简单深拷贝。

```js
// 木易杨
function cloneDeep1(source) {
  var target = {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = cloneDeep1(source[key]) // 注意这里
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

一个简单的深拷贝就完成了，但是这个实现还存在很多问题。

- 1、没有对传入参数进行校验，传入 `null` 时应该返回 `null` 而不是 `{}`
- 2、对于对象的判断逻辑不严谨，因为 `typeof null === 'object'`
- 3、没有考虑数组的兼容

#### 第二步：拷贝数组

我们来看下对于对象的判断，判断方案如下。

```js
// 木易杨
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
```

但是用在这里并不合适，因为我们要保留数组这种情况，所以这里使用 `typeof` 来处理。

```js
// 木易杨
typeof null //"object"
typeof {} //"object"
typeof [] //"object"
typeof function foo() {} //"function" (特殊情况)
```

改动过后的 `isObject` 判断逻辑如下。

```js
// 木易杨
function isObject(obj) {
  return typeof obj === 'object' && obj != null
}
```

所以兼容数组的写法如下。

```js
// 木易杨
function cloneDeep2(source) {
  if (!isObject(source)) return source // 非对象返回自身

  var target = Array.isArray(source) ? [] : {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep2(source[key]) // 注意这里
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

#### 第三步：循环引用

我们知道 `JSON` 无法深拷贝循环引用，遇到这种情况会抛出异常。

```js
// 木易杨
// 此处 a 是文章开始的测试用例
a.circleRef = a

JSON.parse(JSON.stringify(a))
// TypeError: Converting circular structure to JSON
```

**1、使用哈希表**

解决方案很简单，其实就是循环检测，我们设置一个数组或者哈希表存储已拷贝过的对象，当检测到当前对象已存在于哈希表中时，取出该值并返回即可。

```js
// 木易杨
function cloneDeep3(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source) // 新增代码，查哈希表

  var target = Array.isArray(source) ? [] : {}
  hash.set(source, target) // 新增代码，哈希表设值

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep3(source[key], hash) // 新增代码，传入哈希表
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

**2、使用数组**

这里使用了 `ES6` 中的 `WeakMap` 来处理，那在 `ES5` 下应该如何处理呢？

也很简单，使用数组来处理就好啦，代码如下。

```js
// 木易杨
function cloneDeep3(source, uniqueList) {
  if (!isObject(source)) return source
  if (!uniqueList) uniqueList = [] // 新增代码，初始化数组

  var target = Array.isArray(source) ? [] : {}

  // ============= 新增代码
  // 数据已经存在，返回保存的数据
  var uniqueData = find(uniqueList, source)
  if (uniqueData) {
    return uniqueData.target
  }

  // 数据不存在，保存源数据，以及对应的引用
  uniqueList.push({
    source: source,
    target: target
  })
  // =============

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep3(source[key], uniqueList) // 新增代码，传入数组
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

// 新增方法，用于查找
function find(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }
  return null
}

// 用上面测试用例已测试通过
```

现在已经很完美的解决了循环引用这种情况，那其实还是一种情况是引用丢失，我们看下面的例子。

```js
// 木易杨
var obj1 = {}
var obj2 = { a: obj1, b: obj1 }

obj2.a === obj2.b
// true

var obj3 = cloneDeep2(obj2)
obj3.a === obj3.b
// false
```

引用丢失在某些情况下是有问题的，比如上面的对象 `obj2`，`obj2` 的键值 `a` 和 `b` 同时引用了同一个对象 `obj1`，使用 `cloneDeep2` 进行深拷贝后就丢失了引用关系变成了两个不同的对象，那如何处理呢。

其实你有没有发现，我们的 `cloneDeep3` 已经解决了这个问题，因为只要存储已拷贝过的对象就可以了。

```js
// 木易杨
var obj3 = cloneDeep3(obj2)
obj3.a === obj3.b
// true
```

#### 第四步：拷贝 Symbol

这个时候可能要搞事情了，那我们能不能拷贝 `Symbol` 类型呢？

当然可以，不过 `Symbol` 在 `ES6` 下才有，我们需要一些方法来检测出 `Symbol` 类型。

```
方法一：Object.getOwnPropertySymbols(...)
方法二：Reflect.ownKeys(...)
```

对于方法一可以查找一个给定对象的符号属性时返回一个 `?symbol` 类型的数组。注意，每个初始化的对象都是没有自己的 `symbol` 属性的，因此这个数组可能为空，除非你已经在对象上设置了 `symbol` 属性。（来自 `MDN`）

```js
var obj = {}
var a = Symbol('a') // 创建新的symbol类型
var b = Symbol.for('b') // 从全局的symbol注册?表设置和取得symbol

obj[a] = 'localSymbol'
obj[b] = 'globalSymbol'

var objectSymbols = Object.getOwnPropertySymbols(obj)

console.log(objectSymbols.length) // 2
console.log(objectSymbols) // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0]) // Symbol(a)
```

对于方法二返回一个由目标对象自身的属性键组成的数组。它的返回值等同于 `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`。(来自 `MDN`)

```js
Reflect.ownKeys({ z: 3, y: 2, x: 1 }) // [ "z", "y", "x" ]
Reflect.ownKeys([]) // ["length"]

var sym = Symbol.for('comet')
var sym2 = Symbol.for('meteor')
var obj = {
  [sym]: 0,
  str: 0,
  '773': 0,
  '0': 0,
  [sym2]: 0,
  '-1': 0,
  '8': 0,
  'second str': 0
}
Reflect.ownKeys(obj)
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
// 注意顺序
// Indexes in numeric order,
// strings in insertion order,
// symbols in insertion order
```

**1、方法一**

思路就是先查找有没有 `Symbol` 属性，如果查找到则先遍历处理 `Symbol` 情况，然后再处理正常情况，多出来的逻辑就是下面的新增代码。

```js
// 木易杨
function cloneDeep4(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)

  // ============= 新增代码
  let symKeys = Object.getOwnPropertySymbols(source) // 查找
  if (symKeys.length) {
    // 查找成功
    symKeys.forEach(symKey => {
      if (isObject(source[symKey])) {
        target[symKey] = cloneDeep4(source[symKey], hash)
      } else {
        target[symKey] = source[symKey]
      }
    })
  }
  // =============

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep4(source[key], hash)
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

**2、方法二**

```js
// 木易杨
function cloneDeep4(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)

  Reflect.ownKeys(source).forEach(key => {
    // 改动
    if (isObject(source[key])) {
      target[key] = cloneDeep4(source[key], hash)
    } else {
      target[key] = source[key]
    }
  })
  return target
}

// 测试已通过
```

这里使用了 `Reflect.ownKeys()` 获取所有的键值，同时包括 `Symbol`，对 `source` 遍历赋值即可。

写到这里已经差不多了，我们再延伸下，对于 `target` 换一种写法，改动如下。

```js
// 木易杨
function cloneDeep4(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  let target = Array.isArray(source) ? [...source] : { ...source } // 改动 1
  hash.set(source, target)

  Reflect.ownKeys(target).forEach(key => {
    // 改动 2
    if (isObject(source[key])) {
      target[key] = cloneDeep4(source[key], hash)
    } else {
      target[key] = source[key]
    }
  })
  return target
}

// 测试已通过
```

在改动 1 中，返回一个新数组或者新对象，获取到源对象之后就可以如改动 2 所示传入 `target` 遍历赋值即可。

`Reflect.ownKeys()` 这种方式的问题在于不能深拷贝原型链上的数据，因为返回的是目标对象自身的属性键组成的数组。如果想深拷贝原型链上的数据怎么办，那用 `for..in` 就可以了。

我们再介绍下两个知识点，分别是构造字面量数组时使用展开语法和构造字面量对象时使用展开语法。（以下代码示例来源于 `MDN`）

**1、展开语法之字面量数组**

这是 `ES2015 （ES6）` 才有的语法，可以通过字面量方式, 构造新数组，而不再需要组合使用 `push`, `splice`, `concat` 等方法。

```js
var parts = ['shoulders', 'knees']
var lyrics = ['head', ...parts, 'and', 'toes']
// ["head", "shoulders", "knees", "and", "toes"]
```

这里的使用方法和参数列表的展开有点类似。

```js
function myFunction(v, w, x, y, z) {}
var args = [0, 1]
myFunction(-1, ...args, 2, ...[3])
```

返回的是新数组，对新数组修改之后不会影响到旧数组，类似于 `arr.slice()`。

```js
var arr = [1, 2, 3]
var arr2 = [...arr] // like arr.slice()
arr2.push(4)

// arr2 此时变成 [1, 2, 3, 4]
// arr 不受影响
```

展开语法和 `Object.assign()` 行为一致, 执行的都是浅拷贝（即只遍历一层）。

```js
var a = [[1], [2], [3]]
var b = [...a]
b.shift().shift() // 1
// [[], [2], [3]]
```

这里 `a` 是多层数组，`b` 只拷贝了第一层，对于第二层依旧和 `a` 持有同一个地址，所以对 `b` 的修改会影响到 `a`。

**2、展开语法之字面量对象**

这是 `ES2018` 才有的语法，将已有对象的所有可枚举属性拷贝到新构造的对象中，类似于 `Object.assign()` 方法。

```js
var obj1 = { foo: 'bar', x: 42 }
var obj2 = { foo: 'baz', y: 13 }

var clonedObj = { ...obj1 }
// { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 }
// { foo: "baz", x: 42, y: 13 }
```

`Object.assign()` 函数会触发 `setters`，而展开语法不会。有时候不能替换或者模拟 `Object.assign()` 函数，因为会得到意想不到的结果，如下所示。

```js
var obj1 = { foo: 'bar', x: 42 }
var obj2 = { foo: 'baz', y: 13 }
const merge = (...objects) => ({ ...objects })

var mergedObj = merge(obj1, obj2)
// { 0: { foo: 'bar', x: 42 }, 1: { foo: 'baz', y: 13 } }

var mergedObj = merge({}, obj1, obj2)
// { 0: {}, 1: { foo: 'bar', x: 42 }, 2: { foo: 'baz', y: 13 } }
```

这里实际上是将多个解构变为剩余参数（ `rest` ），然后再将剩余参数展开为字面量对象.

#### 第五步：破解递归爆栈

上面四步使用的都是递归方法，但是有一个问题在于会爆栈，错误提示如下。

```js
// RangeError: Maximum call stack size exceeded
```

那应该如何解决呢？其实我们使用循环就可以了，代码如下。

```js
function cloneDeep5(x) {
  const root = {}

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }

  return root
}
```

由于篇幅问题就不过多介绍了，详情请参考下面这篇文章。

[深拷贝的终极探索（99%的人都不知道）](https://segmentfault.com/a/1190000016672263)

## 高阶函数
### 箭头函数
箭头函数表达式的语法比函数表达式更短，并且没有自己的this，arguments，super或 new.target。这些函数表达式更适用于那些本来需要匿名函数的地方，并且它们不能用作构造函数。

引入箭头函数有两个方面的作用：更简短的函数并且不绑定this。

由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this---译者注），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立---译者注）

箭头函数不能用作构造器，和 new一起用会抛出错误。

箭头函数没有prototype属性。

yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作生成器。


## 事件机制
## Event Loop原理
`Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

在`JavaScript`中，任务被分为两种，一种宏任务（`MacroTask`）也叫`Task`，一种叫微任务（`MicroTask`）。




## 原型 Prototype

![prototype](https://camo.githubusercontent.com/71cab2efcf6fb8401a2f0ef49443dd94bffc1373/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f31332f313632316538613962636230383732643f773d34383826683d35393026663d706e6726733d313531373232)

每个函数都有 `prototype` 属性，除了 `Function.prototype.bind()`，该属性指向原型。

每个对象都有 `__proto__` 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 `[[prototype]]`，但是 `[[prototype]]` 是内部属性，我们并不能访问到，所以使用 `_proto_` 来访问。

对象可以通过 `__proto__` 来寻找不属于该对象的属性，`__proto__` 将对象连接起来组成了原型链。

如果你想更进一步的了解原型，可以仔细阅读 [深度解析原型中的各个难点](https://github.com/KieSun/Blog/issues/2)。

## new 原理

1. 新生成了一个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象

在调用 `new` 的过程中会发生以上四件事情，我们也可以试着来自己实现一个 `new`

```js
function create() {
    // 创建一个空的对象
    let obj = new Object()
    // 获得构造函数
    let Con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
}
```

对于实例对象来说，都是通过 `new` 产生的，无论是 `function Foo()` 还是 `let a = { b : 1 }` 。

对于创建一个对象来说，更推荐使用字面量的方式创建对象（无论性能上还是可读性）。因为你使用 `new Object()` 的方式创建对象需要通过作用域链一层层找到 `Object`，但是你使用字面量的方式就没这个问题。

```js
function Foo() {}
// function 就是个语法糖
// 内部等同于 new Function()
let a = { b: 1 }
// 这个字面量内部也是使用了 new Object()
```
对于 `new` 来说，还需要注意下运算符优先级。

```js
function Foo() {
    return this;
}
Foo.getName = function () {
    console.log('1');
};
Foo.prototype.getName = function () {
    console.log('2');
};

new Foo.getName();   // -> 1
new Foo().getName(); // -> 2       
```

![](https://user-gold-cdn.xitu.io/2018/4/9/162a9c56c838aa88?w=2100&h=540&f=png&s=127506)

从上图可以看出，`new Foo() ` 的优先级大于 `new Foo` ，所以对于上述代码来说可以这样划分执行顺序

```js
new (Foo.getName());   
(new Foo()).getName();
```

对于第一个函数来说，先执行了 `Foo.getName()` ，所以结果为 1；对于后者来说，先执行 `new Foo()` 产生了一个实例，然后通过原型链找到了 `Foo` 上的 `getName` 函数，所以结果为 2。

## Promise 原理

`Promise` 是 `ES6` 新增的语法，解决了回调地狱的问题。

可以把 `Promise` 看成一个状态机。初始是 `pending` 状态，可以通过函数 `resolve` 和 `reject` ，将状态转变为 `resolved` 或者 `rejected` 状态，状态一旦改变就不能再次变化。

`then` 函数会返回一个 `Promise` 实例，并且该返回值是一个新的实例而不是之前的实例。因为 `Promise` 规范规定除了 `pending` 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，多个 `then` 调用就失去意义了。

对于 `then` 来说，本质上可以把它看成是 `flatMap`

```js
// 三种状态
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
// promise 接收一个函数参数，该函数会立即执行
function MyPromise(fn) {
  let _this = this
  _this.currentState = PENDING
  _this.value = undefined
  // 用于保存 then 中的回调，只有当 promise
  // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = []
  _this.rejectedCallbacks = []

  _this.resolve = function(value) {
    if (value instanceof MyPromise) {
      // 如果 value 是个 Promise，递归执行
      return value.then(_this.resolve, _this.reject)
    }
    setTimeout(() => {
      // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED
        _this.value = value
        _this.resolvedCallbacks.forEach(cb => cb())
      }
    })
  }

  _this.reject = function(reason) {
    setTimeout(() => {
      // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED
        _this.value = reason
        _this.rejectedCallbacks.forEach(cb => cb())
      }
    })
  }
  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try {
    fn(_this.resolve, _this.reject)
  } catch (e) {
    _this.reject(e)
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  var self = this
  // 规范 2.2.7，then 必须返回一个新的 promise
  var promise2
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === 'function' ? onResolved : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : r => throw r

  if (self.currentState === RESOLVED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      // 所以用了 setTimeout 包裹下
      setTimeout(function() {
        try {
          var x = onResolved(self.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }))
  }

  if (self.currentState === REJECTED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(function() {
        // 异步执行onRejected
        try {
          var x = onRejected(self.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }))
  }

  if (self.currentState === PENDING) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      self.resolvedCallbacks.push(function() {
        // 考虑到可能会有报错，所以使用 try/catch 包裹
        try {
          var x = onResolved(self.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })

      self.rejectedCallbacks.push(function() {
        try {
          var x = onRejected(self.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })
    }))
  }
}
// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError('Error'))
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then(function(value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      let then = x.then
      // 如果 then 是函数，调用 x.then
      if (typeof then === 'function') {
        // 规范 2.3.3.3
        then.call(
          x,
          y => {
            if (called) return
            called = true
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject)
          },
          e => {
            if (called) return
            called = true
            reject(e)
          }
        )
      } else {
        // 规范 2.3.3.4
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x)
  }
}
```

以上就是根据 Promise / A+ 规范来实现的代码，可以通过 `promises-aplus-tests` 的完整测试

![](https://user-gold-cdn.xitu.io/2018/3/29/162715e8e37e689d?w=1164&h=636&f=png&s=300285)

## Async/Await 原理

一个函数如果加上 `async` ，那么该函数就会返回一个 `Promise`

```js
async function test() {
  return '1'
}
console.log(test()) // -> Promise {<resolved>: "1"}
```

可以把 `async` 看成将函数返回值使用 `Promise.resolve()` 包裹了下。

`await` 只能在 `async` 函数中使用

```js
function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('finish')
      resolve('sleep')
    }, 2000)
  })
}
async function test() {
  let value = await sleep()
  console.log('object')
}
test()
```

上面代码会先打印 `finish` 然后再打印 `object` 。因为 `await` 会等待 `sleep` 函数 `resolve` ，所以即使后面是同步代码，也不会先去执行同步代码再来执行异步代码。

`async 和 await` 相比直接使用 `Promise` 来说，优势在于处理 `then` 的调用链，能够更清晰准确的写出代码。缺点在于滥用 `await` 可能会导致性能问题，因为 `await` 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性。

下面来看一个使用 `await` 的代码。

```js
var a = 0
var b = async () => {
  a = a + (await 10)
  console.log('2', a) // -> '2' 10
  a = (await 10) + a
  console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，这里说明下原理

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为在 `await` 内部实现了 `generators` ，`generators` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来
- 因为 `await` 是异步操作，遇到`await`就会立即返回一个`pending`状态的`Promise`对象，暂时返回执行代码的控制权，使得函数外的代码得以继续执行，所以会先执行 `console.log('1', a)`
- 这时候同步代码执行完毕，开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 10`
- 然后后面就是常规执行代码了

## call, apply, bind 区别

首先说下前两者的区别。

`call` 和 `apply` 都是为了解决改变 `this` 的指向。作用都是相同的，只是传参的方式不同。

除了第一个参数外，`call` 可以接收一个参数列表，`apply` 只接受一个参数数组。

```js
let a = {
  value: 1
}
function getValue(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}
getValue.call(a, 'yck', '24')
getValue.apply(a, ['yck', '24'])
```

### 模拟实现 call 和 apply

可以从以下几点来考虑如何实现

- 不传入第一个参数，那么默认为 `window`
- 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```js
Function.prototype.myCall = function(context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}
```

以上就是 `call` 的思路，`apply` 的实现也类似

```js
Function.prototype.myApply = function(context) {
  var context = context || window
  context.fn = this

  var result
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}
```

### 模拟实现 bind

`bind` 和其他两个方法作用也是一致的，只是该方法会返回一个函数。并且我们可以通过 `bind` 实现柯里化。

同样的，也来模拟实现下 `bind`

```js
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

## 防抖/节流原理

### 实现一个防抖函数

你是否在日常开发中遇到一个问题，在滚动事件中需要做个复杂计算或者实现一个按钮的防二次点击操作。

这些需求都可以通过函数防抖动来实现。尤其是第一个需求，如果在频繁的事件回调中做复杂计算，很有可能导致页面卡顿，不如将多次计算合并为一次计算，只在一个精确点做操作。

PS：防抖和节流的作用都是防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于 wait，防抖的情况下只会调用一次，而节流的 情况会每隔一定时间（参数 wait）调用函数。

我们先来看一个袖珍版的防抖理解一下防抖的实现：

```js
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
// 不难看出如果用户调用该函数的间隔小于wait的情况下，上一次的时间还未到就被清除了，并不会执行函数
```

这是一个简单版的防抖，但是有缺陷，这个防抖只能在最后调用。一般的防抖会有 immediate 选项，表示是否立即调用。这两者的区别，举个栗子来说：

- 例如在搜索引擎搜索问题的时候，我们当然是希望用户输入完最后一个字才调用查询接口，这个时候适用`延迟执行`的防抖函数，它总是在一连串（间隔小于 wait 的）函数触发之后调用。
- 例如用户给 interviewMap 点 star 的时候，我们希望用户点第一下的时候就去调用接口，并且成功之后改变 star 按钮的样子，用户就可以立马得到反馈是否 star 成功了，这个情况适用`立即执行`的防抖函数，它总是在第一次调用，并且下一次调用必须与前一次调用的时间间隔大于 wait 才会触发。

下面我们来实现一个带有立即执行选项的防抖函数

```js
// 这个是用来获取当前时间戳的
function now() {
  return +new Date()
}
/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () =>
    setTimeout(() => {
      // 延迟函数执行完毕，清空缓存的定时器序号
      timer = null
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

整体函数实现的不难，总结一下。

- 对于按钮防点击来说的实现：如果函数是立即执行的，就立即调用，如果函数是延迟执行的，就缓存上下文和参数，放到延迟函数中去执行。一旦我开始一个定时器，只要我定时器还在，你每次点击我都重新计时。一旦你点累了，定时器时间到，定时器重置为 `null`，就可以再次点击了。
- 对于延时执行函数来说的实现：清除定时器 ID，如果是延迟调用就调用函数

### 实现一个节流函数

防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

```js
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
  var context, args, result
  var timeout = null
  // 之前的时间戳
  var previous = 0
  // 如果 options 没传则设为空对象
  if (!options) options = {}
  // 定时器回调函数
  var later = function() {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : _.now()
    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    // 获得当前时间戳
    var now = _.now()
    // 首次进入前者肯定为 true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if (!previous && options.leading === false) previous = now
    // 计算剩余时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的，因为定时器的延时
    // 并不是准确的时间，很可能你设置了2秒
    // 但是他需要2.2秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
```

## 模块化详解

在有 Babel 的情况下，我们可以直接使用 ES6 的模块化

```js
// file a.js
export function a() {}
export function b() {}
// file b.js
export default function() {}

import { a, b } from './a.js'
import XXX from './b.js'
```

### CommonJS

`CommonJs` 是 Node 独有的规范，浏览器中使用就需要用到 `Browserify` 解析了。

```js
// a.js
module.exports = {
  a: 1
}
// or
exports.a = 1

// b.js
var module = require('./a.js')
module.a // -> log 1
```

在上述代码中，`module.exports` 和 `exports` 很容易混淆，让我们来看看大致内部实现

```js
var module = require('./a.js')
module.a
// 这里其实就是包装了一层立即执行函数，这样就不会污染全局变量了，
// 重要的是 module 这里，module 是 Node 独有的一个变量
module.exports = {
  a: 1
}
// 基本实现
var module = {
  exports: {} // exports 就是个空对象
}
// 这个是为什么 exports 和 module.exports 用法相似的原因
var exports = module.exports
var load = function(module) {
  // 导出的东西
  var a = 1
  module.exports = a
  return module.exports
}
```

再来说说 `module.exports` 和 `exports`，用法其实是相似的，但是不能对 `exports` 直接赋值，不会有任何效果。

对于 `CommonJS` 和 ES6 中的模块化的两者区别是：

- 前者支持动态导入，也就是 `require(${path}/xx.js)`，后者目前不支持，但是已有提案
- 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响

- 前者在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
- 后者会编译成 `require/exports` 来执行的

### AMD

AMD 是由 `RequireJS` 提出的

```js
// AMD
define(['./a', './b'], function(a, b) {
  a.do()
  b.do()
})
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  var b = require('./b')
  b.doSomething()
})
```
