# DOM "文档对象模型"
**DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）** 它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。DOM 操作是 JavaScript 最常见的任务，离开了 DOM，JavaScript 就无法控制网页。**JavaScript 也是最常用于 DOM 操作的语言**。



## 节点
**DOM 的最小组成单位叫做节点（node）** 文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。
**节点的类型有七种**
1. `Document`：整个文档树的顶层节点
2. `DocumentType`：`doctype`标签（比如`<!DOCTYPE html>`）
3. `Element`：网页的各种HTML标签（比如`<body>`、`<a>`等）
4. `Attr`：网页元素的属性（比如`class="box"`）
5. `Text`：标签之间或标签包含的文本
6. `Comment`：注释
7. `DocumentFragment`：文档的片段

浏览器提供一个原生的节点对象Node，上面这七种节点都继承了Node，因此具有一些共同的属性和方法。




## 节点树
一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 `DOM 树`。

浏览器原生提供`document`节点，代表整个文档。

文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 HTML 网页的顶层容器标签`<html>`。后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。
1. 父节点关系（`parentNode`）：直接的那个上级节点
2. 子节点关系（`childNodes`）：直接的下级节点
3. 同级节点关系（`sibling`）：拥有同一个父节点的节点

DOM 提供操作接口，用来获取这三种关系的节点
1. 获取第一个子节点 `firstChild`
2. 获取最后一个子节点 `lastChild`
3. 获取紧邻在后的一个同级节点 `nextSibling`
4. 获取紧邻在前的一个同级节点 `previousSibling`



## 节点接口 (Node接口)
### 节点属性
1. `Node.prototype.nodeType `

`nodeType`属性返回一个整数值,表示节点的类型.
```js
document.nodeType // 9
```

2. `Node.prototype.nodeName`

`nodeType`属性返回节点名称.
```js
// <div id="d1">hello world</div>
var div = document.getElementById('box');
div.nodeName // "DIV"
```
上面代码中，元素节点`<div>`的`nodeName`属性就是大写的标签名`DIV`。

- 2.1. 不同节点的`nodeName`属性值如下

- 2.2. 文档节点（document）：`#document`

- 2.3. 元素节点（element）：大写的标签名,例如`DIV`

- 2.4. 属性节点（attr）：属性的名称

- 2.5. 文本节点（text）：`#text`

- 2.6. 文档片断节点（DocumentFragment）：`#document-fragment`

- 2.7. 文档类型节点（DocumentType）：文档的类型

- 2.8. 注释节点（Comment）：`#comment`

3. `Node.prototype.nodeValue`

`nodeValue`属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。
```js
// <div id="d1">hello world</div>
var div = document.getElementById('d1');
div.nodeValue // null
div.firstChild.nodeValue // "hello world"
```

4. `Node.prototype.textContent`

`textContent`属性返回当前节点和它的所有后代节点的文本内容。
```js
// <div id="box-a">This is <span>some</span> text</div>
document.getElementById('box-a').textContent;
// This is some text
```
如果要读取整个文档的内容，可以使用`document.documentElement.textContent`。

5. `Node.prototype.baseURI`

`baseURI`属性返回一个字符串，表示当前网页的绝对路径,浏览器根据这个属性，计算网页上的相对路径的 URL,如果无法读取网页的 URL,会返回 `null`
```js
document.baseURI; // "https://wangdoc.com/javascript/dom/node.html"
```

6. `Node.prototype.nextSibling`

`Node.nextSibling`属性返回获取`紧邻在后`的一个同级节点。如果当前节点后面没有同级节点，则返回`null`。
```js
// <div id="d1">hello</div><div id="d2">world</div>
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');
d1.nextSibling === d2 // true
```

7. `Node.prototype.previousSibling`

`Node.previousSibling`属性返回当前节点获取`紧邻在前`的一个同级节点。如果当前节点前面没有同级节点，则返回`null`。
```js
// <div id="d1">hello</div><div id="d2">world</div>
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');
d2.previousSibling === d1 // true
```

8. `Node.prototype.parentNode`

`parentNode`属性返回当前节点的父节点。

9. `Node.prototype.firstChild`，`Node.prototype.lastChild`

`firstChild`属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null。

`lastChild`属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。

10. `Node.prototype.childNodes`

