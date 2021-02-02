import projectConfig from '/pagic.config.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': {
        "text": "CSS 入门",
        "link": "start/CSS.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "start/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "start/index.html",
    'title': "修仙入门",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<!--\nAuthor: Viktor (victor318x@gmail.com)\nREADME.md (c) 2021\nDesc: description\nCreated:  2021/2/2 下午7:15:12\nModified: 2021/2/2 下午7:15:20\n-->\n<h1 id="%E4%BF%AE%E4%BB%99%E5%85%A5%E9%97%A8">修仙入门<a class="anchor" href="#%E4%BF%AE%E4%BB%99%E5%85%A5%E9%97%A8">§</a></h1>'
        } }),
    'head': React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<!--\nAuthor: Viktor (victor318x@gmail.com)\nREADME.md (c) 2021\nDesc: description\nCreated:  2021/2/2 下午7:15:12\nModified: 2021/2/2 下午7:15:20\n-->\n<h1 id="%E4%BF%AE%E4%BB%99%E5%85%A5%E9%97%A8">修仙入门<a class="anchor" href="#%E4%BF%AE%E4%BB%99%E5%85%A5%E9%97%A8">§</a></h1>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BF%AE%E4%BB%99%E5%85%A5%E9%97%A8" }, "\u4FEE\u4ED9\u5165\u95E8")))),
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T11:21:57.000Z",
    'updated': null,
    'excerpt': "修仙入门",
    'cover': undefined,
    'sidebar': [
        {
            "link": "start/index.html",
            "title": "修仙入门",
            "children": [
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
            "pagePath": "start/README.md",
            "text": "修仙入门"
        }
    ],
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "start/index.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "\u4FEE\u4ED9\u5165\u95E8" })
};
