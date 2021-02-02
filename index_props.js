import projectConfig from '/pagic.config.js';
import Gitalk from '/_gitalk.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: ''
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
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: ''
        } }),
    'toc': null,
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T10:00:08.000Z",
    'updated': null,
    'excerpt': "",
    'cover': undefined,
    'home': true,
    'heroImage': "/home.svg",
    'heroText': "Full Stack Library",
    'tagline': "绘 Web 全栈架构师图谱，打造个人核心竞争力， 🙏🙏🙏 项目正在努力建设中，请持续关注 🙏🙏🙏",
    'actionText': "开始修炼 →",
    'actionLink': "/Js/",
    'features': [
        {
            "title": "愿景",
            "details": "主要帮助前端开发人员进阶Web全栈架构师，做到先精后广，一专多长！内容涵盖深入Vue、React、Node、小程序、微信公众号开发、React-native、Flutter、Hybrid、区块链、工程化、自动化测试、数据结构与算法等等,助你职场路上披荆斩棘。"
        },
        {
            "title": "如何成为Web全栈架构师",
            "details": "如果你和我一样是个凡人，那么想成长为全栈架构师，只能从少到多、慢慢积累知识和经验。这里我推荐采用“先精后广，一专多长”的流程来学习。采用这种方式来学习，不光可以触类旁通、举一反三，还让我们学习得更快，而且循序渐进更符合一般人的职业生涯发展。"
        },
        {
            "title": "开源",
            "details": "本数字图书馆旨在搜集整理互联网优质内容，系统梳理全栈开发进阶知识脉络，本着开源的原则，帮助coder掌握Web全栈主流干货技术，掌握互联网核心技术硬技能，掌握架构师成长的核心软技能。"
        }
    ],
    'footer': "MIT Licensed | Copyright © 2019-2021 ViktorHub",
    'blog': {
        "isPost": false,
        "posts": [],
        "categories": [],
        "tags": []
    },
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "index.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: undefined })
};