`childNodes`属性返回一个类似数组的对象（`NodeList`集合），成员包括当前节点的所有子节点。

使用该属性，可以遍历某个节点的所有子节点。
```js
var div = document.getElementById('div1');
var children = div.childNodes;

for (var i = 0; i < children.length; i++) {
  // ...
}
```


### 节点方法
1. `Node.prototype.appendChild() `

`appendChild()`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
```js
var p = document.createElement('p');
document.body.appendChild(p);
```
上面代码新建一个`<p>`节点，将其插入`document.body`的尾部。

如果参数节点是 DOM 已经存在的节点，`appendChild()`方法会将其从原来的位置，移动到新位置。

2. `Node.prototype.hasChildNodes()`

`hasChildNodes()`方法返回一个布尔值，表示当前节点是否有子节点。
```js
var foo = document.getElementById('foo');

if (foo.hasChildNodes()) {
  foo.removeChild(foo.childNodes[0]);
}
```
上面代码表示，如果`foo`节点有子节点，就移除第一个子节点。

- 判断一个节点有没有子节点，有许多种方法，下面是其中的三种:
- 2.1 `node.hasChildNodes()`
- 2.2 `node.firstChild !== null`
- 2.3 `node.childNodes && node.childNodes.length > 0`

3. `Node.prototype.removeChild() `

`removeChild()`方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
```js
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);
```
上面代码是移除`divA`节点。注意，这个方法是在`divA`的父节点上调用的，不是在`divA`上调用的。

面是如何移除当前节点的所有子节点。
```js
var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

4. `Node.prototype.replaceChild()`

`replaceChild()`方法用于将一个新的节点，替换当前节点的某一个子节点。
```js
// 第一个参数newChild是用来替换的新节点，第二个参数oldChild是将要替换走的子节点。返回值是替换走的那个节点oldChild。
var replacedNode = parentNode.replaceChild(newChild, oldChild);
```
```js
var divA = document.getElementById('divA');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);
```
上面代码是如何将指定节点`divA`替换走。



## NodeList 接口，HTMLCollection 接口
节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：`NodeList`和`HTMLCollection`。

主要区别是 : `NodeList`可以包含各种类型的节点，`HTMLCollection`只能包含 HTML 元素节点。

### NodeList接口

如果`NodeList`是类数组,实例要使用数组方法，可以将其转为真正的数组。
```js
var children = document.body.childNodes;
var nodeArr = Array.prototype.slice.call(children);
```

1. `NodeList.prototype.length`

`length`属性返回`NodeList`实例包含的节点数量。

2. `NodeList.prototype.forEach()`

`forEach`方法用于遍历`NodeList`的所有成员。用法与数组实例的 forEach 方法完全一致。

3. `NodeList.prototype.item()`

`item`方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
```js
document.body.childNodes.item(0)
```
上面代码中，item(0)返回第一个成员。

如果参数值大于实际长度，或者索引不合法（比如负数），item方法返回null。如果省略参数，item方法会报错。

### HTMLCollection 接口
- `HTMLCollection`是一个节点对象的集合，只能包含元素节点（`element`），不能包含其他类型的节点。
它的返回值是一个`类似数组的对象`，但是与`NodeList`接口不同，`HTMLCollection`没有`forEach`方法，只能使用`for`循环遍历。

1. `HTMLCollection.prototype.length`

`length`属性返回`HTMLCollection`实例包含的成员数量。

2. `HTMLCollection.prototype.item()`

`item`方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。



## ParentNode 接口，ChildNode 接口

### ParentNode 接口
1. `ParentNode.children`

`children`属性返回一个`HTMLCollection`实例，成员是当前节点的所有元素子节点。该属性只读。

2. `ParentNode.firstElementChild`

`firstElementChild`属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回 null。

3. `ParentNode.lastElementChild`

`lastElementChild`属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回null。

4. `ParentNode.childElementCount`

`childElementCount`属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回0。

5. `ParentNode.append()`

`append`方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。

该方法不仅可以添加元素子节点，还可以添加文本子节点。
```js
var parent = document.body;

// 添加元素子节点
var p = document.createElement('p');
parent.append(p);

// 添加文本子节点
parent.append('Hello');

// 添加多个元素子节点
var p1 = document.createElement('p');
var p2 = document.createElement('p');
parent.append(p1, p2);

