# 面试重点

## 浏览器渲染机制

1. HTML和CSS经过各自解析，生成DOM树和CSSOM树；
2. 合并成为渲染树 rendertree；
3. 根据渲染树进行布局layout；
4. 最后调用GPU进行绘制，显示在屏幕上paint。

## GPU加速

优点：使用transform、opacity、filters等属性时，会直接在GPU中完成处理，这些属性的变化不会引起回流重绘；
缺点：GPU渲染字体会导致字体模糊，过多的GPU处理会导致内存问题。

## H5C3新特性

H5

①新增多媒体标签	②新增语义化标签	③新增表单控件	④新增表单属性	⑤新增利用`JS`绘图的画布元素	⑥WEB存储	⑦DOM扩展（获取DOM的方式）	⑧自定义属性dataset等；

C3

①新增选择器	②过渡，转换（`2D/3D`），动画 	③边框(边框圆角，边框图片)	④颜色(`rgba`)	⑤背景(`bgs`)	⑥盒子阴影	⑦文字(文字阴影，单行文本省略)	⑧盒模型(标准，怪异)	⑨媒体查询(media) 	⑩flex弹性布局等。

## 动画

```js
/* animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 起始与结束状态 */
animation: name duration timing-function delay iteration-count direction fill-mode
animation-play-state: paused;
```

## 使一个盒子水平垂直居中

①利用子绝父相和transform里面的translate ;

②利用flex弹性布局 ;

③父盒子利用display：table-cell，vertical-align，text-align，子盒子转行内块。(父盒子有固定的宽高)

## flex布局

父元素属性:

`justify-content:`定义了子元素在主轴上的对齐方式；

`align-items:`定义了定义项目在次轴上对齐方式；

`flex-direction:`定义主轴方向；

`flex-wrap:`定义换行方式；

`flex-flow:`flex-direction和flex-wrap复合写法；

`align-content:`定义多根轴线的对齐方式。

子元素属性

`flex: flex-grow  flex-shrink  flex-basis   0 1 auto`;

`order:`定义项目的排列顺序。数值越小，排列越靠前，默认为0;

`align-self:`定义单个子元素的排列方式。

## 什么是BFC

BFC全称 `Block Formatting Context`即`块级格式上下文`，简单的说，BFC是页面上的一个隔离的独立容器(渲染控件)，不受外界干扰或干扰外界。

**如何触发BFC**

- `float`不为 none；
- `overflow`的值不为 visible；
- `position` 为 absolute 或 fixed；
- `display`的值为 inline-block 或 table-cell 或 table-caption 或 grid；

**BFC的应用场景**

- **清除浮动**：BFC内部的浮动元素会参与高度计算，因此可用于清除浮动，防止高度塌陷；
- **避免某元素被浮动元素覆盖**：BFC的区域不会与浮动元素的区域重叠；
- **阻止外边距重叠**：属于同一个BFC的两个相邻Box的margin会发生折叠，不同BFC不会发生折叠。

## viewport视口

- width/height，宽高，默认宽度980px；
- initial-scale，初始缩放比例，1~10；
- maximum-scale/minimum-scale，允许用户缩放的最大/小比例；
- user-scalable，用户是否可以缩放 (yes/no)；

## 数组的方法和拓展

**数组判断**

arr  instanceof Array

Array.from()

**增删**

push()末尾添加数组元素，返回新数组长度;

unshift()头部添加数组元素，返回新数组长度;

pop()删除末尾数组元素，返回删除的数组元素;

shift()删除头部数组元素，返回删除的数组元素;

**排序**

arr.sort()

arr.reserve()

**迭代**

arr.forEach()

arr.map()

arr.filter()

arr.some和arr.every()

arr.find()

arr.findIndex()

arr.inclides()

arr.float()

arr.reduce()

**索引**

arr.indexOf()

arr.lastIndexOf()

**转字符串**

toString()

arr.join()

**其他方法**

concat()合并  返回一个新数组

slice(start，end)截取  返回截取的数组

