import projectConfig from '/pagic.config.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': {
        "text": "代码重构经验",
        "link": "start/Codeing.html"
    },
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "start/Mobx.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "start/Mobx.html",
    'title': "Mobx",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1 id="mobx">Mobx<a class="anchor" href="#mobx">§</a></h1>\n<p>作为一个数据层框架，mobx 基于一个最简单的原则：</p>\n<blockquote>\n<p>当应用状态更新时，所有依赖于这些应用状态的监听者（包括 UI、服务端数据同步函数等），都应该自动得到细粒度地更新。</p>\n</blockquote>\n<p>在使用 mobx 作为 react 的 store 时，我们该如何进行渲染性能优化呢？\n通过分析源代码发现，在使用@observer 将 react 组件转换成一个监听者(Reactions)后，mobx 会为 react 组件提供一个精确的、细粒度的 shouldComponentUpdate 函数:</p>\n<pre class="language-js"><code class="language-js"><span class="token function-variable function">shouldComponentUpdate</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nextProps<span class="token punctuation">,</span> nextState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token spread operator">...</span><span class="token spread operator">...</span>\n  <span class="token comment">// update on any state changes (as is the default)</span>\n  <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">!==</span> nextState<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// update if props are shallowly not equal</span>\n  <span class="token keyword control-flow">return</span> <span class="token function">isObjectShallowModified</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">props</span><span class="token punctuation">,</span> nextProps<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>借助于 mobx 框架对 Observable 变量引用的跟踪和依赖收集，mobx 能够精确地得到 react 组件对 Observable 变量的依赖图谱，然后再用经典的 ShallowCompare 实现细粒度的 shouldComponentUpdate 函数，以达到 100%无浪费 render。这一切都是自动完成地，fantastic！使用 mobx 后，我们再也无需手动写 shouldComponentUpdate 函数了。</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(React.Fragment, { key: ".0" },
            React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
            React.createElement("script", { src: "/assets/custom.js" })),
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0", id: "mobx" },
        "Mobx",
        React.createElement("a", { className: "anchor", href: "#mobx" }, "\u00A7")),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>作为一个数据层框架，mobx 基于一个最简单的原则：</p>\n<blockquote>\n<p>当应用状态更新时，所有依赖于这些应用状态的监听者（包括 UI、服务端数据同步函数等），都应该自动得到细粒度地更新。</p>\n</blockquote>\n<p>在使用 mobx 作为 react 的 store 时，我们该如何进行渲染性能优化呢？\n通过分析源代码发现，在使用@observer 将 react 组件转换成一个监听者(Reactions)后，mobx 会为 react 组件提供一个精确的、细粒度的 shouldComponentUpdate 函数:</p>\n<pre class="language-js"><code class="language-js"><span class="token function-variable function">shouldComponentUpdate</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nextProps<span class="token punctuation">,</span> nextState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token spread operator">...</span><span class="token spread operator">...</span>\n  <span class="token comment">// update on any state changes (as is the default)</span>\n  <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">!==</span> nextState<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// update if props are shallowly not equal</span>\n  <span class="token keyword control-flow">return</span> <span class="token function">isObjectShallowModified</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">props</span><span class="token punctuation">,</span> nextProps<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>借助于 mobx 框架对 Observable 变量引用的跟踪和依赖收集，mobx 能够精确地得到 react 组件对 Observable 变量的依赖图谱，然后再用经典的 ShallowCompare 实现细粒度的 shouldComponentUpdate 函数，以达到 100%无浪费 render。这一切都是自动完成地，fantastic！使用 mobx 后，我们再也无需手动写 shouldComponentUpdate 函数了。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#mobx" }, "Mobx")))),
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T10:00:08.000Z",
    'updated': null,
    'excerpt': "作为一个数据层框架，mobx 基于一个最简单的原则： 在使用 mobx 作为 react 的 store 时，我们该如何进行渲染性能优化呢？ 通过分析源代码发现，在使用@observer 将 react 组件转换成一个监听者(Reactions)后，mobx 会为 react...",
    'cover': undefined,
    'sidebar': [
        {
            "text": "CSS 入门",
            "link": "start/CSS.html",
            "pagePath": "start/CSS.md"
        },
        {
            "text": "CSS3新特性",
            "link": "start/CSS3.html",
            "pagePath": "start/CSS3.md"
        },
        {
            "text": "深入 JavaScript",
            "link": "start/JS.html",
            "pagePath": "start/JS.md"
        },
        {
            "text": "移动端常见问题",
            "link": "start/Mobile.html",
            "pagePath": "start/Mobile.md"
        },
        {
            "text": "性能优化",
            "link": "start/Performance.html",
            "pagePath": "start/Performance.md"
        },
        {
            "text": "代码重构经验",
            "link": "start/Codeing.html",
            "pagePath": "start/Codeing.md"
        },
        {
            "text": "Mobx",
            "link": "start/Mobx.html",
            "pagePath": "start/Mobx.md"
        }
    ],
    'blog': {
        "isPost": false,
        "posts": [],
        "categories": [],
        "tags": []
    },
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "start/Mobx.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "Mobx" })
};
