import projectConfig from '/pagic.config.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': {
        "text": "面霸心经",
        "link": "interview/index.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "interview/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "interview/index.html",
    'title': "面霸心经",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1 id="%E9%9D%A2%E9%9C%B8%E5%BF%83%E7%BB%8F">面霸心经<a class="anchor" href="#%E9%9D%A2%E9%9C%B8%E5%BF%83%E7%BB%8F">§</a></h1>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("script", { async: true, "data-ad-client": "ca-pub-5052023368276507", src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0", id: "%E9%9D%A2%E9%9C%B8%E5%BF%83%E7%BB%8F" },
        "\u9762\u9738\u5FC3\u7ECF",
        React.createElement("a", { className: "anchor", href: "#%E9%9D%A2%E9%9C%B8%E5%BF%83%E7%BB%8F" }, "\u00A7")),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: ''
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E9%9D%A2%E9%9C%B8%E5%BF%83%E7%BB%8F" }, "\u9762\u9738\u5FC3\u7ECF")))),
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T15:43:32.000Z",
    'updated': null,
    'excerpt': "",
    'cover': undefined,
    'sidebar': [
        {
            "link": "interview/index.html",
            "title": "面霸心经",
            "children": [
                {
                    "text": "面霸心经",
                    "link": "interview/index.html",
                    "pagePath": "interview/README.md"
                },
                {
                    "text": "01.阿里篇",
                    "link": "interview/Alibaba.html",
                    "pagePath": "interview/Alibaba.md"
                },
                {
                    "text": "网络",
                    "link": "interview/HTTP.html",
                    "pagePath": "interview/HTTP.md"
                },
                {
                    "text": "数据结构",
                    "link": "interview/DataStructure.html",
                    "pagePath": "interview/DataStructure.md"
                },
                {
                    "text": "算法",
                    "link": "interview/Algorithm.html",
                    "pagePath": "interview/Algorithm.md"
                }
            ],
            "pagePath": "interview/README.md",
            "text": "面霸心经"
        }
    ],
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "interview/index.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "\u9762\u9738\u5FC3\u7ECF" })
};
