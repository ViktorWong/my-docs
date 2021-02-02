# CSS3新特性

## css3新特性概览

1. css3选择器，与jq一样，强化了选择器功能，包括了数量、层次、属性选择器
2. 原先通过图片或者脚本实现视觉效果通过样式实现，减少了标签和脚本的使用，降低维护成本
3. 背景：支持背景大小，多背景设置，减少了标签，更加灵活
4. 盒模型：拓展了盒模型的类型，尤其弹性盒模型flex；支持了盒模型的变形，旋转，缩放，扭曲等
5. 实现了多列布局，摆脱了只能浮动多列布局
6. 阴影效果：文本阴影，盒阴影，简单的阴影效果可以跳过设计稿
7. web字体解决了浏览器无法识别的字体；web font图标，更加灵活的使用图标字体，减少了维护工作
8. 颜色与透明度，支持了多种颜色模式，支持透明度设置
9. 圆角与边框，更加丰富的设计效果实现，去除直角实边的单一效果
10. 过度与动画交互效果，可以设置动画进行简单的交互，提升体验
11. 媒体特性与响应式布局，boot框架就是基于这点建立的栅格系统

## background-size，clip

### background-size

一般情况下，我们设置的背景图与背景为完全匹配，但也有情况是可能不匹配的，或者大或者小，那么当尺寸不匹配时，你希望如何控制尺寸呢？这就是`background-size`的价值所在。

可能取值：`px|percentage|cover|contain`,详细说明如下：

|取值|	说明|
| --- | --- |
|px|	设置背景图像的宽度和高度，如果只设置一个，第二个被认为auto|
|percentage|	设置背景图像的宽度和高度，如果只设置一个，第二个被认为auto|
|contain	|缩放背景图像，让其能显示完整|
|cover	|缩放其图像，让其能完全覆盖区域，但可能背景显示不全|

- 兼容性：ie9+以及现代浏览器

### background-clip
背景裁剪一般用于控制其背景的显示策略，显示覆盖区域，常规默认是覆盖全部也就是border-box的。
可能取值：`padding-box|content-box|border-box`,与`box-sizing`一致的取值范围。

兼容性：ie9+以及现代浏览器


## animation
animation　css3属性设置动画，css复合属性，可以追加多个css属性，不可被继承，　　
@keyframes定动画,可以定义动画的起始位置，有参考点，定义位置属性等

### 基本语法

- animation-name 规定的动画名称 与keyframes 里面的名称对应
- animation-duration 规定动画完成一个周期所需要的时间，如果为0 表示没有动画
- animation-direction 定义的方向 ie10以上支持 ，normal 正常播放，alternate 偶数反方向播放
- animation-timing-function： linear 从头到尾相同的 ease 开始和结束慢 ease-in 开始慢 ease-out 结束慢 - ease-in-out 以低俗开始和结束 cubic-bezier(n,n,n,n) 速度曲线 可能是0-1 之间的数值
- animation-delay 动画延迟时间
- animation-iteration-count :n infinite 指定次数或者无限次
- animation-play-state :paused running 规定以暂定或者进行中
- animation-fill-mode :none,forwards backwards both 动画完成之后的样式状态 无 默认的 ；最后一个状态 ，最开始的状态，兼容状态

### 参考文章

