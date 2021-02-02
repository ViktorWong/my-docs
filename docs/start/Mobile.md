# 移动端常见问题

## 移动端1px边框的问题

> 应该感觉不止一次会被涉及到关于1px的问题，其主要触发的场景就是高分屏上会把1px宽的边框显示成2px，在dpr为3的设备上，显示边框为3px.

为了避免大家少走弯路，这里简单带一下网上提到的几种方案，包括下面的:

- 边框的图片，border-image
- 背景图片
- 边框的阴影
- 设置viewport的meta属性(不建议使用)

推荐方案：

**1. transform**

针对边框设置1px之后，在使用transform,需要结合JavaScript代码，用来判断是否是Retina.

```css
.hairlines li{ position: relative; border:none; } 
.hairlines li:after{ 
content: '';  
position: absolute; left: 0; 
background: #000; width: 100%; height: 1px;
 transform: scaleY(0.5); transform-origin: 0 0; }
```

**2. PostCSS的postcss-write-svg**

使用PostCSS的插件是不是比我们修改图片要来得简单与方便。

使用PostCSS的postcss-write-svg插件，最后编译完会变成一背景图片样式。比如：

```css
@svg square { 
@rect { fill: var(--color, black); width: 100%; height: 100%; } } 
#example {
 background: white svg(square param(--color #00b1ff)); }
```

**3. 0.5px**

查看是否兼容设置0.5px的方案，进行兼容性测试，支持就设置这个样式，结合Flexible方案。

```css
if (dpr &gt;= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
```

**4.伪元素 transform、border-image**

京东的1px的方案，边框均是伪元素实现的，但不是所有的样式有实现。

```css
// transform 方案
@media only screen and (-webkit-min-device-pixel-ratio: 2){
 .option:after {
    -webkit-transform: scale(.5);
    -webkit-transform-origin: 0 0;
    bottom: -100%;
    right: -100%;
}
}
option:after {
   content: &quot;&quot;;
    display: block;
    border: 1px solid #ddd;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
}
// border-image方案
.jd-header-bar {
    position: relative;
    border-width: 0 0 1px;
    border-bottom: 1px solid #bfbfbf;
    -webkit-border-image: url(&quot;data:image/gif;base64,R) repeat-x 0 0;
    background-size: 100% 44px
}
```

**5. box-shadow**

天猫的方案：box-shadow

```css
.templates-item-wrapper {
    width: 92%;
    margin: 0 auto;
    /* -webkit-box-shadow: 0 1px 2px 0 rgba(157,157,157,.5); */
    -moz-box-shadow: 0 1px 2px 0 rgba(157,157,157,.5);
    /* box-shadow: 0 1px 2px 0 rgba(157,157,157,.5); */
}
```

参考链接