splice(index，howmany，item)删除添加  返回截取的数组

## 字符串方法和拓展

**索引**

string.indexOf()

string.lastIndexOf()

**位置**

charAt(index)

chaCodeAt(index)

str[index]

**转数组**

string.split('分隔符')

**其他方法**

concat()拼接字符串

slice(start，end)截取字符串

substring(start，end)-----slice

subsrt(start，length)-----splice

str.replace(old，new)

str.startsWith(str，index)

str.endsWith(str，index)

str.repeat(number)

str.padStart()

str.padEnd()

模板字符串

## ES6性特性

1.let 和 const关键字；

2.解构赋值；

3.展开运算符；

4.set和map及其属性和方法；

5.函数拓展---箭头函数；

6.数组和字符串拓展。

## 原型链

每个函数都有个prototype属性，它指向函数的原型对象;每个对象都有个`__prototype__`属性，它指向构造函数的原型对象，所以当想要访问实例对象上的某个属性或方法时，首先会去对象本身上去找，如果找不到会向上去原型对象上找，直到找不到为止，就这样形成一个链状结构叫做原型链。

## ES5和ES6继承

ES5-----原型链继承，构造函数继承，组合式继承，寄生式组合继承

1.子构造函数通过call方法继承父构造函数中的属性 `Father.call(this,arg1,arg2)`

2.子构造函数继承父构造函数中的方法 `Son.prototype = new Father()  Son.prototype.constructor = Son`

ES6

extends关键字继承父类的属性和方法
super关键字调用父类的构造函数和方法

## 函数调用和this指向

1.普通函数(当做是全局对象window的方法)  this指向window
2.对象方法  this指向方法所属对象
3.构造函数  this指向实例对象
4.DOM事件  事件对象
5.定时器    window的方法  this指向window
6.立即执行函数  this指向window

函数模式  window

方法模式  方法调用者

构造器模式  实例对象

call，apply，bind、

箭头函数

## new关键字

```js
function myNew(callback, ...arg) {
             //对应第一个操作：创建一个空的简单JavaScript对象
            const obj = {} 
            //第二步：链接该对象
            obj.__proto__ = callback.prototype
            //第三步：将步骤1新创建的对象作为this的上下文
            callback.apply(obj, arg)
            //第四步：返回该对象
            return obj
}
```

1.创建一个新对象，并继承其构造函数的prototype，是为了继承够着函数上的属性和方法；obj.`__proto__ `= Foo.prototype

2.执行构造函数，方法内的this指定为该新实例；Foo.call（obj，...arg）

3.返回新实例。return obj

## 快排

```js
function quickSort(arr) {
    if(arr.length <= 1) return arr          //递归终止条件
    const pivot = arr.length / 2 | 0        //基准点
    const pivotValue = arr.splice(pivot, 1)[0]
    const leftArr = []
    const rightArr = []
    arr.forEach(val => {
        val > pivotValue ? rightArr.push(val) : leftArr.push(val)
    })
    return [ ...quickSort(leftArr), pivotValue, ...quickSort(rightArr)]
}
```

## 防抖和节流

防抖是延迟执行，而节流是间隔执行

```js
function debounce(func, wait) {
    let timer = null
    return function() {
        let that = this
        let args = arguments
        if (timer) clearTimeout(timer)
        timeout = setTimeout(() => {
            func.apply(that, args)
        }, wait)
    }
}
```

```js
function throttle(func, wait) {
    let timer = null
    return function() {
        let that = this
        let args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                func.apply(that, args)
            }, wait)
        }
    }
}
```

## GET请求和POST请求有何区别

- GET请求参数放在URL上，POST请求参数放在请求体里；
- POST请求相较于GET请求安全一点点，因为GET请求的参数在URL上，且有历史记录；
- GET请求参数长度有限制，POST请求参数长度可以非常大；
- GET请求能缓存，POST不能。

## 缓存策略

**强缓存(不要向服务器询问的缓存)**

设置Expires

设置Cache-Control

