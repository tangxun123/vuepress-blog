## Canvas
### 基本用法
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas 基本使用</title>
</head>
<body>
  <canvas width="200" height="200">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
</body>
</html>
```
上面代码就是一个基本的使用Canvas标签的例子。可以看到我们为它设置了宽和高，还在 Canvas标签内部给出一个提示文案。在这里需要说明一下：

- Canvas标签的默认大小为：300 x 150 (像素)，而这里咱们设置为了：200 x 200（像素）。
- Canvas标签中的文字是在不支持Canvas标签的浏览器中使用的，因为支持Canvas标签的浏览器会忽略容器中包含的内容正常渲染Canvas标签，而不支持Canvas标签的浏览器则相反，浏览器会忽略容器而显示其中的内容。
---

### 渲染山下文 getContext()
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas 基本使用</title>
</head>
<body>
  <canvas id="canvas" width="200" height="200">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
    }
  </script>
</body>
</html>
```
这里需要注意一点，getContext方法是有一个接收参数，它是绘图上下文的类型，可能的参数有：

- 2d：建立一个二维渲染上下文。这种情况可以用 CanvasRenderingContext2D()来替换getContext('2d')。
- webgl（或 experimental-webgl）： 创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现WebGL 版本1(OpenGL ES 2.0)的浏览器上可用。
- webgl2（或 experimental-webgl2）：创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本2 (OpenGL ES 3.0)的浏览器上可用。
- bitmaprenderer：创建一个只提供将canvas内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext。

---