- [flexible方案](https://github.com/amfe/lib-flexible/blob/2.0/index.js)
- [大漠关于修复1px bug的分析](https://www.w3cplus.com/css/fix-1px-for-retina.html)



## 移动端input type=number的时候，有不美观的外观

Q: 如题：
A: 解决方案 ：

```css
input[type=number]::-webkit-inner-spin-button,  
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    appearance: none; 
    margin: 0; 
}
```


## ios页面橡皮弹回效果遮挡页面选项卡

解决方案 ：

1. 有时body和html的height: 100%去除掉问题可能就没有了。
2. 到达临界值的时候在阻止事件默认行为

```js
var startY,endY;
//记录手指触摸的起点坐标
$('body').on('touchstart',function (e) {
     startY = e.touches[0].pageY;
});
$('body').on('touchmove',function (e) {
     endY = e.touches[0].pageY;  //记录手指触摸的移动中的坐标
     //手指下滑，页面到达顶端不能继续下滑
     if(endY&gt;startY&amp;&amp; $(window).scrollTop()&lt;=0){
         e.preventDefault();
     }
   //手指上滑，页面到达底部能继续上滑
     if(endY&lt;startY&amp;&amp; $(window).scrollTop()+ 
         $(window).height()&gt;=$('body')[0].scrollHeight){
         e.preventDefault();
     }
})
```

有时也会碰见弹窗出来后两个层的橡皮筋效果出现问题，我们可以在弹出弹出时给底层页面加上一个类名，类名禁止页面滑动这样下层的橡皮筋效果就会被禁止，就不会影响弹窗层。


## 设置高度100%之后 ，设置margin-bottom无效

改为设置成padding-bottom

## 小米手机超出滚动没有效果

position:fixed的问题，换成正常布局 ，或者绝对定位即可

## iOS键盘换行变为搜索

首先，input 要放在 form里面。
这时 "换行" 已经变成 “前往”。
如果想变成 “搜索”，input 设置 type="search"。

## iOS对position: fixed不太友好

Q: 如题：一般情况下是我们会有底部的输入框，在安卓下可能问题比较少，在ios问题较多。

A:解决方案 ：将滚动条移动到底部。

```js
var u = navigator.userAgent, app = navigator.appVersion;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (isiOS) {
    $('textarea').focus(function () {
        window.setTimeout('scrollBottom()', 500);
    });
}
function scrollBottom() {
    window.scrollTo(0, $('body').height());
}
```

## 用户设置字号放大或者缩小导致页面布局错误

```css
body  
    {  
        -webkit-text-size-adjust: 100% !important;  
        text-size-adjust: 100% !important;  
        -moz-text-size-adjust: 100% !important;  
    }
```

## 微信网页点击输入框虚拟键盘弹起后导致页面里的按钮响应区域错位

输入框弹出虚拟键盘后页面按钮操作响应位置错位，出现在微信商城或者页面，开发框架：vue

问题操作:

当页面上有输入框,凡是点击弹出虚拟键盘后,都会导致页面上某些按钮响应错位错位

解决方法:

1. 每次监听input失焦的时候,让页面回滚到顶部或者底部;
2. 即vue 有个watch方法,实时监听input里的v-focus状态,当input失焦的时候,让页面回滚到相应位置,代码如下.

```js
phoneFocused: function(newValue) {
  if(!newValue) {
        setTimeout(() =&gt; {
            //滚动到顶部
            document.body.scrollTo(0, 0);
            //滚动到底部
            document.body.scrollTo(0, document.documentElement.clientHeight);
        })
    }
},
```

## 开启硬件加速

Q: 优化渲染性能

A: 代码如下:

```css
-webkit-transform: translate3d(0, 0, 0);
-moz-transform: translate3d(0, 0, 0);
-ms-transform: translate3d(0, 0, 0);
transform: translate3d(0, 0, 0);
```


## 输入框自动填充颜色

Q: 针对input标签已经输入过的，会针对曾经输入的内容填充黄色背景，这是webkit内核自动添加的，对应的属性是autocomplete,默认是on,另对应的样式是input:-webkit-autofill 且是不可更改的。

A:方案如下

1. 设置标签的autocomplete="off",亲测无效可能
2. 设置盒子的内阴影为你常态的颜色（下面以白色为例）

```css
box-shadow:0 0  0 1000px  #fff inset ;
 -webkit-box-shadow: 0 0 0px 1000px #fff inset;
```

## 手机拍照和上传图片

Q: 针对file类型增加不同的accept字段

A:代码如下

```html
<input type="file">的accept 属性
<!-- 选择照片 -->
<input type=file accept="image/*">
<!-- 选择视频 -->
<input type=file accept="video/*">
```

## 解决字体在移动端比例缩小后出现锯齿的问题

Q: 解决字体在移动端比例缩小后出现锯齿的问题

A:代码如下

```css

.word{
-webkit-font-smoothing: antialiased;
}
```

## 如何禁止保存或拷贝图像

Q: 如何禁止保存或拷贝图像

A:代码如下

```css
img{
-webkit-touch-callout: none;}
```

## 点击样式闪动

Q: 当你点击一个链接或者通过`Javascript`定义的可点击元素的时候，它就会出现一个半透明的灰色背景。

A:根本原因是`-webkit-tap-highlight-color`，这个属性是用于设定元素在移动设备（如`Adnroid`、`iOS`）上被触发点击事件时，响应的背景框的颜色。建议写在样式初始化中以避免所以问题：`div`,`input(selector) {-webkit-tap-highlight-color: rgba(0,0,0,0);}`另外出现蓝色边框：`outline:none`；

```css
-webkit-tap-highlight-color : rgba (255, 255, 255, 0) ;
// i.e . Nexus5/Chrome and Kindle Fire HD 7 ''
-webkit-tap-highlight-color : transparent ;
```

## 移动端如何清除输入框内阴影

```css
-webkit-appearance: none;
```

## 屏蔽用户选择

Q: 禁止用户选择页面中的文字或者图片

A:代码如下

```css
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

## 关于 iOS 系统中，中文输入法输入英文时，字母之间可能会出现一个六分之一空格

Q: 如题

A: 解决方案：通过正则替换

```js
this.value = this.value.replace(/\u2006/g, '');
```


## 移动端点透问题

Q: 如题,当点击绝对定位元素的时候，下面的元素虽然被遮盖，但也被触发了。

A: 原因是：touchstart 早于 touchend 早于click。 亦即click的触发是有延迟的，这个时间大概在300ms左右，也就是说我们tap触发之后蒙层隐藏， 此时 click还没有触发，300ms之后由于蒙层隐藏，我们的click触发到了下面的a链接上。

解决方案：
>1. 尽量都使用touch事件来替换click事件。例如用touchend事件(推荐)。
>2. 用fastclick，https://github.com/ftlabs/fastclick
>3. 用preventDefault阻止a标签的click
>4. 延迟一定的时间(300ms+)来处理事件 （不推荐）
>5. 以上一般都能解决，实在不行就换成click事件。

## 移动端300ms点击延迟

Q: 移动端点击会有300ms的延迟，主要解决方案是`fastclick`的轻量库。延迟的原因：浏览器在 touchend 之后会等待约 300ms ，如果没有 `tap` 行为，则触发 `click` 事件。 而浏览器等待约 300ms 的原因是，判断用户是否是双击（double tap）行为，双击过程中就不适合触发 click 事件了。 由此可以看出 click 事件触发代表一轮触摸事件的结束。

A:`FastClick` 是 `FT Labs` 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库。FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。

## video 不能自动播放

Q: 如题

A: 解决方案：

1. autoplay 及 js 控制播放，仍然有部分设备不起作用
2.
```js
$("html").one("touchstart",function(){
　　　　　　video.play();
　　　　})
```

在微信中可以加入这段:

```js
document.addEventListener("WeixinJSBridgeReady", function () { document.getElementById('music-audio').play() }, false)
```

## 去除webkit默认的滚动条

Q: 如题

A: 解决方案：

```css
element::-webkit-scrollbar{
　　　　display:none
　　}
```

## iOS input不能自动获取焦点

Q: 如题，希望在某个页面时可以自动让输入框获取焦点

A: 解决方案：
`document.addEventListener('touchstart',function(e){document.getElementById('focus').focus();});`不能把focus封装起来起来触发，那样也无效

备注：具体实现效果待验证，希望有时间的可以验证追加可能的问题以及补充方案

## fastclick导致下拉框焦点冲突
Q: 移动端使用fastclick之后，在ios环境下，有几个连续的下拉框 第一个select框突然填充了第二个下拉框的内容。

A:根本原因是Fastclick导致IOS下多个 select ，点击某一个，焦点不停变换的bug。修改源码，在onTouchStart事件内判断设备是否为IOS，再判断当前nodeName是否为select，如果是return false去阻止fastClick执行其他事件

```js
//line 391行
FastClick.prototype.onTouchStart = function(event) {

//在其方法中添加判断 符合ios select的时候 不返回事件
if(deviceIsIOS&&this.targetElement =="select")
this.targetElement = null
event.preventDefault();
}

//line521 或者讲源码中 有关touchEnd判断非ios或者非select的事件注释，
if (!deviceIsIOS || targetTagName !== 'select') {
        this.targetElement = null;
      event.preventDefault();
    }
```

## 实现电话，短信，邮件功能
```html
// 一、打电话
<a href="tel:0755-10086">打电话给:0755-10086</a>
//  二、发短信，winphone系统无效
<a href="sms:10086">发短信给: 10086</a>
// 三、写邮件
<a href="mailto:863139978@qq.com">点击我发邮件</a>
```

## 横屏和竖屏的方案

css方案：

```css
@media screen and (orientation: portrait) {
    .main {
        -webkit-transform:rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotate(-90deg);
        width: 100vh;
        height: 100vh;
        /*去掉overflow 微信显示正常，但是浏览器有问题，竖屏时强制横屏缩小*/
        overflow: hidden;
    }
}

@media screen and (orientation: landscape) {
    .main {
        -webkit-transform:rotate(0);
        -moz-transform: rotate(0);
        -ms-transform: rotate(0);
        transform: rotate(0)
    }
}
```

js方案：

```js
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt, function() {
        var width = document.documentElement.clientWidth;
         var height =  document.documentElement.clientHeight;
          $print =  $('#print');
         if( width > height ){

            $print.width(width);
            $print.height(height);
            $print.css('top',  0 );
            $print.css('left',  0 );
            $print.css('transform' , 'none');
            $print.css('transform-origin' , '50% 50%');
         }
         else{
            $print.width(height);
            $print.height(width);
            $print.css('top',  (height-width)/2 );
            $print.css('left',  0-(height-width)/2 );
            $print.css('transform' , 'rotate(90deg)');
            $print.css('transform-origin' , '50% 50%');
         }

    }, false);
```

[js实现横屏竖屏的方案](https://github.com/zuopf769/notebook/tree/master/fe/js%E5%AE%9E%E7%8E%B0%E6%89%8B%E6%9C%BA%E6%A8%AA%E7%AB%96%E5%B1%8F%E4%BA%8B%E4%BB%B6)

[移动端采坑指南--知乎](https://zhuanlan.zhihu.com/p/26141351)

## margin-top 负值，当上级dom为图片时无效

场景：仅在部分场景下会出现，不是必现的问题。

如题：代码如下：


```html
<div class="before">
   <img src="xxx"/>
</div>  
<div class="after">
</div> 
```

```css
.after{
margin-top:-20px;
}
// changed css
.before{
}
.after{
  position:relative;
  margin-top:-20px;
}
```

首先说明下position默认值为static，上下顺序显示的，而relative则为生成相对定位的元素，相对于其正常位置进行定位。所以正常情况下，当所有的元素均为static或者relative的时候，向上的负值均可以生效，但是当一个元素为relative的时候，另一个元素默认值是static的时候，就会显示在其z空间的下一层，导致无法正常显示。修改其为relative即可。



