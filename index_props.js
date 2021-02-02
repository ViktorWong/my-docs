import projectConfig from '/pagic.config.js';
import IndexPage from './index_content.js';
import Gitalk from '/_gitalk.js';
export default {
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
                    link: '/crossover/index.html',
                    text: '跨界码王'
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
                '/advanced/': [
                    {
                        children: [],
                        link: 'advanced/README.md',
                        title: '进阶功法'
                    }
                ],
                '/collection/': [
                    {
                        children: [],
                        link: 'collection/README.md',
                        title: '秘籍收藏'
                    }
                ],
                '/crossover/': [
                    {
                        children: [
                            'crossover/RN.md'
                        ],
                        link: 'crossover/README.md',
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
                    {
                        children: [
                            'start/CSS.md',
                            'start/CSS3.md',
                            'start/JS.md',
                            'start/Mobile.md',
                            'start/Performance.md',
                            'start/Codeing.md',
                            'start/Mobx.md'
                        ],
                        link: 'start/README.md',
                        title: '修仙入门'
                    }
                ]
            },
            srcDir: 'docs',
            theme: 'docs',
            title: 'Viktor‘s Docs',
            tocAd: React.createElement("div", { dangerouslySetInnerHTML: { __html: '\n <script data-ad-client="ca-pub-5052023368276507" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<!-- 192*128 -->\n<ins\n class="adsbygoogle"\n style="display:inline-block;width:192px;height:128px"\n data-ad-client="ca-pub-5052023368276507"\n></ins>\n<script>\n (adsbygoogle = window.adsbygoogle || []).push({});\n</script>' } }),
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
    'gitalk': React.createElement(Gitalk, { admin: [
            'ViktorWong'
        ], clientID: "0af8ad0c8674b58c37c0", clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859", id: "index.html", owner: "ViktorWong", pagerDirection: "first", repo: "my-docs", title: "" })
};
