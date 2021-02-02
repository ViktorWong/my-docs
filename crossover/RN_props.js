import projectConfig from '/pagic.config.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "crossover/RN.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "crossover/RN.html",
    'title': "React Native",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1 id="react-native">React Native<a class="anchor" href="#react-native">§</a></h1>\n<h2 id="%E4%BC%98%E5%8A%BF">优势<a class="anchor" href="#%E4%BC%98%E5%8A%BF">§</a></h2>\n<ul>\n<li>跨平台 （只有 0.2% 的平台特定代码）</li>\n<li>统一的设计语言，同时还能为不同平台提供不同设计</li>\n<li>React 的 scale 很好。组件化，简单的生命周期,声明式</li>\n<li>迭代速度快（主要是 hot reloading 很快）</li>\n<li>大量基础设施的投入值得（网络、国际化、复杂动画、设备信息、用户信息等等都是通过一- 个桥把原生 api 暴露给 RN 的。）</li>\n<li>同时他们在这里也指出：他们并不相信在一个已有 app 上集成 RN 是一件简单事儿，必须- 要大量且持续地投入基础设施才行（说好的「满意的地方」呢）</li>\n<li>性能 （尽管大家都担心但是其实基本没有问题）</li>\n<li>不过首次渲染比较慢，导致不适合用作启动屏、deeplink，也增加了可交互时间（TTI），另外掉帧不好 debug（说好的「满意的地方」呢）</li>\n<li>Redux（好用，虽然废话太多）</li>\n<li>背后是原生，一些曾经不确定能不能做的功能（Shared element transitions、动画库 Lottie、网络层、核心基础设施）发现都能做</li>\n<li>静态分析（eslint，prettier，一些性能检测）</li>\n<li>动画</li>\n<li>JS/React 的开源生态</li>\n<li>Flexbox</li>\n<li>有时候可以加上 Web 跨三端</li>\n</ul>\n<h2 id="%E5%8A%A3%E5%8A%BF">劣势<a class="anchor" href="#%E5%8A%A3%E5%8A%BF">§</a></h2>\n<ul>\n<li>论成熟度，稳定性，RN 比 不上 iOS 和 Android 原生。</li>\n<li>由于 RN 的 Bug，有时我们必须维护自己的一个 RN 分支。</li>\n<li>JS 缺少类型系统，Flow 太严格，TS 集成到已有项目也还有问题。</li>\n<li>不好重构（JS 没有类型无法静态分析，重构引起的错误不能在编译时被捕捉到）</li>\n<li>JavaScriptCore 不一致性，更糟糕的是，现在都 8102 年了，RN （Android）带的还是不支持 ES 6 的 JSC</li>\n<li>RN 开源库质量参差不齐。比如在 iOS 上正常的库在 Android 上可能有意想不到的错误（因为为作者也许只熟悉 iOS 和 RN,并不熟悉 Android）\n有时不得不白手起家，因为很多的基础框架中的库还没有 的 RN 封装。</li>\n<li>崩溃监控库在 RN 上表现不是特别特定业。内没方案，只能自己搞。</li>\n<li>Native Bridge 的由于 JS 的弱类型造成 Native 与 JS 通信 中类型的不匹配，容易造成错误。</li>\n<li>启动时间，RN 框架初始化需要几秒，即使是在高端机器上。</li>\n<li>新开页面的渲染时间，0.4 秒左右页面第一次渲染费时。</li>\n<li>APP 大小。至少增加 12M。</li>\n<li>直到目前都无法在 Android 上支持 64 位。</li>\n<li>手势，iOS 和 Android 的手势 API 差距很大，不过喜闻 react-native-gesture-handler 发布了 1.0 版本。</li>\n<li>长列表，虽然 RN 团队很努力了，但是由于 RN 的异步通信机制，长列表的流畅渲染，目前依然无解。</li>\n<li>React Native 升级是个坑。</li>\n<li>RN 中的 Accessibility 就是个大坑。</li>\n<li>还有一些奇怪的 Bug，暂没有修复。</li>\n<li>SavedInstanceState 在 Android 上跨进程的坑。</li>\n</ul>\n<h2 id="%E4%B8%8D%E6%98%AF%E6%8A%80%E6%9C%AF%E9%97%AE%E9%A2%98%E7%9A%84%E9%97%AE%E9%A2%98">不是技术问题的问题<a class="anchor" href="#%E4%B8%8D%E6%98%AF%E6%8A%80%E6%9C%AF%E9%97%AE%E9%A2%98%E7%9A%84%E9%97%AE%E9%A2%98">§</a></h2>\n<ul>\n<li>要用好 RN 你必须同时熟悉 iOS 和 Android ，当然还有 RN 本身，这就对我们工程师提出了更多挑战。</li>\n<li>团队的管理，责任的划分。</li>\n<li>RN 文档及相关资源不如 iOS 和 Android 的丰富。</li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0", id: "react-native" },
        "React Native",
        React.createElement("a", { className: "anchor", href: "#react-native" }, "\u00A7")),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="%E4%BC%98%E5%8A%BF">优势<a class="anchor" href="#%E4%BC%98%E5%8A%BF">§</a></h2>\n<ul>\n<li>跨平台 （只有 0.2% 的平台特定代码）</li>\n<li>统一的设计语言，同时还能为不同平台提供不同设计</li>\n<li>React 的 scale 很好。组件化，简单的生命周期,声明式</li>\n<li>迭代速度快（主要是 hot reloading 很快）</li>\n<li>大量基础设施的投入值得（网络、国际化、复杂动画、设备信息、用户信息等等都是通过一- 个桥把原生 api 暴露给 RN 的。）</li>\n<li>同时他们在这里也指出：他们并不相信在一个已有 app 上集成 RN 是一件简单事儿，必须- 要大量且持续地投入基础设施才行（说好的「满意的地方」呢）</li>\n<li>性能 （尽管大家都担心但是其实基本没有问题）</li>\n<li>不过首次渲染比较慢，导致不适合用作启动屏、deeplink，也增加了可交互时间（TTI），另外掉帧不好 debug（说好的「满意的地方」呢）</li>\n<li>Redux（好用，虽然废话太多）</li>\n<li>背后是原生，一些曾经不确定能不能做的功能（Shared element transitions、动画库 Lottie、网络层、核心基础设施）发现都能做</li>\n<li>静态分析（eslint，prettier，一些性能检测）</li>\n<li>动画</li>\n<li>JS/React 的开源生态</li>\n<li>Flexbox</li>\n<li>有时候可以加上 Web 跨三端</li>\n</ul>\n<h2 id="%E5%8A%A3%E5%8A%BF">劣势<a class="anchor" href="#%E5%8A%A3%E5%8A%BF">§</a></h2>\n<ul>\n<li>论成熟度，稳定性，RN 比 不上 iOS 和 Android 原生。</li>\n<li>由于 RN 的 Bug，有时我们必须维护自己的一个 RN 分支。</li>\n<li>JS 缺少类型系统，Flow 太严格，TS 集成到已有项目也还有问题。</li>\n<li>不好重构（JS 没有类型无法静态分析，重构引起的错误不能在编译时被捕捉到）</li>\n<li>JavaScriptCore 不一致性，更糟糕的是，现在都 8102 年了，RN （Android）带的还是不支持 ES 6 的 JSC</li>\n<li>RN 开源库质量参差不齐。比如在 iOS 上正常的库在 Android 上可能有意想不到的错误（因为为作者也许只熟悉 iOS 和 RN,并不熟悉 Android）\n有时不得不白手起家，因为很多的基础框架中的库还没有 的 RN 封装。</li>\n<li>崩溃监控库在 RN 上表现不是特别特定业。内没方案，只能自己搞。</li>\n<li>Native Bridge 的由于 JS 的弱类型造成 Native 与 JS 通信 中类型的不匹配，容易造成错误。</li>\n<li>启动时间，RN 框架初始化需要几秒，即使是在高端机器上。</li>\n<li>新开页面的渲染时间，0.4 秒左右页面第一次渲染费时。</li>\n<li>APP 大小。至少增加 12M。</li>\n<li>直到目前都无法在 Android 上支持 64 位。</li>\n<li>手势，iOS 和 Android 的手势 API 差距很大，不过喜闻 react-native-gesture-handler 发布了 1.0 版本。</li>\n<li>长列表，虽然 RN 团队很努力了，但是由于 RN 的异步通信机制，长列表的流畅渲染，目前依然无解。</li>\n<li>React Native 升级是个坑。</li>\n<li>RN 中的 Accessibility 就是个大坑。</li>\n<li>还有一些奇怪的 Bug，暂没有修复。</li>\n<li>SavedInstanceState 在 Android 上跨进程的坑。</li>\n</ul>\n<h2 id="%E4%B8%8D%E6%98%AF%E6%8A%80%E6%9C%AF%E9%97%AE%E9%A2%98%E7%9A%84%E9%97%AE%E9%A2%98">不是技术问题的问题<a class="anchor" href="#%E4%B8%8D%E6%98%AF%E6%8A%80%E6%9C%AF%E9%97%AE%E9%A2%98%E7%9A%84%E9%97%AE%E9%A2%98">§</a></h2>\n<ul>\n<li>要用好 RN 你必须同时熟悉 iOS 和 Android ，当然还有 RN 本身，这就对我们工程师提出了更多挑战。</li>\n<li>团队的管理，责任的划分。</li>\n<li>RN 文档及相关资源不如 iOS 和 Android 的丰富。</li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#react-native" }, "React Native"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E4%BC%98%E5%8A%BF" }, "\u4F18\u52BF")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E5%8A%A3%E5%8A%BF" }, "\u52A3\u52BF")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E4%B8%8D%E6%98%AF%E6%8A%80%E6%9C%AF%E9%97%AE%E9%A2%98%E7%9A%84%E9%97%AE%E9%A2%98" }, "\u4E0D\u662F\u6280\u672F\u95EE\u9898\u7684\u95EE\u9898")))))),
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T10:42:36.000Z",
    'updated': null,
    'excerpt': "优势 - 跨平台 （只有 0.2% 的平台特定代码） - 统一的设计语言，同时还能为不同平台提供不同设计 - React 的 scale 很好。组件化，简单的生命周期,声明式 - 迭代速度快（主要是 hot reloading 很快） - 大量基础设施的投入值得...",
    'cover': undefined,
    'sidebar': [
        {
            "link": "crossover/RN.html",
            "title": "ReactNative",
            "children": [],
            "pagePath": "crossover/RN.md",
            "text": "React Native"
        }
    ],
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "crossover/RN.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "React Native" })
};