**协商缓存(需要向服务器询问缓存是否已经过期)**

Etag

## 常见HTTP状态码

2xx 开头（请求成功）

3xx 开头（重定向）301永久重定向 302临时重定向

4xx 开头（客户端错误）

5xx 开头（服务端错误）

## HTTP和HTTPS有何区别

- HTTPS使用443端口，而HTTP使用80；
- HTTPS需要申请证书；
- HTTP是超文本传输协议，是明文传输；HTTPS是经过SSL加密的协议，传输更安全；
- HTTPS比HTTP慢，因为HTTPS除了TCP握手的三个包，还要加上SSL握手的九个包。



## 前端安全

XSS攻击：

- 输入检查：对输入内容中的`<script><iframe>`等标签进行转义或者过滤-----成熟的转义库；
- 设置httpOnly：很多XSS攻击目标都是窃取用户cookie伪造身份认证，设置此属性可防止JS获取cookie；
- 开启CSP，即开启白名单，可阻止白名单以外的资源加载和运行。

CSRF攻击：

- 验证Token：浏览器请求服务器时，服务器返回一个token，每个请求都需要同时带上token和cookie才会被认为是合法请求；
- 验证Referer：通过验证请求头的Referer来验证来源站点，但请求头很容易伪造；
- 设置SameSite：设置cookie的SameSite，可以让cookie不随跨域请求发出，但浏览器兼容不一。

## MVVM

MVVM 是 Model-View-ViewModel 缩写，也就是把 MVC 中的 Controller 演变成 ViewModel。Model 层代表数据模型，View 代表视图层。

ViewModel 是 View 和 Model 层的桥梁，数据会绑定到 viewModel 层并自动将数据渲染到页面中，视图变化的时候会通知 viewModel 层更新数据。

## vue响应式数据原理

Vue 在初始化数据时，会使用 Object.defineProperty 重新定义 data 中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的 watcher)，如果属性发生变化会通知相关依赖进行更新操作(发布订阅)。

`Vue2.0`的响应式

核心:

对象：通过`defineProperty`对对象已有属性值的读取和修改进行劫持；

数组：通过重写数组**更新数组的一系列更新元素的方法**来实现元素修改的劫持；

问题：

对象直接添加的属性或者删除已有属性，界面不会自动更新

直接通过下标替换元素或更新length，界面不会自动更新arr[1]={}

所以`vue2.0`提供了$set方法

`Vue3.0`的响应式

通过proxy代理**拦截**对data任意属性的任意操作

通过reflect反射**动态**对被代理对象的相应属性进行特定的操作

## nextTick实现原理是

**在下次 DOM 更新循环结束之后执行延迟回调**。nextTick 主要使用了宏任务和微任务。

## **Vue 中组件生命周期调用顺序说一下**

组件的**调用顺序**都是先父后子，**渲染完成**的顺序是先子后父。

组件的**销毁操作**是先父后子，**销毁完成**的顺序是先子后父。

**加载渲染过程**

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount- >子 mounted->父 mounted

**子组件更新过程**

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

**父组件更新过程**

父 beforeUpdate -> 父 updated

**销毁过程**

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

## 虚拟DOM和diff算法

在浏览器中操作 DOM 是很昂贵的，频繁的操作 DOM，会产生一定的性能问题。虚拟DOM减少不必要的DOM操作，优化DOM操作的次数，借助 `diff`算法可以减少`dom`操作的范围；

虚拟DOM本身就是一个包含真实DOM节点信息的`JS`对象，DOM如何变为虚拟DOM属于模板编译原理-----mustache，vue里虚拟DOM的实现它借鉴的了开源库snabbdom的实现。

VDOM映射到真实 DOM 要经历 VNode 的h、diff、patch 等阶段。

**1.渲染函数（h函数）产生虚拟DOM？**

**创建虚拟节点**

h函数是用来产生虚拟节点（vnode） 

<!-- ![1615110416449](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1615110416449.png) -->

<!-- ![1615110445063](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1615110445063.png) -->

