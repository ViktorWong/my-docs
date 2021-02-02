# 性能优化

## 网络相关

### DNS 预解析

DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP。

```html
<link rel="dns-prefetch" href="//yuchengkai.cn">
```

### 缓存

缓存对于前端性能优化来说是个很重要的点，良好的缓存策略可以降低资源的重复加载提高网页的整体加载速度。

通常浏览器缓存策略分为两种：强缓存和协商缓存。

#### 强缓存

实现强缓存可以通过两种响应头实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，`state code` 为 200

```js
Expires: Wed, 22 Oct 2018 08:41:00 GMT
```

`Expires` 是 HTTP / 1.0 的产物，表示资源会在 `Wed, 22 Oct 2018 08:41:00 GMT` 后过期，需要再次请求。并且 `Expires` 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。

```js
Cache-control: max-age=30
```

`Cache-Control` 出现于 HTTP / 1.1，优先级高于 `Expires` 。该属性表示资源会在 30 秒后过期，需要再次请求。

#### 协商缓存

如果缓存过期了，我们就可以使用协商缓存来解决问题。协商缓存需要请求，如果缓存有效会返回 304。

协商缓存需要客户端和服务端共同实现，和强缓存一样，也有两种实现方式。

##### Last-Modified 和 If-Modified-Since

`Last-Modified` 表示本地文件最后修改日期，`If-Modified-Since` 会将 `Last-Modified` 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。

但是如果在本地打开缓存文件，就会造成 `Last-Modified` 被修改，所以在 HTTP / 1.1 出现了 `ETag` 。

##### ETag 和 If-None-Match

`ETag` 类似于文件指纹，`If-None-Match` 会将当前 `ETag` 发送给服务器，询问该资源 `ETag` 是否变动，有变动的话就将新的资源发送回来。并且 `ETag` 优先级比 `Last-Modified` 高。

#### 选择合适的缓存策略

对于大部分的场景都可以使用强缓存配合协商缓存解决，但是在一些特殊的地方可能需要选择特殊的缓存策略

- 对于某些不需要缓存的资源，可以使用 `Cache-control: no-store` ，表示该资源不需要缓存
- 对于频繁变动的资源，可以使用 `Cache-Control: no-cache` 并配合 `ETag` 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新。
- 对于代码文件来说，通常使用 `Cache-Control: max-age=31536000` 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件。

### 使用 HTTP / 2.0

因为浏览器会有并发请求限制，在 HTTP / 1.1 时代，每个请求都需要建立和断开，消耗了好几个 RTT 时间，并且由于 TCP 慢启动的原因，加载体积大的文件会需要更多的时间。

在  HTTP / 2.0 中引入了多路复用，能够让多个请求使用同一个 TCP 链接，极大的加快了网页的加载速度。并且还支持 Header 压缩，进一步的减少了请求的数据大小。


### 预加载

在开发中，可能会遇到这样的情况。有些资源不需要马上用到，但是希望尽早获取，这时候就可以使用预加载。

预加载其实是声明式的 `fetch` ，强制浏览器请求资源，并且不会阻塞 `onload` 事件，可以使用以下代码开启预加载

```html
<link rel="preload" href="http://example.com">
```

预加载可以一定程度上降低首屏的加载时间，因为可以将一些不影响首屏但重要的文件延后加载，唯一缺点就是兼容性不好。

### 预渲染

可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染

```html
<link rel="prerender" href="http://example.com"> 
```

预渲染虽然可以提高页面的加载速度，但是要确保该页面百分百会被用户在之后打开，否则就白白浪费资源去渲染

## PWA 离线缓存

### 主线程

`ServiceWorker`既然命名为`worker`，很大一部分原因就是它和`WebWorker`相关。它是第二个线程，不会影响 dom 渲染的主线程，两个`Worker`之间的通讯是基于`postMessage`。
`chrome://inspect/#service-workers` 就可以查看，在当前浏览器中，正在注册的 `SW`。另外，还有一个 `chrome://serviceworker-internals`，用来查看当前浏览器中，所有注册好的 `SW`。

### 基于 HTTPS

`SW` 是基于 `HTTPS` 的，如果你的网站不是 `HTTPS`，那么基本上你也别想了 `SW`。

### Scope 作用域

一个`sw.js`并不能接管一个站点所有的页面，它只能在所在路由底下起到作用。意思就是如果你在`//example.com/foo/bar.js`里注册了一个 `SW`，那么它默认的作用域为`//example.com/foo/`。

### 生命周期

#### register