[css3 animation(张鑫旭)](https://www.zhangxinxu.com/wordpress/2013/06/css3-animation-%E7%82%B9%E7%82%B9%E7%82%B9%E7%AD%89%E5%BE%85%E6%8F%90%E7%A4%BA%E6%95%88%E6%9E%9C/)

## 动画--过渡

Css3可以给元素添加一些效果，而过渡可以让元素从一种样式转换成另一种样式。其中可以设置动画执行的样式，时间，重复等。

### 属性
- transition
设置四个过渡属性
- transition-property
过渡的名称
- transition-duration
过渡效果花费的时间
- transition-timing-function
过渡效果的时间曲线
- transition-delay
过渡效果开始时间，延迟开始的时间

### 代码实现

代码实现效果鼠标覆盖元素变大为原来的两倍并旋转360度。不考虑兼容代码。

```css
.demo{
width:100px;
height:100px;
background:blue;
transition:width 2s,height 2s，transform 2s；
} 
.demo:hover{
width:200px;
height:200px;
transform:rotate(360deg);
}
```


## white-space

### 定义和用法

white-space 属性设置如何处理元素内的空白。

这个属性声明建立布局过程中如何处理元素中的空白符。值 pre-wrap 和 pre-line 是 CSS 2.1 中新增的。

|说明	|值|
|---|---|
|默认值	|normal|
|继承性|	yes|
|版本	|CSS1|
|JavaScript 语法|	object.style.whiteSpace="pre"|
|浏览器支持	|所有浏览器都支持 white-space 属性，任何的版本的 Internet Explorer （包括 IE8）都不支持属性值 "inherit"|

### 可能的值

|值	|含义|
|---|---|
|normal	|默认。空白会被浏览器忽略|
|pre|	空白会被浏览器保留。其行为方式类似 HTML 中的 &lt;pre&gt; 标签|
|nowrap|	文本不会换行，文本会在在同一行上继续，直到遇到&lt;br&gt; 标签为止|
|pre-wrap|	保留空白符序列，但是正常地进行换行|
|pre-line|	合并空白符序列，但是保留换行符|
|inherit|	规定应该从父元素继承 white-space 属性的值|

### 可能使用场景
使用text-overflow:ellipsis对溢出文本显示省略号有两个好处，一是不用通过程序限定字数；二是有利于SEO。需要使用对对溢出文本显示省略号的通常是文章标题列表，这样处理对搜索引擎更友好，因为标题实际上并未被截字，而是局限于宽度而未被显示而已。

通常的做法是这样的：

```css
overflow:hidden;
text-overflow:ellipsis;
-o-text-overflow:ellipsis;
white-space:nowrap;
width:100%;
```

其中，overflow: hidden和white-space: nowrap都是必须的否则不会显示省略号；-o-text-overflow: ellipsis针对Opera；而宽度的设定主要是针对IE6；

该方法支持Internet Explorer, Safari, Chrome 和 Opera，但FF并不支持，不过可以通过Jquery来实现类似的效果。

```css
-moz-box-flex:2.0; /* Firefox */
-webkit-box-flex:2.0; /* Safari 和 Chrome */ 浏览器支持的可伸缩元素
```


## css3的媒体查询
通过css3的媒体查询你可以根据不同的设备具体情况来定制你的页面。

### 查询内容

```css
* width:浏览器可视宽度。
* height:浏览器可视高度。
* device-width:设备屏幕的宽度。
* device-height:设备屏幕的高度。
* orientation:检测设备目前处于横向还是纵向状态。
* aspect-ratio:检测浏览器可视宽度和高度的比例。(例如：aspect-ratio:16/9)
* device-aspect-ratio:检测设备的宽度和高度的比例。
* color:检测颜色的位数。（例如：min-color:32就会检测设备是否拥有32位颜色）
* color-index:检查设备颜色索引表中的颜色，他的值不能是负数。
* monochrome:检测单色楨缓冲区域中的每个像素的位数。（这个太高级，估计咱很少会用的到）
* resolution:检测屏幕或打印机的分辨率。(例如：min-resolution:300dpi或min-resolution:118dpcm)。
*  grid：检测输出的设备是网格的还是位图设备。
```

### 用法

css3 的 写法 ：如果你是写最小宽度，最大宽度的限制，为了简便，建议你从最小宽度开始写，依次写最小宽度即可。

```css
@media screen and (min-width : 768 px) {
     .container {
            width:100%；
      }
}
@media screen and (min-width : 1024 px) {
     .container {
            width: 1024px
      }
}
```

也可以直接写link文件中，根据不同分辨率用不同的样式文件渲染

`&lt;link rel=&quot;stylesheet&quot; media=&quot;min-width=900&quot; /&gt;`


## 线性渐变

### 概念

CSS linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于&lt;gradient&gt;数据类型，是一种特别的`<image>`数据类型。

### 基本语法


`linear-gradient([<angle> | to <side-or-corner>]? , <color-stop-list>)`

这个函数（特性）接受的第一个参数是渐变的角度，他可以接受一个表示角度的值（可用的单位deg、rad、grad或turn）或者是表示方向的关键词（top、right、bottom、left、left top、top right、bottom right或者left bottom）。第二个参数是接受一系列颜色节点（终止点的颜色）。

### 渲染容器

其本身没有单独容器概念，大小只能是元素的border-box.不能选择性的线性渐变内容盒等。

### 渐变角度

默认值 to bottom 等于 180deg,如果是目标的效果可以不再额外设置。渐变夹角为元素中心点垂直线与渐变线之间形成的夹角。(借用大漠老师的图)

![linear](/css/linear.png)

1. 这里的夹角不是与水平线的，我当初也以为是水平夹角；
2. 就是如果你希望渐变线到元素的右上角部分，这个部分不一定是45deg,而关键字设置的top right 一定是右上角。


### 渐变线

![linearGradient](/css/linearGradient.gif)

从上面的图中我们可以看到渐变线，也就是当前中心点的垂线旋转渐变角度之后的线，它的长度是与宽高以及角度相关的，可能会超出容器。如果角度为90，那么渐变线长度为元素的高，如果角度为0，那么长度为元素的宽度。其他角度自己可以根据公式去计算，sin(a)*w+cos(a)*h.

有兴趣的同学可以参照我的图纸看下这个公式如何得来的,比较简陋，嘿嘿。

![caotu](/css/caotu.jpeg)

解题过程如下：

希望你数学不是那么差可以看懂哦。如果有更好的方法欢迎反馈。
```
l1=h/2/cos(a);
l2=d2*sin(a);
d2=w/2-d1;
d1=l1*sin(a);
最终计算 l=2*(l1+l2)=w*sin(a)+h*cos(a);
```

渐变线的长度直接影响线性渐变的细腻程度。长度越长，过渡色越多。