<!-- ![1615110780890](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1615110780890.png) -->

**h函数嵌套使用可以得到VDOM树**

**创建patch函数-----修补，用于服务虚拟节点上树**

<!-- ![1615110823448](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1615110823448.png)

![1615110850554](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1615110850554.png) -->

2.diff算法原理

**patch函数被调用**

<!-- ![1615112917500](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1615112917500.png) -->

执行方式：**patchVbode（）**函数，整体策略：深度优先，同层比较；

高效性：**updateChildren（）**进行4次尝试，再借助key找到可复用的节点，key 的作用是尽可能的复用 DOM 元素。

someNode（sel和key）：只有同一个vnode，才进行精细化比较，否则暴力删除；只进行同层比较，不进行跨层比较，暴力拆除。

**Vue2 的核心 Diff 算法采用了双端比较的算法，同时从新旧 children 的两端开始进行比较，借助 key 值找到可复用的节点，再进行相关操作。Vue3在借鉴一些算法的基础上较Vue2有了提升。**

diff算法是发生在虚拟DOM上，对新旧虚拟DOM进行精细化比对，算出应该如何最小更新，最后映射到真的DOM上；

## `Vue`组件间6种通信方式

1.父子组件传值 props和$emit('event',value)；

2.事件总线(事件中心)：通过一个空的`Vue`实例作为中央事件总线（事件中心），用它来触发事件和监听事件；

```shell
var Event=new Vue();
Event.$emit('event',data);
Event.$on('event',data => {});
Event.$off('event');
```

3.`vuex`

4.provide/inject：**依赖和注入，祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量**。主要在开发**高阶插件/组件库**时使用，并不推荐用于普通应用程序代码中。

**provide 和 inject 绑定并不是可响应的**。祖先组件数据改变，子孙组件是不改变的。

解决办法：

①provide 祖先组件的实例，但这个实例上会挂载很多没有必要的东西；

②使用 2.6 最新 `API Vue.observable`优化响应式 provide(推荐)。

```shell
provide() {
	this.theme = Vue.observable({
 	color: "blue"
});
	return {
	theme: this.theme
	};
},
```

5.$parents/$children和$ref：**直接得到组件实例**，使用后可以直接调用组件的方法或访问数据；这种方法主要目的是作为访问组件的**应急方法**，更推荐用 props 和 $emit 实现父子组件通信；

6.`$attrs`/`$listeners`：**实现多级嵌套组件(隔代)通信**，通常使用的方法是通过`vuex`，如果仅仅是传递数据，而不做中间处理，使用 `vuex` 处理，就有有点大材小用；`Vue2.4` 版本提供了另一种方法-`$attrs/$listeners`

**默认情况下父作用域不被认作props的属性会作为普通的HTML特性应用在子组件的根元素上**；

在2.4中新增选项`inheritAttrs`  `inheritAttrs`的默认值为true，将`inheritAttrs`的值设为false，这些默认的行为会禁止掉。但是通过实例属性`$attrs` ，不仅可以将这些特性生效，且可以通过v-bind 绑定到子组件的非根元素上。

**通俗的理解为：子辈可以通过`$attrs`将未在自己组件内注册的祖辈传递下来的参数接收来，并传递孙辈。**

```html
<template>
   <div>
     <child-dom
      :foo="foo"
      :coo="foo"
     >
     </child-dom>
   </div>
</template>
<script>
   import childDom from "./ChildDom.vue";
   export default {
     data() {
        return {
          foo:"Hello, world",
          coo:"Hello,rui"
        }
     },
     components:{childDom},
   }
</script>

子组件child-dom代码如下
<template>
   <div>
      <p>foo:{{foo}}</p>
   </div>
</template>
<script>
export default {
 name:'child-dom'
 props:["foo"]
}
</script>
```

我们在b组件上 绑定 v-on=”$listeners”, 在a组件中，监听c组件触发的事件。就能把c组件发出的数据，传递给a组件。

```
a：@upRocket="reciveRocket"
```