`ServiceWorker.js`(又名`sw.js`)是一个独立 js，页面注册在浏览器支持的情况下，注册 sw.js 来控制`Service Worker`缓存。`register`将会触发安装声明周期。

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function(registration) {
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope
      )
    })
    .catch(function(err) {
      console.log('ServiceWorker registration failed: ', err)
    })
}
```

#### install

`register`完成后会触发`install`的生命周期，把设置好的静态文件，采用`Service Worker`的缓存方式，使用了`Cache API`来将资源缓存起来，同时使用 `e.waitUntil` 接手一个`Promise`来等待资源缓存成功，等到这个`Promise`状态成功后，`ServiceWorker`进入`installed`状态，意味着安装完毕。这时候主线程中返回的`registration.waiting`属性代表进入`installed`状态的`ServiceWorker`。

```js
var CACHE_NAME = 'my_cache'
var urlsToCache = ['/index.html', '/css/style.css', '/js/script.js']
//这里的self代表ServiceWorkerGlobalScope
self.addEventListener('install', function(event) {
  //这里的waitUtil会在安装成功之前执行一些预装的操作，但是只建议做一些轻量级和非常重要资源的缓存，减少安装失败的概率。安装成功
  //后ServiceWorker状态会从installing变为installed
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opendhe : ', cache)
      return cache.addAll(urlsToCache)
    })
  )
})
```

#### skipWaiting
`skipWaiting()`意味着新 `SW` 控制了之前用旧 `SW` 获取的页面，也就是说你的页面有一部分资源是通过旧 `SW` 获取，剩下一部分是通过新 `SW` 获取.

#### activate
安装完，则会进入激活状态。如果之前已有`ServiceWorker`，这个版本只是对`ServiceWorker`进行了更新。如果你在`event.waitUntil()`中传入了一个 `Promise`，`SW` 将会缓存住功能性事件(`fetch`,`push`,`sync`等等)，直到 `Promise` 返回 `resolve` 的时候再触发，也就是说，当你的`fetch`事件被触发的时候，`SW` 已经被完全激活了。

```js
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      // V2控制缓存
    })
  );
});
```

#### fetch
`fetch`请求是有别于`xhr`请求，`sw`提供监听拦截`fetch`的事件，对于命中缓存的数据可以直接返回请求。当接受到 `fetch` 请求时，会直接返回`event.respondWith` 得到`Promise` 结果。这样我们可以捕获页面所有的 `fetch` 请求。

```js
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

#### Redundant
`Service Worker` 可能因为以下之一的原因而被废弃（redundant，原意为“多余的，累赘的”）

- `installing` 事件失败
- `activating` 事件失败
- 新的 `Service Worker` 替换其成为激活态 `worker`

浏览器获取了新版本的`ServiceWorker`代码，如果浏览器本身对`sw.js`进行缓存的话，也不会得到最新代码，所有代码会变成死代码，无法更新。所以对`sw`文件最好配置成`cache-control: no-cache`。



## 优化渲染过程

### 懒执行

懒执行就是将某些逻辑延迟到使用时再计算。该技术可以用于首屏优化，对于某些耗时逻辑并不需要在首屏就使用的，就可以使用懒执行。懒执行需要唤醒，一般可以通过定时器或者事件的调用来唤醒。

### 懒加载

懒加载就是将不关键的资源延后加载。
懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西。

将页面里所有 img 属性 src 属性用 data-xx 代替，当页面滚动直至此图片出现在可视区域时，用 js 取到该图片的 data-xx 的值赋给 src，这样图片就会去下载资源，实现了图片懒加载。

懒加载不仅可以用于图片，也可以使用在别的资源上。比如进入可视区域才开始播放视频等等。

```
页可见区域宽： document.body.clientWidth;
网页可见区域高： document.body.clientHeight;
网页可见区域宽： document.body.offsetWidth (包括边线的宽);
网页可见区域高： document.body.offsetHeight (包括边线的宽);
网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;
网页被卷去的高： document.body.scrollTop;
网页被卷去的左： document.body.scrollLeft;
网页正文部分上： window.screenTop;
网页正文部分左： window.screenLeft;
屏幕分辨率的高： window.screen.height;
屏幕分辨率的宽： window.screen.width;
屏幕可用工作区高度： window.screen.availHeight;
```

## 文件优化

### 图片优化

#### 计算图片大小

对于一张 100 * 100 像素的图片来说，图像上有 10000 个像素点，如果每个像素的值是 RGBA 存储的话，那么也就是说每个像素有 4 个通道，每个通道 1 个字节（8 位 = 1个字节），所以该图片大小大概为 39KB（10000 * 1 * 4 / 1024）。

但是在实际项目中，一张图片可能并不需要使用那么多颜色去显示，我们可以通过减少每个像素的调色板来相应缩小图片的大小。

了解了如何计算图片大小的知识，那么对于如何优化图片，想必大家已经有 2 个思路了：

- 减少像素点
- 减少每个像素点能够显示的颜色

#### 图片加载优化

1. 不用图片。很多时候会使用到很多修饰类图片，其实这类修饰图片完全可以用 CSS 去代替。
2. 对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。一般图片都用 CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。
3. 小图使用 base64 格式
4. 将多个图标文件整合到一张图片中（雪碧图）
6. 选择正确的图片格式：
   - 对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好
   - 小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替
   - 照片使用 JPEG

### 其他文件优化

- CSS 文件放在 `head` 中
- 服务端开启文件压缩功能
- 将 `script` 标签放在 `body` 底部，因为 JS 文件执行会阻塞渲染。当然也可以把 `script` 标签放在任意位置然后加上 `defer` ，表示该文件会并行下载，但是会放到 HTML 解析完成后顺序执行。对于没有任何依赖的 JS 文件可以加上 `async` ，表示加载和渲染后续文档元素的过程将和  JS 文件的加载与执行并行无序进行。
- 执行 JS 代码过长会卡住渲染，对于需要很多时间计算的代码可以考虑使用 `Webworker`。`Webworker` 可以让我们另开一个线程执行脚本而不影响渲染。

### CDN

静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie。
