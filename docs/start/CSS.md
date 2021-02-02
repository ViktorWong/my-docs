# CSS 入门

## css代码规范

### 选择器

- 选择器命名

    选择器命名，class命名时选择语义化的，不建议使用直接样式效果，比如.red,.fontBold，另外整体的样式文件中命名建议使用统一的规则，或者驼峰式，或者中划线分割，命名注意缩写，避免与id重名，不建议通过1 2 3等序号命名。关于命名规则以及常见类名可以本站搜索相关文章

- 选择器选择原则

    基本的选择器中，尽量使用类选择器；复杂选择器中，尽量少使用层次、属性的相关选择器。

- 样式重用

    样式重复可以一定程度的避免，用类样式来提炼公共样式，建议多用样式的预处理，比如less。基本使用类选择器实现重用最简单实用。

- 合理的避免id的使用

    原因有二：一个是id修饰权重比较高，不容易被class修改重定义；第二个，id一般被用来定义特定模块的。如果该模块是可重用的，或者不具有特殊意义的不建议使用。

- 筛选出同时具有

    中间没有任何间隔，与群组选择器，后代选择器区分开

- 非主流选择器

    主要包括：伪类选择器，结构选择器，伪元素，属性选择器，语言选择器等。可以本站搜索选择器攻略查看所有的选择器分类以及使用。基于兼容性考虑，建议大家慎用。

- 选择器层级

    层级关系确定在3层以内，去除不必要的层级关系，简化dom结构或者样式组件结构。


### 样式分类


- 全局样式

    顾名思义，没有任何限制条件的样式，可以任何位置使用并达到其显示效果。如果可能有样式代码冲突的，建议写在样式组合中最后。定义全局样式的时候，注意样式污染的问题。一般建议用.c-来区分。

- 布局样式

    一般用于页面布局，我们经常会把页面布局和模块混合起来，或者根本就不区分。这实际是因为我们对样式理解不够深刻。实际。从视图分析，很多模块在宽高以及整体布局上都是基于整体布局的。而一些整体布局又是可以重用的，所以这部分建议单独分出来，提高开发效率。一般建议用.g-来区分。

- 模块样式

    以模块的思维去写样式代码，按照层级关系依次展开样式，保证模块清晰同时使得一些样式名称可复用，比如title,price等。其中模块样式顶级也可以理解为命名空间，模块子样式可以追加模块样式前缀，比如header-nav。模块样式是样式代码中占据比例最多的部分，针对具体样式，希望既能做到针对业务，又能提炼出可复用、耦合度低的优质模块。一般建议用.m-来区分。

- 组件样式

    页面中总有一部分常规组件是我们经常用的，定义好他们对我们开发工作有事半功倍的效果。这些组件常见的有，按钮，单选框，多选框，下拉框，时间选择控件等。一般建议用.u-来区分。

- 功能样式（交互样式）
    
    有些页面中的元素是有额外的含义的，涉及到这类样式时，有时有特定的交互，或者功能，或者内容，我们针对这部分定义为功能样式，比如删除，查看详情，增加，搜索，这些在涉及具体功能时追加的效果，我们会写在功能样式中。一般建议用.f-来区分。

- 皮肤样式

    任何一个网站或者页面都有其布局思想，在这个整体的布局当中，颜色自然是不可缺少的，针对主色，交互色，响应颜色，配色等，我们都会把这一类归到皮肤样式中。一般建议用.s-来区分。

### 样式优化

- 合理利用继承和默认

    + 可继承的样式如果是正确的，不用重写；如果是不对的，纠正；
    + 任何样式都有默认值。或者是继承来的默认值，针对默认值要清楚，决定是否调整

- 抽离公共样式
    
    代码中有超过2个类超过3行以上公用代码，建议抽离公共样式到公共区或者提炼公共样式

- 复合属性缩写

    比如font,border,margin,padding,background等

- 减少层级关系
    
    层级关系越多，代码量越大，同时访问越慢

- 使用高效能的选择器

    多使用class选择器，css的查询顺序为从右向左，所以最后一个选择器基本决定了你第一次匹配得到的整体数量。

- 重绘与重排

    影响标签显示样式的叫重绘；影响标签大小-盒模型，位置关系的称为重排。尽量减少这两种，如果有需要，优先选择用重绘代替重排。

### 书写规范

1. 规则完成一组之后换行，
2. 选择器开始语法之前大括号前面加空格。
3. 只有单行样式时放一行，两行以上每行样式一行，每一行添加分号，最后一行也加。
4. 每个样式属性值前添加空格而属性名之后不加空格。
5. 数值为0的不用加单位，数值小于1的前面的0可以省略。
6. 没有边框的时候写border:none
7. 减少使用低性能的选择器，比如标签，*，多层
8. 除了颜色以及字体外，所有的代码小写，如果有引号使用单引号
9. 字体名称请映射成对应的英文名
10. 背景图片请合理使用csssprites，按照模块、业务、页面来划分均可
11. css背景图片的文件类型，请按照以下原则来保存:如果背景图片有动画，则保存成gif,如果没有动画，也没有半透明效果，则保存成png-8,如果有半透明效果，则保存成png-24
12. 清除浮动采用样式，不使用增加空标签的方式
13. 避免过小的背景图片平铺
14. 减少使用important


