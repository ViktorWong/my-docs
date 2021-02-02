import projectConfig from '/pagic.config.js';
import IndexPage from './index_content.js';
import Gitalk from '/_gitalk.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "index.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "",
    'content': React.createElement(IndexPage, { config: {
            branch: 'master',
            branth: 'master',
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
                'dist'
            ],
            gitalk: {
                admin: [
                    'ViktorWong'
                ],
                clientID: '0af8ad0c8674b58c37c0',
                clientSecret: 'fe697a9667fc2b49387bf550e4178b3eaa5b8859',
                owner: 'ViktorWong',
                pagerDirection: 'first',
                repo: 'my-docs'
            },
            github: 'https://github.com/ViktorWong/my-docs',
            head: React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
            include: undefined,
            includes: [
                'assets'
            ],
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
                    link: '/collection/index.html',
                    text: '秘籍收藏'
                },
                {
                    link: '/interview/index.html',
                    text: '面霸心经'
                },
                {
                    link: '/start/index.html',
                    text: '修仙入门'
                },
                {
                    link: '/advanced/index.html',
                    text: '进阶功法'
                },
                {
                    link: '/crossover/RN.html',
                    text: '跨界码王'
                },
                {
                    link: 'http://www.itdongdong.com',
                    popover: React.createElement(React.Fragment, null,
                        React.createElement("img", { src: "http://lib.itdongdong.com/weixin.png", style: { marginRight: '1rem', verticalAlign: 'top' }, width: "256" }),
                        React.createElement("img", { src: "http://lib.itdongdong.com/zhifubao.png", style: { verticalAlign: 'top' }, width: "256" })),
                    target: '_blank',
                    text: '投桃报李'
                }
            ],
            outDir: 'dist',
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
                'gitalk'
            ],
            port: 8000,
            root: '/',
            serve: false,
            sidebar: {
                '/': [
                    'index.html'
                ],
                '/advanced/': [
                    'advanced/README.md'
                ],
                '/collection/': [
                    'collection/README.md'
                ],
                '/crossover/': [
                    {
                        children: [],
                        link: 'crossover/RN.md',
                        title: 'ReactNative'
                    }
                ],
                '/interview/': [
                    {
                        children: [
                            'interview/README.md',
                            'interview/Alibaba.md',
                            'interview/HTTP.md',
                            'interview/DataStructure.md',
                            'interview/Algorithm.md'
                        ],
                        link: 'interview/README.md',
                        title: '面霸心经'
                    }
                ],
                '/start/': [
                    'start/CSS.md',
                    'start/CSS3.md',
                    'start/JS.md',
                    'start/Mobile.md',
                    'start/Performance.md',
                    'start/Codeing.md',
                    'start/Mobx.md'
                ]
            },
            srcDir: 'docs',
            theme: 'docs',
            title: 'ViktorHub',
            tools: {
                backToTop: true,
                editOnGitHub: true
            },
            watch: false
        }, content: null, head: React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }), layoutPath: "_layout.tsx", outputPath: "index.html", pagePath: "index.tsx", script: null, title: "" }),
    'head': React.createElement("link", { href: "/favicon.png", rel: "icon", type: "image/png" }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'sidebar': [],
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "index.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "" })
};
