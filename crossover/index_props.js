import projectConfig from '/pagic.config.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': {
        "text": "React Native",
        "link": "crossover/RN.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "crossover/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "crossover/index.html",
    'title': "跨界码王",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<!--\nAuthor: Viktor (victor318x@gmail.com)\nREADME.md (c) 2021\nDesc: description\nCreated:  2021/2/2 下午7:16:47\nModified: 2021/2/2 下午7:17:40\n-->\n<h1 id="%E8%B7%A8%E7%95%8C%E7%A0%81%E7%8E%8B">跨界码王<a class="anchor" href="#%E8%B7%A8%E7%95%8C%E7%A0%81%E7%8E%8B">§</a></h1>'
        } }),
    'head': React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<!--\nAuthor: Viktor (victor318x@gmail.com)\nREADME.md (c) 2021\nDesc: description\nCreated:  2021/2/2 下午7:16:47\nModified: 2021/2/2 下午7:17:40\n-->\n<h1 id="%E8%B7%A8%E7%95%8C%E7%A0%81%E7%8E%8B">跨界码王<a class="anchor" href="#%E8%B7%A8%E7%95%8C%E7%A0%81%E7%8E%8B">§</a></h1>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%B7%A8%E7%95%8C%E7%A0%81%E7%8E%8B" }, "\u8DE8\u754C\u7801\u738B")))),
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T11:21:57.000Z",
    'updated': null,
    'excerpt': "跨界码王",
    'cover': undefined,
    'sidebar': [
        {
            "link": "crossover/index.html",
            "title": "ReactNative",
            "children": [
                {
                    "text": "React Native",
                    "link": "crossover/RN.html",
                    "pagePath": "crossover/RN.md"
                }
            ],
            "pagePath": "crossover/README.md",
            "text": "跨界码王"
        }
    ],
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "crossover/index.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "\u8DE8\u754C\u7801\u738B" })
};