### 编写顺序

- 显示属性

    display/list-style/position/float/clear
- 盒子模型

    width/height/margin/padding/border
- 背景

    background
- 行高 文本属性其他

    line-height,color/font/text-decoration/text-align/,
    text-indent/vertical-align/white-space/content,
    cursor/z-index/zoom
- css3属性

    transform/transition/animation/box-shadow/border-radius
- 链接的样式请严格按照如下顺序添加

    a:link -> a:visited -> a:hover -> a:active

### 注释规范

注释长度要求：注释中的每一行长度不超过40个汉字，或者80个英文字符

- 文件顶部注释

    ```css
    /*
    * @description: xxxxx中文说明
    * @author: zhifu.wang
    * @update: zhifu.wang (2012-10-17 18:32)
    */
    ```

- 模块注释，模块注释必须单独写在一行

    ```css
    /* module: module1 by zhifu.wang */
    ```
- 单行注释，单行注释可以写在单独一行，也可以写在行尾

    ```css
    /* this is a short comment */
    ```

- 多行注释 :多行注释必须写在单独行内

    ```css
    /*
    * this is comment line 1.
    * this is comment line 2.
    */
    ```

- 特殊注释 :用于标注修改、待办等信息

    ```css
    /* TODO: xxxx by zhifu.wang 2012-10-18 18:32 */
    /* BUGFIX: xxxx by zhifu.wang 2012-10-18 18:32 */
    ```



#### 其他

