import projectConfig from '/pagic.config.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "advanced/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "advanced/index.html",
    'title': "进阶功法",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<!--\nAuthor: Viktor (victor318x@gmail.com)\nREADME.md (c) 2021\nDesc: description\nCreated:  2021/2/2 下午4:49:15\nModified: 2021/2/2 下午4:49:18\n-->\n<h1 id="%E8%BF%9B%E9%98%B6%E5%8A%9F%E6%B3%95">进阶功法<a class="anchor" href="#%E8%BF%9B%E9%98%B6%E5%8A%9F%E6%B3%95">§</a></h1>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<!--\nAuthor: Viktor (victor318x@gmail.com)\nREADME.md (c) 2021\nDesc: description\nCreated:  2021/2/2 下午4:49:15\nModified: 2021/2/2 下午4:49:18\n-->\n<h1 id="%E8%BF%9B%E9%98%B6%E5%8A%9F%E6%B3%95">进阶功法<a class="anchor" href="#%E8%BF%9B%E9%98%B6%E5%8A%9F%E6%B3%95">§</a></h1>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%BF%9B%E9%98%B6%E5%8A%9F%E6%B3%95" }, "\u8FDB\u9636\u529F\u6CD5")))),
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T11:06:31.000Z",
    'updated': null,
    'excerpt': "进阶功法",
    'cover': undefined,
    'sidebar': [
        {
            "text": "进阶功法",
            "link": "advanced/index.html",
            "pagePath": "advanced/README.md"
        }
    ],
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "advanced/index.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "\u8FDB\u9636\u529F\u6CD5" })
};