### **API**
Api | 参数 | 说明
------------- | ------------ | --------
beginPath | 无 | 新建一条路径，生成之后，图形绘制命令被指向到路径上
closePath | 无 | 闭合路径之后图形绘制命令又重新指向到上下文中 <sup style="color:red">①</sup>
moveTo(x, y) | 参数为初始位置x和y的坐标点 | 设置初始位置
lineTo(x, y) | 参数为指定位置x和y的坐标点 | 绘制一条从初始位置到指定位置的直线
stroke() | 无 | 通过线条来绘制图形轮廓边框
fill() | 无 | 通过填充路径的内容区域生成实心的图形
strokeRect(x, y, width, height) | x和y 是矩形的起点坐标，width和height 是矩形的宽高 | 绘制一个矩形的边框
fillRect(x, y, width, height) | x和y 是矩形的起点坐标，width和height 是矩形的宽高 | 绘制一个填充的矩形
clearRect(x, y, width, height) | x和y 是矩形的起点坐标，width和height 是矩形的宽高   | 清除指定矩形区域，让清除部分完全透明
arc(x, y, radius, startAngle, endAngle, anticlockwise) | x和y为圆心的坐标，radius为半径，startAngle为圆弧或圆的开始位置，endAngle为圆弧或圆的结束位置，anticlockwise是绘制的方向（不写默认为false，从顺时针方向） | 绘制圆弧或者圆
ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) | x、y：椭圆的圆心位置，radiusX、radiusY：x轴和y轴的半径，rotation：椭圆的旋转角度，以弧度表示，startAngle：开始绘制点，endAngle：结束绘制点，anticlockwise：绘制的方向（默认顺时针），可选参数。 | 绘制椭圆路径
quadraticCurveTo(cp1x, cp1y, x, y) | cp1x和cp1y为一个控制点，x和y为结束点 | 二次贝塞尔曲线。一段二次贝塞尔曲线是通过一个起点、控制点和结束点来控制的 <sup style="color:red">②</sup>
bezierCurveTo(cp1x,cp1y, cp2x,cp2y, x, y) | cp1x和cp1y为一个控制点，cp2x和cp2y为第二个控制点，x和y为结束点 | 三次贝塞尔曲线有两个控制点 <sup style="color:red">③</sup>
setLineDash([]) | 数组元素是一组描述交替绘制线段和间距（坐标空间单位）长度的数字 | 设置当前虚线样式，如果传参为奇数，例如：ctx.setLineDash([5, 10, 20])，那么 setLineDash 会复制一份数组补全为偶数，相当于ctx.setLineDash([5, 10, 20, 5, 10, 20])
getLineDash() | 无 | 返回当前虚线设置的样式，长度为非负偶数的数组
createLinearGradient(x1, y1, x2, y2) |  起点的坐标和终点的坐标 | 线性渐变，用法：var gradient = ctx.createLinearGradient(0, 0, 400, 20);
createRadialGradient(x0, y0, r0, x1, y1, r1) | 参数分别为开始圆的坐标和半径以及结束圆的坐标和半径 | 径向渐变 var gradient = ctx.createLinearGradient(100, 100, 100, 100, 100, 0);
gradient.addColorStop(offset, color) | color就是颜色，offset 则是颜色0-1的偏移值 | 用法：gradient.addColorStop(0, "red"); gradient.addColorStop(1, "blue");
createPattern(image, type) | Image 参数可以是一个 Image 对象，也可以是一个 canvas 对象，Type 为图案绘制的类型，可用的类型分别有：repeat，repeat-x，repeat-y 和 no-repeat | 绘制图案效果
drawImage(image, dx, dy)**绘制** drawImage(image, dx, dy, dWidth, dHeight)**缩放** drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)**裁剪** | image：绘制到上下文的元素; sx、sy：裁剪框的左上角X轴坐标和Y轴坐标; sWidth、sHeight：裁剪框的宽度和高度; dx、dy：绘制到上下文的元素，在上下文中左上角的X轴坐标和Y轴坐标; dWidth、dHeight：绘制到上下文的元素，在上下文中绘制的宽度和高度。如果不说明，在绘制时image宽度和高度不会缩放 | 绘制图片
strokeText(text, x, y, maxWidth) | text：绘制的文案; x、y：文本的起始位置; maxWidth：可选参数，最大宽度 | 文字描边，需要注意的是当文案大于最大宽度时不是裁剪或者换行，而是缩小字体
fillText(text, x, y, maxWidth) | text：绘制的文案; x、y：文本的起始位置; maxWidth：可选参数，最大宽度 | 文字填充，需要注意的是当文案大于最大宽度时不是裁剪或者换行，而是缩小字体
translate(x, y) | x 是左右偏移量，y 是上下偏移量 | 平移
rotate(angle) | angle是旋转的角度，它是顺时针旋转，以弧度为单位的值 | 旋转
scale(x, y) | x 为水平缩放的值，y 为垂直缩放得值。x和y的值小于1则为缩小，大于1则为放大。默认值为 1 | 缩放
transform(a, b, c, d, e, f) | a：水平方向的缩放 ，b：竖直方向的倾斜偏移 ，c：水平方向的倾斜偏移 ，d：竖直方向的缩放 ，e：水平方向的移动 ，f：竖直方向的移动 | 将当前的变形矩阵乘上一个基于自身参数的矩阵
setTransform(a, b, c, d, e, f) | a：水平方向的缩放 ，b：竖直方向的倾斜偏移 ，c：水平方向的倾斜偏移 ，d：竖直方向的缩放 ，e：水平方向的移动 ，f：竖直方向的移动 | 将当前变形矩阵重置为单位矩阵，然后用相同的参数调用 transform 方法
resetTransform() | 无 | 重置当前变形为单位矩阵。效果等同于调用 setTransform(1, 0, 0, 1, 0, 0) <sup style="color:red">⑦</sup>
save() | 无 | 状态的保存 <sup style="color:red">⑥</sup>
restore() | 无 | 状态的恢复 <sup style="color:red">⑥</sup>
clip() | 无 | 裁剪。裁剪的作用是遮罩，用来隐藏不需要的部分，所有在路径以外的部分都不会在 canvas 上绘制出来
clip(path, fillRule) | path为需要剪切的 Path2D 路径，fillRule为判断是在路径内还是在路径外(nonzero（默认值）：非零环绕原则，evenodd：奇偶环绕原则) | 无
canvas.toDataURL('image/png', quality) | 参数一图片类型：'image/png'，'image/jpeg'；  参数二：quality,可选参数,提供从 0 到 1 的图片质量，1 表示最好品质，0 表示品质最差基本无法辨别。 | 默认设定创建一个 PNG 图片
---