// 添加元素子节点和文本子节点
var p = document.createElement('p');
parent.append('Hello', p);
```
注意，该方法没有返回值。

6. `ParentNode.prepend()`

`prepend`方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与`append`方法完全一致，也是没有返回值。



### ChildNode 接口

1. `ChildNode.remove()`

`remove`方法用于从父节点移除当前节点。

2. `ChildNode.before()，ChildNode.after()`

`before`方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。注意，该方法不仅可以插入元素节点，还可以插入文本节点。
```js
var p = document.createElement('p');
var p1 = document.createElement('p');

// 插入元素节点
el.before(p);

// 插入文本节点
el.before('Hello');

// 插入多个元素节点
el.before(p, p1);

// 插入元素节点和文本节点
el.before(p, 'Hello');
```
`after`方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与`before`方法完全相同。

3. `ChildNode.replaceWith()`

`replaceWith`方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。
```js
var span = document.createElement('span');
el.replaceWith(span);
```
上面代码中，el节点将被span节点替换。



## Document 节点

- `document`节点对象代表整个文档，每张网页都有自己的`document`对象。
- `window.document`属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

- `document`对象有不同的办法可以获取: 
1. 正常的网页，直接使用`document`或`window.document`。
2. `iframe`框架里面的网页，使用`iframe`节点的`contentDocument`属性。
3. `Ajax` 操作返回的文档，使用`XMLHttpRequest`对象的`responseXML`属性。
4. 内部节点的`ownerDocument`属性。

### 属性
#### 快捷方式属性
1. `document.defaultView`

`document.defaultView`属性返回`document`对象所属的`window`对象。如果当前文档不属于`window`对象，该属性返回`null`。
```js
document.defaultView === window // true
```
2. `document.body，document.head`

`document.body`属性指向`<body>`节点，`document.head`属性指向`<head>`节点。

3. `document.scrollingElement`

`document.scrollingElement`属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。
```js
// 页面滚动到浏览器顶部
document.scrollingElement.scrollTop = 0;
```

4. `document.activeElement`

`document.activeElement`属性返回获得当前焦点（`focus`）的 DOM 元素。
通常，这个属性返回的是`<input>`、`<textarea>`、`<select>`等表单元素，如果当前没有焦点元素，返回`<body>`元素或`null`。

#### 节点集合属性

1. `document.links`

`document.links`属性返回当前文档所有设定了href属性的`<a>`及`<area>`节点。
```js
// 打印文档所有的链接
var links = document.links;
for(var i = 0; i < links.length; i++) {
  console.log(links[i]);
}
```

2. `document.forms`

`document.forms`属性返回所有`<form>`表单节点。
```js
var selectForm = document.forms[0];
```
上面代码获取文档第一个表单。

除了使用位置序号，id属性和name属性也可以用来引用表单。
```js
/*
    <form name="foo" id="bar"></form>
*/
document.forms[0] === document.forms.foo // true
document.forms.bar === document.forms.foo // true
```

3. document.scripts

`document.scripts`属性返回所有`<script>`节点。
```js
var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log('当前网页有脚本');
}
```

4. `document.styleSheets`

`document.styleSheets`属性返回文档内嵌或引入的样式表集合。


#### 文档静态信息属性

1. `document.location`

`Location`对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过`window.location`和`document.location`属性，可以拿到这个对象。

#### 文档状态属性

1. `document.readyState`

`document.readyState`属性返回当前文档的状态，共有三种可能的值。

- `loading`：加载 HTML 代码阶段（尚未完成解析）
- `interactive`：加载外部资源阶段
- `complete`：加载完成

**这个属性变化的过程如下。**

- 1.1. 浏览器开始解析 HTML 文档，`document.readyState`属性等于`loading`。

- 1.2. 浏览器遇到 HTML 文档中的`<script>`元素，并且没有`async`或`defer`属性，就暂停解析，
开始执行脚本，这时`document.readyState`属性还是等于`loading`。

- 1.3. HTML 文档解析完成，`document.readyState`属性变成`interactive`。

- 1.4. 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，`document.readyState`属性变成`complete`。

下面的代码用来检查网页是否加载成功。
```js
// 基本检查
if (document.readyState === 'complete') {
  // ...
}