[网易nec代码规范说明](http://nec.netease.com/standard/css-sort.html)


## 理解 BFC

BFC是一套渲染机制，是指内容会显示到容器里面，而不是到容器外面。相当于在元素外面创建一堵墙，让元素内外的的内容不会互相影响。

### BFC概念解释

官方的解释是块级格式化的上下文，主要是指在渲染的过程中形成块级的盒子状的渲染区域，包括本身以及间距等。在整个的渲染过程中，不会互相影响的原则。

[MDN概念解读](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

### 触发BFC的方式

以下列举的为常规的BFC的创建方式：

- overflow:hidden,不为visible即可
- position值不为static,relative
- float值不为none
- display: table-cell table-caption inline-block,flex

### 参考文档

[学习BFC](http://web.jobbole.com/83274/)

[css中的BFC](http://www.html-js.com/article/1866)


## 深刻理解宽度自动

首先，我们需要清楚width默认值就是auto，所以不用去人为写代码控制其宽度自动哦。

### 常见的4种宽度表现

- 充分利用可用空间

默认块元素都是100%父元素宽度，这点大家都知道，但很多人会针对块元素写多余的宽度为100%。

- 收缩与包裹

常见的是浮动，行内块元素，绝对定位。我们称这种特性为包裹性。

- 收缩到最小

这个最容易出现在table-layout为auto表格中，我们不控制表格单元格宽高的时候，当每一列都放不下的时候，会把文字截断，然
而手机号，英文单词，数字等不能断，就可能会导致某些只是文字的列，每个字都换行显示，称min-content。

- 超出容器宽度

一般元素不会超出容器显示，除非以下两种情况,尤其第一种是初级前端在开发中经常遇到的问题。

    1. 内容出现了英文或者数字，不换行显示
    2. 设置了样式white-space:nowrap，不换行。

    针对上面两个问题，可以分别做如下纠正。
    
    1. word-break:break-all
    2. white-space:normal

### 外部尺寸与流体特性

- 正常流宽度

块元素默认有流体特性，继承父元素宽度，不会超出父元素宽度。然而有些人还是这样写代码：

```css
a{
display:block;
width:100%;
}
```

又或者这样的代码，你给导航中的a标签设置间距宽度什么的，其实标签变为块级之后，会自动根据计算拿到属于自己的宽度，多此一
举。

```css
.nav{
width:240px}
.nav-a{
display:block;
width:200px;
margin:0 10px;
padding:9px 10px ;}
```

- 格式化宽度

格式化宽度指出现在绝对定位模型中，包括绝对定位以及固定位置，只是两者参考点不同而已。默认情况下其特性为包括性，由内容宽度决定盒子宽度，但是当（非替换元素）left/right同时设置的时候，其宽度为相对于最近的定位特性不是static的祖先元素计算。其宽度会是父元素宽度-left-right,而其他特性仍然不变。这点在我们实际的布局中有很大的用途，比如我分享的css实用技术中的变宽与固宽结合的布局。

```css
.par{
   width:1000px;
   position:relative;
   }
   //子元素宽度为700px
   .son{
   position:absolute;
   left:100px;
   right:200px;}
```

### 内部尺寸与流体特性

- 包裹性

包括性是指当元素为非块元素的时候，其宽度由内容决定，自己只负责根据需要扩大，而由于外部肯定是块元素，所以又不会超出容器特性。

实际作用有可以不用脚本实现文字较少水平居中，文字较多，靠左显示。

```css
.container{
text-align:center;
}
.content{
display:inline-block;
text-align:left;
}
```

- 首选最小宽度

这个简单的理解就是元素的实际宽度取决于内容的最小单元，这个优先级比width:0高。比如你设置了宽度是0，但是内容有一个汉字，就会有一个汉字的大小；为一个单词就会显示一个单词的大小。

这种实际的用途可以做各种简单的图形，比如凹凸形状的，然后内容设置为白色就可以。

```css
.ao{
width:0;
display:inline-block;
}
.ao:before{
color:#fff;
content:'love你love';
outline:2px solid #000;
}
```

- 最大宽度

最大宽度就是元素可以有的最大宽度，一般情况下我们用于限制文字或者内容特别多的情况。这样的实际场景并不多。

在这里我们只延伸两种滚动效果，一种是原生的页面或者dom滚动，另一种就是iscroll那样的设置内部元素与容器的位置关系来展现，效果更好。

## 你不知道的height常识

### height:auto

高度自动是默认配置，解释为盒子的高度随着内容的增多自动增加，不用额外配置。所以那些给元素加高度自动的童鞋要注意了，那是无用代码。

```css
div{
height:auto;//多余代码
}
```

### height：100%

height设置具体高度（px非百分比）这里就不多讲了，肯定是生效的。这里分析的是设置高度为百分比的情况。为了更好的查看效果，我们给元素增加了红色边框来查看高度的生效效果。

**备注：作为常识大家要清楚html,body默认也是height:auto的。**

- 默认情况：普通文档流，父元素height：auto

这种情况下，父元素也就是body，html高度均为自动，子元素高度设置height:100%无任何效果，原因也很简单。auto*100% 无法计算，当然是0。这点与宽度是不同的，父元素宽度为auto的时候，子元素也可以拿到宽度。

![height_auto](/css/height_auto.png)

- 普通文档流，父元素设置高度100%

特殊的元素html,body 元素设置百分比的时候参考为屏幕高度，此时html,body的任何直接子元素设置高度百分比都有效。作为常识要清楚这一点。

```css
html,body{
   height:100%;
 }
 .par2{
  border:1px solid red;
  height:50%;
  margin-top:20px;
  .par-sub{
    height:100%;
    border:1px solid gray;
  }
}
```

- 普通文档流，父元素设置高度:600px

父元素设置具体高度值时，子元素高度100%可以取到对应的父元素高度。没有任何疑问。

![height01](/css/height01.png)

- 父子元素有绝对定位关系，父元素height:auto

```css
.par4{
  border:1px solid red;
  margin-top:20px;
  position:relative;
  .par-sub{
    position:absolute;
    height:50%;
    border:1px solid gray;
    width:100%;
  }
  .extra-cont{
    height:200px;
  }
}
```

![height02](/css/height02.png)


###  max min特性

- 超越最大

作为常识我们知道!important的权重是很大的，而min- max- 设置的值比width height中设置的important还要大。

```css
//最终生效的样式为50px
.demo{
height:100px!important;
max-height:50px;
}
```

- 流体特性

流体特性主要体现在了宽度上，在我们做流体或者自适应布局的时候，通常希望设置边界。媒体查询也是部分依赖了这个原理。

下面的容器保证了主体容器100%的布局，同时也控制了边界，当容器在1000px-1400px时使用百分比，使用pc版布局,同时设定了临界高度布局。

```css
.container{
min-width:1000px;
max-width:1400px;
min-height:700px;}
```

图片具有不确定宽高的特性，尤其在移动端我们需要友好的显示同时不会出现布局错乱。所以你经常会看到下面的代码。其中height：auto!important是为了避免图片本身有高度时宽度百分比导致变形。

```css
img{
max-width:100%;
height:auto!important;}
```

## css基本位置布局

### 排版方式

#### 一 、标准文档流(position:relative)

- 标准文档流是不使用排列和定位的其他规则时，元素的排列方式。
- 排列规则如下：

>行级元素，从左到右，按照源文档的标签顺序，依次排列，其中元素的的左右间距按照元素的右外间距加上右边元素的左外间距累加。也就是实际的间距是两者的外间距之和。当一行的元素排不下时，显示到下一行。
>
>块级元素，从上到下，每行一个，上下的间距取两者当中间距较大值。


#### 二 、 浮动(float:left|right|none)

- 为了使一些具有高宽的元素能够实现水平排列，可以设置一些块级元素的排列方式为浮动，浮动是脱离标准文档流的。
- 注意事项

> 使用对象为块级元素，行级元素的水平排列不用浮动
>
>浮动分为左浮动，右浮动，none,根据需要选择
>
>需要浮动的元素需要正确的设置宽高，如果元素默认为父元素宽，是看不到浮动效果的。
>
>浮动之后的元素，会使父元素脱离文档流，获取不到正确的高度，要浮动之后清除浮动。清除浮动的方式可以参考我另一篇教程——css之浮动攻略。


#### 三 、 绝对定位（position:absolute;top|left|right|bottom）

- 需要元素固定显示在父元素的某个位置，具有特殊意义时，可以采用绝对定位的方法。绝对定位也是脱离标准文档流的。
- 注意事项
  
  > 绝对定位需要参考点，参考点需要设置position:relative,如果该元素的父元素不是参考点，那么会依次向上追溯直到能找到设置这个值的父元素为止。如果一直找不到，那么以初始化最初的body为页面的参考点。元素的数值如果设定的为百分比的，那么也是以参考点的宽高为依据。position:relative

- 绝对定位参考的坐标值。一般情况下需要两个值，一个为水平方向，一个为竖直方向。根据设定的属性来确定是参考是上下左右的那个方向。如果为三个值的时候，是可以同时实现效果，来达到某个位置的特定布局的。position:absolute;left |right|top|bottom

#### 四 、 固定位置（position :fixed ;top|bottom|left|right）

固定位置的不需要参考点，以屏幕为参考点。ie适配问题：就目前的情况而言，大部分浏览器都是支持这个属性的，可以大胆的使用，
只有ie6不适配，针对ie6需要使用hack用绝对定位来实现。语法如下：

body{background-image:url(about:blank); background-attachment:fixed;/*必要，防抖动*/}

```css
.head{position:fixed;top:0;left:0;
_position:absolute;_top:expression(eval(document.documentElement.scrollTop));
/*如果是底部*/
_bottom:expression_r(eval_r(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));
```

## 重排&&重绘

1. dom树 ：节点的树状结构
2. 渲染树 ：节点如何展示

### css图层
原理首先要了解css图层的概念，浏览器在渲染一个页面时，会将页面分为很多个图层，图层有大有小，每个图层上有一个或多个节点。在渲染DOM的时候，浏览器所做的工作实际上是：

1. 获取DOM后分割为多个图层
2. 对每个图层的节点计算样式结果（Recalculate style–样式重计算）
3. 为每个节点生成图形和位置（Layout–回流和重布局）
4. 将每个节点绘制填充到图层位图中（Paint Setup和Paint–重绘）
5. 图层作为纹理上传至GPU
6. 复合多个图层到页面上生成最终屏幕图像（Composite Layers–图层重组）


当DOM元素影响了元素的几何属性（例如宽和高），浏览器需要重新计算元素的几何属性，同样其它元素的几何属性也会和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为“重排”。
完成重排后，浏览器会重新绘制受影响的部分到屏幕上中，该过程称为“重绘”。

### 引起重排的因素
- 改变窗口大小
- 改变文字大小
- 添加/删除样式表
- 内容的改变，(用户在输入框中写入内容也会)
- 激活伪类，如:hover
- 操作class属性
- 脚本操作DOM
- 计算offsetWidth和offsetHeight
- 设置style属性

常见的重排元素枚举：	
> width	height	padding	margin
display	border-width	border	top
position	font-size	float	text-align
overflow-y	font-weight	overflow	left
font-family	line-height	vertical-align	right
clear	white-space	bottom	min-height

### 减少reflow
- 不要一条一条地修改 DOM 的样式，预先定义好 class，然后修改 DOM 的 className
- 把 DOM 离线后修改，比如：先把 DOM 给 display:none (有一次 Reflow)，然后你修改100次，然后再把它显示出来
- 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量
- 尽可能不要修改影响范围比较大的 DOM
- 为动画的元素使用绝对定位 absolute / fixed
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
- 尽可能限制reflow的影响范围，尽可能在低层级的DOM节点上，上述例子中，如果你要改变p的样式，class就不要加在div上，通过父元素去影响子元素不好。
- 避免设置大量的style属性，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow，所以最好是使用class属性
- 实现元素的动画，它的position属性，最好是设为absoulte或fixed，这样不会影响其他元素的布局
- 动画实现的速度的选择。比如实现一个动画，以1个像素为单位移动这样最平滑，但是reflow就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多。
- 不要使用table布局，因为table中某个元素旦触发了reflow，那么整个table的元素都会触发reflow。那么在不得已使用table的场合，可以设置table-layout:auto;或者是table-layout:fixed这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围
- 如果CSS里面有计算表达式，每次都会重新计算一遍，出发一次reflow

### 引起重绘的

常见的重绘元素	

> color	border-style	visibility	background
text-decoration	background-image	background-position	background-repeat
outline-color	outline	outline-style	border-radius
outline-width	box-shadow	background-size

### 如何优化重绘

css3 动画是优化的重中之重。除了做到上面两点，减少 Reflow 和 Repaints 之外，还需要注意以下方面。
启用 GPU 硬件加速：transform: translate3d(10px, 10px, 0);


## css常见样式命名规则

### 指定的格式

- 驼峰式命名

类似于.mLayerTitle这样形式的，但这个仅仅是格式，不代表命名规则，和应该如何去思考用什么名称。

- 以-格式分割开

类似于.m-layer-title ,这种格式也是很常见的。同样也是只有格式，没有命名方式的核心思想的。

### 样式组织思想


#### BEM（block+element+modify）

块级，元素，修改，它的主要设计思路是需要定义块级，对于子元素分别利用_区分，对于修饰的部分增加--实现。对于比较复杂的块级元素用-实现连接。举证如下：

```
site-nav
site-nav_logo
site-nav_login
site-nav--active
site-nav--active
```

#### OOCSS

![OOCSS](/css/OOCSS.png)

1. OOCSS是object-oriented CSS的缩写. 主要有两个意思:
    + 结构和设计分离
    + 容器和内容分离
    + 使用这种结构, 开发人员获得可以在不同地方使用的CSS类.
2. 通常这时候总是会有两个消息(一个好消息和一个不好的消息):
    + 好消息: 通过复用来减少代码量(DRY原则)
    + 不好的消息: 维护非常困难(复杂). 当你修改某一个具体的元素的样式的时候, 大部分情况下, 除了修改CSS本身(因为多数的CSS类是通用的), 你还不得不添加更多的标记类(markup).
3. 另外, OOCSS本身并不提供具体的规则, 而是抽象的建议, 所以这种方法在生产中的最终结果会有所不同.
    
    事实上, OOCSS的想法启发了其他人创建自己的, 更具体的代码结构化方式.

4. 具体的延伸就是我们将全局样式，布局、间距、模块样式区分开来，并辅以科学准确约定的方式。

#### SMACSS 可扩展和模块化结构的 CSS

![SMACSS](/css/SMACSS.png)

SMACSS是可扩展和模块化结构CSS的简称. 该方法的主要目标是减少代码量并简化代码维护.
Jonathan Snook把它归纳为5个部分:

1. 基本规则(Base rules): 为网址的主要元素设置样式, 如body, input, button, ul, ol等. 在这一步中, 我们主要使用HTML标签和属性选择器, 在特殊情况下, 使用CSS类(如: 如果您有JavaScript-Style选择);

2. 布局规则(Layout rules): 主要是些全局元素, 顶部, 页脚, 边栏等模块的大小. Jonathan建议使用ID选择器, 因为这些模块不太可能在同一个页面上出现多次. 然而, 本文作者认为这是个很不好的习惯(每当ID出现在样式文中, 感觉世界顿时变得灰暗, 有一股莫名的哀伤).

3. 模块规则(Modules rules): 模块(类似于卡片布局)可以在一个页面中使用多次. 对于模块CSS类, 不建议使用ID和tag选择器(这是为了方便重用以及上下文独立).

4. 状态规则(State rules): 在这一步中, 规定了模块的各种状态以及网站的基础部分. 这是唯一允许使用"!important"的地方.

5.主题规则(Theme rules): 设计您可能需要更换的样式.

我们推荐为属于某个组的CSS类定义命名空间, 并为JavaScript中使用的CSS类使用单独的命名空间.

#### Atomic CSS 原子 CSS

![AtomicCSS](/css/AtomicCSS.png)

- Atomic CSS是CSS架构的一种方法, 它的好处是写出基于视觉功能的小的, 单用途CSS类.这种类通常也被称为原子类。

使用Atomic CSS, 为每个可重用的属性创建单独的CSS类. 例如, margin-top: 1px; 就可以创建一个类似于mt-1的CSS类, 或者width: 200px; 对应的CSS类为w-200.这样设计可以最大程度的统一页面的共用样式，便于管理，尤其在你采用了预处理器之后，可以使用继承，拓展等方式快速使用某常用代码段或者样式模块，最大程度的减少css代码数量。

- 存在的缺点:
    + CSS类名是属性名称的描述, 而不是元素的自然语义. 这种想象很容易使人在开发过程中变得迷茫. 开发本身也十分容易复杂化.
    + 直接在HTML中进行显示设置.
    + 由于这些短板的存在, 这种做法遭到了大量的批评. 然而, 这种做法对于大型项目来说是有一定效果的.
    + 此外, Atomic CSS在各种框架中被用于校正元素样式以及某些层(layers)的其他方法.

#### MCSS 多层 CSS

![MCSS](/css/MCSS.png)

- MCSS指的是多层CSS(Multilayer CSS). 这种样式写法建议将样式分成多个部分, 每个部分称为层(layers).
    + 第0层或基础(Zero layer or foundation), 负责重置浏览器样式的代码(如: reset.css或者normalize.css);
    + 基层(Base layer), 包括可重用元素的样式: buttons, input, hints等等.
    + 项目层(Project layer), 包括单独的模块和"上下文" - 根据用户端浏览器或用于浏览的设备, 用户权限等对元素的样式进行调整.
    + 装饰层(Cosmetic layer), 使用OOCSS风格来书写样式, 对元素外观做微小的调整. 建议仅留下影响外观的风格, 而不能破坏网站的布局(例如颜色和非关键缩进等).
- 层与层之间的交互层次是非常重要的:
    + 在基层(Base layer)中定义中性的样式, 并且不影响其它层.
    + 基层(Base layer)中的元素只能影响基层的CSS类.
    + 项目层(Project layer)中的元素可以影响基层和项目层.
    + 装饰层(Cosmetic layer)是以描述性OOCSS类("atomic"类)的形式进行设计, 不会影响其他CSS代码, 而是在标记中有选择的使用.

#### AMCSS 属性模块 CSS

![AMCSS](/css/AMCSS.png)

AMCSS是"属性模块CSS"的缩写.

先让我们来看一个例子:

`<div class="button button--large button--blue">Button</div>`

如果这样写CSS类的链, 是有点复杂的, 所以让我们通过属性来为这些CSS类分组. 分组后就变成下面这样了:

`<div button="large blue">Button</div>`

为了避免属性名称冲突, 好的方式是为属性加上命名空间. 然后, 我们的button代码就变成这样了:

`&lt;div am-button=&quot;large blue&quot;&gt;Button&lt;/div&gt;`

如果您使用了验证器去检查你的代码, 并且它(验证器)不喜欢类似于am-button这样的属性名称, 你可以把属性的命名空间(am-)换成data-. 例如: data-button.

使用一个不是那么常用的选择器"~="(IE7以上都支持), 它类似于CSS类属性: 所有属性值包含指定的单词(以空格分开)的元素都会被选中. 所以, 选择器[class ~= "link"][class~= "button"]相对于选择器a.link.button. 这种选择器(选择方式)同样适用于属性.

因此, CSS代码就可以这样写:

```css
/* CSS类选择器 */
.button { ... }
.button--large { ... }
.button--blue { ... }
/* CSS属性选择器 */
[am-button] { ... }
[am-button ~= "large"] { ... }
[am-button ~= "blue"] { ... }
```

如果您认为这段代码十分的不寻常, 可以尝试使用较为温和的AMCSS 形式:

`&lt;div am-button am-button-large am-button-blue&gt;Button&lt;/div&gt;`

#### FUN

FUN代表的是"Flat hierarchy of selectors, Utility styles, Name-spaced components."

每个名称前面的字母都代表着一定的原则:

F, 选择器的扁平的层次结构: 建议使用CSS类选择元素(items), 避免不必要的级联, 杜绝使用id.

U, 实用(功能)样式: 鼓励创建原子(atomic)样式来解决典型的修正(微调)任务, 例如: w100表示width: 100%; 或者fr表示float: right;

N, 名称分割组件: Ben建议添加命名空间来指定特定模块元素的样式. 这种方法将避免类的中重叠.

一些开发人员注意到, 使用这种原则来编写CSS代码是非常方便和容易维护的; 在某种程度上, 作者汲取了SMACSS的精华, 以简单并且简洁的方式阐述了这一技术.

这种方式对项目和代码结构施加了很多的要求, 它仅仅建立了记录选择器的首选形式以及它们在标记中的使用方式. 但在小型项目中, 这些规则足以帮助构建高质量的CSS代码.

### 结论

这些样式的的设计思想中没有完全符合实际需求的，项目实践中建议根据自己的业务以及成员需求，选择合适的样式明明规则，可以是上面一种，也可以是其中几种混合的结果，最终目的都是让你的样式便于维护而已。
这里，个人建议的是用SMAC+Atomic，并且综合归结到了基本的css代码规范中。


## css常用样式名

![styleExample](/css/styleExample.png)


## css常用选择器攻略

### css3选择器分类

![selector](/css/selector.png)

### 选择器攻略

1. 基本选择器

id,class,*通配符选择器，复合选择器（选择器分组），无兼容问题

2. 层次选择器

后代选择器：e f;子选择器 e>f ;相邻兄弟选择器 e+f,只能选择之后的一个；通用兄弟选择器，e~f 之后的所有，卡可以选择多个；后面三个兼容ie7+

3. 目标伪类选择器

e:target 针对连接到的部分，兼容ie9+

4. 动态伪类

：linked,:visited,:active,:hover,:focus 其中active和focus 兼容8+支持

5. 语言伪类

:lang(en)可以针对不同语言，兼容ie8+

6. ui元素状态伪类

：checked,:enabled,:disabled ,兼容ie9+

7. 结构伪类

数量最多的一类，：first-child(css2),:last-child(css3),nth-child(n)筛选第几个，nth-last-child,nth-of-type(n),:root,:only-child,:empty ,等，兼容ie9+

8. 否定伪类

：not() 针对性排除，兼容ie9+

9. 伪元素

伪元素在新的规范中为双冒号，为了区别伪类，ie6-8只识别单冒号，写法不同，无兼容问题

10. 属性选择器

针对属性，以及属性值筛选，筛选符号为| 筛选出等于val以及以val-开始，^以val开始的，* 包含val,$以val结束，ie7+ 支持


### 解决方案

- 汇总选择器的兼容性，慎重使用，比如针对ie8+ ，可以使用的有基本选择器，层次选择器，动态伪类选择器，语言伪类选择器，伪元素，属性选择器；针对ie6 建议只使用基本选择器以及简单的伪类、伪元素、后代选择器；针对现代浏览器，所有选择器可以放心使用。整体建议还是不要为了使用新的选择器而使用，要找到对应的使用场景，多使用基本选择器能避免低版本ie的适配问题。

- 使用适配的脚本文件，实现让ie6-8ie6-8支持属性选择器，伪类选择器和伪元素。具体的支持情况根据js库来决定

```js
<!- -[if (gte IE 6)&(lte IE 8)]>
<script type="text/javascript" src="selectivizr.js"></script>
      <noscript><link rel="stylesheet" href="[fallback css]" /></noscript>
<![endif]- ->
```

- 注意事项

    + Selectivizr自动检测最佳的JavaScript库，如果你JavaScript库都没有调用，则IE下的伪类是不起作用的。
    + 样式属性必须使用&lt;link&gt;标签，以&lt;style&gt;标签定义的CSS样式是不会被解析的。
    + 由于安全原因，样式文件需以域的形式调用，像是file:是不起作用的。
    + 此效果非动态的。一旦样式被应用就被固定了，DOM改变时不会映射过去的。
    + 如果JavaScript不可以，你可以使用&lt;noscript&gt;标签调用一个用以反馈提示的样式文件。
    + Selectivizr要想在IE下起作用，需要时标准模式，请检查您的页面头部是否有DTD 。

## 理解css盒模型

> 也许你觉得盒子模型很简单，尤其在ie6怪异盒模型已经退出历史舞台的时候，但事实上并非如此，怪异盒模型仍然在不断的被前端开发者所青睐。在css3中更是增加了box-sizing这一属性来改变标准盒模型。

### 概念（box-model）

盒子模型，就是针对html标签为单位，所定义的一个形象化的展示模型，规定了元素如何处理元素内容、内边距、边框 和 外边距的方式。而整体的页面布局就是不同的盒子堆砌以及嵌套组成。

### 盒子模型的差别

目前存在的盒子分为两种，一种是w3c标准盒子，另外一种是ie6以下的怪异盒子模型。区别这两种盒子之前，看一下盒子模型中外盒和内盒的概念。

1. w3c标准的盒模型中外盒以及内盒的定义 ：
    + 外盒尺寸计算（元素空间尺寸）
    + Element空间高度 = content height + padding + border + margin
    + Element 空间宽度 = content width + padding + border + margin
    + 内盒尺寸计算（元素大小）
    + Element Height = content height + padding + border （Height为内容高度）
    + Element Width = content width + padding + border （Width为内容宽度）
2. ie传统盒模型：ie6以下，不含ie6版本。
    + 外盒尺寸计算（元素空间尺寸）
    + Element空间高度 = content Height + margin (Height包含了元素内容宽度，边框宽度，内距宽度)
    + Element空间宽度 = content Width + margin (Width包含了元素内容宽度、边框宽度、内距宽度)
    + 内盒尺寸计算（元素大小）
    + Element Height = content Height(Height包含了元素内容宽度，边框宽度，内距宽度)
    + Element Width = content Width(Width包含了元素内容宽度、边框宽度、内距宽度)
    + 可以看到 在以上的盒模型中，元素的宽高定义的非常细，两者的外盒模型是一致的，而ie的内盒模型的宽高是包括了w3c中的内盒模型的整体的,而content width=css属性的width.


### 实际使用

在目前的主流浏览器使用最新的h5文档申明之后，所参考的都是最新的w3c的盒模型，除非客户ie特别是ie6以下版本才是怪异模型。

就使用而言，现状是定义的样式宽高只包括了内容的宽高，而实际的宽高则是一个累加值。所以在定义所有元素大小时，如果宽高中有padding以及padding值时需要对应的宽高减去间距或者边框值，而这样的使用是不便于控制的。

所以在w3c的官方说明中，是这样建议的：

>  目前最好的解决方案是回避这个问题。也就是，不要给元素有指定宽度高度的元素添加内边距和边框，而是尝试将内边距或外边距添加到元素的父元素和子元素。

以上的应用也可以在大多数的网站中得到验证，在许多需要内边距或者边框的，尤其内边距的布局中，前端工程师都会多写一层类似于wrapper 的包裹元素用来解决这个问题。

### css3 box-sizing

就概念而言，ie的怪异模型是比较好控制和理解的，w3c在认识到这个问题之后，在css3中追加了改变盒模型的属性:box-sizing ，语法如下：
`box-sizing ： content-box || border-box || inherit`

中文版说明：http://www.w3help.org/zh-cn/kb/006/

在这个属性中，可以控制内盒模型按照何种方式进行显示，如果是content-box是w3c 的标准盒子，如果是border-box是ie 的怪异盒模型处理。

特别需要说明的是这个属性现代的浏览器都是支持的，但IE家族只有IE8版本以上才支持，虽然现代浏览器支持box-sizing，但有些浏览器还是需要加上自己的前缀，Mozilla需要加上-moz-，Webkit内核需要加上-webkit-，Presto内核-o-,IE8-ms-，所以box-sizing兼容浏览器时需要加上各自的前缀：

```css
/*Content box*/
  Element {
     -moz-box-sizing: content-box;  /*Firefox3.5+*/
     -webkit-box-sizing: content-box; /*Safari3.2+*/
     -o-box-sizing: content-box; /*Opera9.6*/
     -ms-box-sizing: content-box; /*IE8*/
     box-sizing: content-box; /*W3C标准(IE9+，Safari5.1+,Chrome10.0+,Opera10.6+都符合box-sizing的w3c标准语法)*/
  }       
  /*Border box*/
  Element {
     -moz-box-sizing: border-box;  /*Firefox3.5+*/
     -webkit-box-sizing: border-box; /*Safari3.2+*/
     -o-box-sizing: border-box; /*Opera9.6*/
     -ms-box-sizing: border-box; /*IE8*/
     box-sizing: border-box; /*W3C标准(IE9+，Safari5.1+,Chrome10.0+,Opera10.6+都符合box-sizing的w3c标准语法)*/
  }
```

### 总结

在综合分析和深刻理解盒模型之后，我们可以得出这样的结论：

1. 如果用户主题为ie8以上的现代浏览器，那么可以采用ie 的怪异模式来处理所有的盒模型，在boot等主流框架中也是用的这种。（最新，前端开发人员青睐的）
2. 而如果用户中确定有ie6以及ie7时，需要按照w3c的标准建议，对于有padding的固宽固高元素需要多些一层wrapper。（常用经典，但是不方便的）
3. 针对有宽高同时有padding或者边框的，将宽高的数值减去内间距以及边框的。（少用）
4. 用补丁文件 box-sizing-polyfill
    + git地址 ：https://github.com/Schepp/box-sizing-polyfill
    + 使用说明 ：box-sizing: border-box;*behavior: url(/js/boxsizing.htc); 亲测可用：`box-sizing:border-box;*behavior: url(/r/cms/www/zygw/css/boxsizing.htc);`

### 个人建议

总结中第二种方案是最稳妥的，也是目前主流网站所采用的方式。但是随着响应式布局以及w3c的不变更新优化，ie的传统模型将不断的会被更好的支持，那时将不用这么麻烦。


## css属性继承与默认值

### 属性的继承

1. 可继承的属性:
>* visibility 和 cursor 可以被所有元素继承
>* 以下只可被 内联元素 继承 : letter-spacing(伪类里的), word-spacing,white-space,line-height,color,[font家族]font,font-familly,font-weight,font-size,font-style,font-variant,font-decoration,text-transform,direction
>* 以下属性会被 块级元素 继承: text-align 和 text-indent
>* 以下属性会被 列表元素继承: list-style,list-style-type,list-style-position,list-style-image
>* 以下属性会被 表格元素继承: border-collapse

2. 不可继承的属性

> display,margin,border padding,background,height min-height,max-height,width min-width,max-width,overflow position,left,right,top,bottom z-index,float,clear table-layout,vertical-align,page-break-after,pager-break-before 和unicode-bidi[这里有几个没见过]

### 属性的默认值

每个样式都有自己的默认值，这里不多于赘述，只对宽高做特别说明，因为影响到了最关键的盒模型。

|可取值|描述|
|--|--|
|auto	|默认值。浏览器可计算出实际的宽度|
|length|	使用 px、cm 等单位定义宽度|
|%	|定义基于包含块（父元素）宽度的百分比宽度|
|inherit	|规定应该从父元素继承 width 属性的值|

具体说明如下，请务必清楚每个值的情况 以便你实现正确的盒模型，而且能简化代码。

1. div标签的适用情况（普通文档流）：
父标签div 子标签div
下面分析 宽度：
width: 100%;父标签 的100%；
width:inherit;父标签 的100%；
width:initial;父标签 的100%；默认值auto，不写也是可以的；
下面分析高度：
height: 100%;父标签 的100%；
height:inherit;父标签 的100%；
height:initial;默认值,根据内容的高度auto；如果需要设置 那么height：100%；
2. 绝对定位 （脱离文档流）：

下面分析 宽度：
+ width: 100%;定位点标签宽度 的100%；如果需要设置，那么把父标签定义为定位点
+ width:inherit;父标签 的100%；
+ width:initial;内容宽度；默认值auto，；如果需要设置 那么width：100%；

下面分析高度：
+ height: 100%;定位点标签高度 的100%；如果需要设置，那么把父标签定义为定位点
+ height:inherit;父标签 的100%；
+ height:initial;默认值,根据内容的高度auto；如果需要设置 那么height：100%；

3. 备注 ：

如果定位点错误的时候，height:100%所取的不是父标签的高度而是定位点标签的高度。