### **Attributes**
属性 | 说明
------ | ------
lineWidth | 绘线的粗细，属性值必须为正数，默认值是 1.0
fillStyle | 填充样式
strokeStyle | 边框轮廓样式
lineCap | 设置线段端点显示的样子。可选值为：butt，round 和 square。默认是 butt
lineJoin | 设置两线段连接处所显示的样子。可选值为：round, bevel 和 miter。默认是 miter
miterLimit | 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度 <sup style="color:red">④</sup>
lineDashOffset | 设置虚线样式的起始偏移量
globalAlpha | 设置图形透明度
font | 用于绘制文本的样式。默认的字体是 10px sans-serif
textAlign | 文本对齐的方式：可选值为：left、right、center、start和end。默认值是 start
direction | 文本的方向：可选值为：ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document）。默认值是 inherit  <sup style="color:red">⑤</sup>
textBaseline | 基线对齐选项，决定文字垂直方向的对齐方式。可选值为：top、hanging、middle、alphabetic、ideographic和bottom。默认值是 alphabetic
shadowOffsetX | 阴影在 X 轴的延伸距离，负值表示阴影会往左延伸，正值则表示会往右延伸，默认为 0
shadowOffsetY | 阴影在 Y 轴的延伸距离，负值表示阴影会往上延伸，正值则表示会往下延伸，默认为 0
shadowBlur | 设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0
shadowColor | 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色
globalCompositeOperation | **合成** source-over:默认值，在现有画布上下文之上绘制新图形; source-in:新图形只在新图形和目标画布重叠的地方绘制,其他的都是透明的; source-out:在不与现有画布内容重叠的地方绘制新图形; source-atop:新图形只在与现有画布内容重叠的地方绘制; destination-over:在现有的画布内容后面绘制新的图形; destination-in:现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的; destination-out:现有内容保持在新图形不重叠的地方; destination-atop:现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的; lighter:两个重叠图形的颜色是通过颜色值相加来确定的; copy:只显示新图形; xor:图像中，那些重叠和正常绘制之外的其他地方是透明的; multiply:将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片; screen:像素被倒转，相乘，再倒转，结果是一幅更明亮的图片  <sup style="color:red">⑧</sup>
---

### 动画
在 canvas 上绘制内容是用 canvas 提供的或者自定义的方法，而通常我们仅仅在脚本执行结束后才能看见结果，所以想在 for 循环里面完成动画是不可能的。那么为了实现动画，我们需要一些可以定时执行重绘的方法。

- setInterval(function, delay) ：定时器，当设定好间隔时间后，function 会定期执行。
- setTimeout(function, delay)：延时器，在设定好的时间之后执行函数
- requestAnimationFrame(callback)：告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画。

绘制动画的基本步骤

- 清空 canvas：除非接下来要画的内容会完全充满 canvas（例如背景图），否则需要清空所有。最简单的做法就是用 clearRect 方法。
- 保存 canvas 状态：如果要改变 canvas 状态的设置（样式，变形之类的），之后又要在每画一帧之时都是原始状态的情况时，需要先保存一下 ctx.save()。
- 绘制动画图形（animated shapes）
- 恢复 canvas 状态：如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧 ctx.restore()。




---
### > 注释解析：
1. 在开启和关闭路径的时候，关闭路径其实并不是必须的，对于新路径其实每次都开启新路径就可以。
2. [二次贝塞尔曲线调试工具](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)
3. [三次贝塞尔曲线调试工具](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)
4. 线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。如果交点距离大于miterLimit值，连接效果会变成了 lineJoin = bevel 的效果。
5. 需要注意的是 direction 属性会对 textAlign 属性产生影响。如果 direction 属性设置为 ltr，则textAlign属性的 left 和 start 的效果相同，right 和 end 的效果相同，如果 direction 属性设置为 rtl，则 textAlign属性的 left 和 end 的效果相同，right 和 start 的效果相同。
6. 
- canvas中特定元素的旋转平移等操作实际上是对整个画布进行了操作， 默认情况下那么每一次绘图都会在上一次的基础上进行操作，最后导致错位。
- **比如** 页面上的元素相对于原点30度递增旋转，30，60，90.如果不使用save 以及 restore就会变成30, 90, 150，每一次在前一次基础上进行了旋转。
- **注意**：回到之前保存的状态是不把画布的内容回到之前的状态，而是把画布的配置 比如原点，旋转角度，画笔的颜色等该变成之前的状态
- canvas 在绘画的过程中难免会改变整个画布，导致坐标错位等情况，所以在我们改变整个画布之前使用save() 保存一下画布，在我们需要他回复之前的状态的时候使用restore()回到之前的状态
- 在Canvas环境中绘图时，canvas 状态是以堆(stack)的方式保存的，每一次调用 save 方法，当前的状态就会被推入堆中保存起来，调用restore()方法时，就会把上一次记录的绘图状态从堆栈中弹出
- 出栈的次数不能多于入栈的次数，故程序中**restore()方法调用的次数不应该比save()方法多**。
7. 需要注意的是transform方法和setTransform方法中如果任意一个参数是无限大（Infinity），那么变形矩阵也必须被标记为无限大，否则会抛出异常。
8. 合成的图形受限于绘制的顺序。如果我们不想受限于绘制的顺序，那么我们可以利用 globalCompositeOperation 属性来改变这种情况