// 轮询检查
var interval = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(interval);
    // ...
  }
}, 100);
```
另外，每次状态变化都会触发一个`readystatechange`事件。

2. `document.cookie`

`document.cookie`属性用来操作浏览器 `Cookie`

3. `document.querySelector()`， `document.querySelectorAll()`

`document.querySelector()`方法接受一个 `CSS 选择器`作为参数，返回匹配该选择器的元素节点。
如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回`null`
```js
var el1 = document.querySelector('.myclass');
var el2 = document.querySelector('#myParent > [ng-click]');
```
`document.querySelectorAll()`方法与`querySelector`用法类似，区别是返回一个`NodeList`对象，包含所有匹配给定选择器的节点。

4. `document.getElementsByTagName()`

5. `document.getElementsByClassName()`

6. `document.getElementsByName()`

7. `document.getElementById()`

8. `document.createElement()`

9. `document.createAttribute()`

10. `document.createEvent()`

11. `document.addEventListener()`，`document.removeEventListener()`，`document.dispatchEvent()`
```js
// 添加事件监听函数 
// 参数三: 指定事件是否在捕获或冒泡阶段执行---- true: 事件在捕获阶段执行   false: 默认,事件句柄在冒泡阶段执行
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```


## Element 节点

### 实例属性
1. `Element.attributes`

2. `Element.className，Element.classList`

3. `Element.dataset`

4. `Element.innerHTML`

5. `Element.outerHTML`

6. `Element.clientHeight，Element.clientWidth`

7. `Element.clientLeft，Element.clientTop`

8. `Element.scrollHeight，Element.scrollWidth`

9. `Element.scrollLeft，Element.scrollTop`

10. `Element.offsetParent`

11. `Element.offsetHeight，Element.offsetWidth`

12. `Element.offsetLeft，Element.offsetTop`

13. `Element.style`

14. `Element.children，Element.childElementCount`

15. `Element.firstElementChild，Element.lastElementChild`

16. `Element.nextElementSibling，Element.previousElementSibling`


### 实例方法

1. `Element.querySelector()`

2. `Element.querySelectorAll()`

3. `Element.getElementsByClassName()`

4. `Element.getElementsByTagName()`

5. `Element.closest()`

6. `Element.matches()`

#### 事件方法

1. `Element.scrollIntoView()`

2. `Element.getBoundingClientRect()`

3. `Element.getClientRects()`

4. `Element.insertAdjacentElement()`

5. `Element.insertAdjacentHTML()`，`Element.insertAdjacentText()`

6. `Element.remove()`

7. `Element.focus()，Element.blur()`

8. `Element.click()`


## CSS 操作

### HTML 元素的 style 属性

操作 CSS 样式最简单的方法，就是使用网页元素节点的`getAttribute()`方法、`setAttribute()`方法和`removeAttribute()`方法，
直接读写或删除网页元素的`style`属性。
```js
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);

// 相当于
<div></div><div style="background-color:red; border:1px solid black;" />
```
`style`不仅可以使用字符串读写，它本身还是一个对象，部署了 `CSSStyleDeclaration` 接口（详见下面的介绍），可以直接读写个别属性。
```js
e.style.fontSize = '18px';
e.style.color = 'black';
```

### 添加样式表

网页添加样式表有两种方式。
- 1. 一种是添加一张内置样式表，即在文档中添加一个`<style>`节点。

```js
// 写法一
var style = document.createElement('style');
style.setAttribute('media', 'screen');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement('style');
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule('.foo{color:red;}', 0);
```

- 2. 另一种是添加外部样式表，即在文档中添加一个`<link>`节点，然后将href属性指向外部样式表的 `URL`。
```js
var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
```


## Mutation Observer API
`Mutation Observer API` 用来监视 `DOM 变动`。
DOM 的任何变动，比如`节点的增减`、`属性的变动`、文本内容的变动`，这个 API 都可以得到通知。

概念上，它很接近事件，可以理解为 `DOM 发生变动`就会触发 `Mutation Observer` 事件。
但是，它与事件有一个本质不同：`事件是同步触发`，也就是说，DOM 的变动立刻会触发相应的事件；`Mutation Observer 则是异步触发`，
DOM 的变动并不会马上触发，而是要`等到当前所有 DOM 操作都结束才触发`。