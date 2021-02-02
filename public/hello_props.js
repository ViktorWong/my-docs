import projectConfig from '/pagic.config.js';
import Hello from './hello_content.js';
import Ga from '/_ga.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "hello.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "hello.html",
    'title': "",
    'content': React.createElement(Hello, { config: {
            branch: 'master',
            description: '我的图书馆',
            exclude: [
                '**/.*',
                '**/package.json',
                '**/package-lock.json',
                '**/node_modules',
                'pagic.config.ts',
                'pagic.config.tsx',
                '**/config.gypi',
                '**/CVS',
                '**/npm-debug.log',
                'public'
            ],
            ga: {
                id: 'UA-45256157-14'
            },
            gitalk: {
                admin: [
                    'xcatliu'
                ],
                clientID: '29aa4941759fc887ed4f',
                clientSecret: '33e355efdf3a1959624506a5d88311145208471b',
                owner: 'xcatliu',
                pagerDirection: 'first',
                repo: 'typescript-tutorial'
            },
            github: 'https://github.com/ViktorWong',
            head: React.createElement(React.Fragment, null,
                React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
                React.createElement("script", { src: "/assets/custom.js" })),
            include: undefined,
            md: {
                anchorLevel: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                tocEnabled: true,
                tocLevel: [
                    1,
                    2,
                    3,
                    4
                ]
            },
            nav: [
                {
                    link: '/docs/index.html',
                    text: '文档'
                },
                {
                    link: 'https://github.com/xcatliu/buy-me-a-coffee',
                    popover: React.createElement(React.Fragment, null,
                        React.createElement("img", { src: "/assets/wechat.jpg", style: { marginRight: '1rem', verticalAlign: 'top' }, width: "256" }),
                        React.createElement("img", { src: "/assets/alipay.jpg", style: { verticalAlign: 'top' }, width: "256" })),
                    target: '_blank',
                    text: '赞助作者'
                },
                {
                    align: 'right',
                    link: '/about/index.html',
                    text: '关于'
                }
            ],
            outDir: 'public',
            plugins: [
                'clean',
                'init',
                'md',
                'tsx',
                'script',
                'layout',
                'out',
                'sidebar',
                'prev_next',
                'ga',
                'gitalk',
                'blog',
                'i18n'
            ],
            port: 8000,
            root: '/',
            serve: true,
            sidebar: {
                '/': [
                    'docs/introduction.md',
                    'about/README.md'
                ],
                '/about/': [
                    'about/README.md',
                    {
                        children: [
                            'about/xcatliu.md'
                        ],
                        expanded: false,
                        link: 'about/team.md'
                    },
                    {
                        link: 'about/usage.md',
                        text: 'Who is using Pagic?'
                    },
                    {
                        children: [
                            'about/join_us.md'
                        ],
                        text: 'Foldable item without link'
                    }
                ],
                '/docs/': [
                    'docs/introduction.md',
                    'docs/usage.md',
                    'docs/config.md'
                ]
            },
            srcDir: 'docs',
            theme: 'docs',
            title: 'ViktorHub',
            tocAd: React.createElement("div", { dangerouslySetInnerHTML: { __html: '\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<!-- 192*128 -->\n<ins\n class="adsbygoogle"\n style="display:inline-block;width:192px;height:128px"\n data-ad-client="ca-pub-8483371329009107"\n data-ad-slot="6487368873"\n></ins>\n<script>\n (adsbygoogle = window.adsbygoogle || []).push({});\n</script>' } }),
            tools: {
                backToTop: true,
                editOnGitHub: true
            },
            watch: true
        }, content: null, head: React.createElement(React.Fragment, null,
            React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
            React.createElement("script", { src: "/assets/custom.js" })), layoutPath: "_layout.tsx", outputPath: "hello.html", pagePath: "hello.tsx", script: null, title: "" }),
    'head': React.createElement(React.Fragment, null,
        React.createElement(Ga, { id: "UA-45256157-14" }),
        React.createElement(React.Fragment, { key: ".1" },
            React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
            React.createElement("script", { src: "/assets/custom.js" }))),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'sidebar': [],
    'blog': {
        "isPost": false,
        "posts": [],
        "categories": [],
        "tags": []
    },
    'gitalk': React.createElement(Gitalk, { admin: [
            'xcatliu'
        ], clientID: "29aa4941759fc887ed4f", clientSecret: "33e355efdf3a1959624506a5d88311145208471b", id: "hello.html", owner: "xcatliu", pagerDirection: "first", repo: "typescript-tutorial", title: "" })
};
