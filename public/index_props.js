import projectConfig from '/pagic.config.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "Hello world",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1 id="hello-world">Hello world<a class="anchor" href="#hello-world">§</a></h1>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-45256157-14" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
            React.createElement("script", { src: "/assets/custom.js" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0", id: "hello-world" },
        "Hello world",
        React.createElement("a", { className: "anchor", href: "#hello-world" }, "\u00A7")),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: ''
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#hello-world" }, "Hello world")))),
    'author': "wangweidong",
    'contributors': [
        "wangweidong"
    ],
    'date': "2021-02-02T07:31:18.000Z",
    'updated': null,
    'excerpt': "",
    'cover': undefined,
    'sidebar': [],
    'blog': {
        "isPost": false,
        "posts": [],
        "categories": [],
        "tags": []
    },
    'gitalk': React.createElement(Gitalk, { admin: [
            'xcatliu'
        ], clientID: "29aa4941759fc887ed4f", clientSecret: "33e355efdf3a1959624506a5d88311145208471b", id: "index.html", owner: "xcatliu", pagerDirection: "first", repo: "typescript-tutorial", title: "Hello world" })
};