```
b：
<childDomChild v-bind="$attrs" v-on="$listeners"></childDomChild>
```

```shell
c：
startUpRocket(){
this.$emit("upRocket");
}
```

## hash 路由和 history 路由实现原理

location.hash 的值实际就是 URL 中#后面的东西。

history 实际采用了 H5 中提供的 API 来实现，主要有 **history.pushState()**和 **history.replaceState()**。

## 服务端渲染SSR和nuxt框架

SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端，服务器会有更大的负载需求。

SSR 有着更好的 SEO、并且首屏加载速度更快等优点。不过它也有一些缺点，比如我们的开发条件会受到限制，

服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，

服务端渲染应用程序也需要处于 Node.js 的运行环境。

## Vue性能优化

**编码阶段**

路由懒加载

防抖、节流

第三方模块按需导入

图片懒加载

keep-alive 缓存组件

在更多的情况下，使用 v-if 替代 v-show

开发智能事件处理程序-----事件委托

精简js和css

**打包优化**

在 webpack 设置 externals 选项，可以忽略不需要打包的库，使用 CDN（内容分发网络）

使用 gzip 压缩文件

配置Expires 或 Cache-Control或ETags优化缓存

## WebPack配置---vue-cli脚手架的官网配置模块

**vue inspect**

1.vue-cli3.x开始默认是没有webpack的配置文件，我们在vue里面是通过vue.config.js配置项目webpack;

2.配置跨域是在deserve节点，具体配置项根据webpack相关文档；

3.打包前端项目上线的时候，服务器放了多个网站，会有多个基地址，打包的时候需要单独配置publicPath这个目录，解决一些项目本地跑可以，上线打包出现资源文件404问题。

4.configureWebpack配置externals，配置别名等；

5.chanwebpack配置一些webpack的插件以及一些loader

chainWebpack-----配置开发和发布模式

**我们项目里面写webpack，一般是找个模板，再根据webpack官网和vue-cli官网结合起来进行模块配置。**

**如何启动HRM**

1. 使用了`new webpack.HotModuleReplacementPlugin()`;
2. 设置`devServer`选项中的`hot`字段为`true`;
3. 配置相关loader文件。

## 项目难点

### 埋点

前端埋点： 是一种手段，它的目的是上报相关行为数据，相关人员以数据为依据来分析产品在用户端的使用情况，根据分析出来的结果辅助产品优化、迭代。



方案：

手动代理埋点：用户触发某个动作后手动上报数据；（发送埋点请求）

优点：是最准确的，可以满足很多定制化的需求；

缺点：埋点逻辑与业务代码耦合到一起，不利于代码维护和复用。

命令式埋点和声明式埋点:

命令式埋点：在一些事件操作的回调函数中进行埋点。

声明式埋点：将埋点信息封装在自定义属性中，通过`sdk`识别自定义属性然后获取埋点数据。自定义指令实现埋点数据统计。



可视化埋点（无痕埋点）：通过可视化工具配置采集节点，指定自己想要监测的元素和属性，业界比较有名的是 `Mixpanel`;

优点：可以做到按需配置，又不会像全埋点那样产生大量的无用数据；
缺点：比较难加载一些运行时参数；页面结构发生变化的时候，可能就需要进行部分重新配置。



无埋点：也叫“全埋点”，前端自动采集全部事件并上报埋点数据，在后端数据计算时过滤出有用数据；

优点：收集用户的所有端上行为，很全面；
缺点：无效的数据很多、上报数据量大。

## HTTP/2.0新特性

多路复用： 即多个请求都通过一个TCP连接并发地完成；
服务端推送： 服务端能够主动把资源推送给客户端；
新的二进制格式： HTTP/2采用二进制格式传输数据，相比于HTTP/1.1的文本格式，二进制格式具有更好的解析性和拓展性；
header压缩： HTTP/2压缩消息头，减少了传输数据的大小。

## HTTP/3.0

HTTP/2在UDP的基础上实现多路复用、0-RTT、TLS加密、流量控制、丢包重传等功能。