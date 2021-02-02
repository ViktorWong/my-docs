export default {
    srcDir: "docs",
    // outDir: "public", // 输出目录
    root: "/",
    theme: "docs",
    plugins: ["sidebar", "prev_next", "ga", "gitalk", "blog", "i18n"],
    github: "https://github.com/ViktorWong",
    branch: "master",
    title: "ViktorHub",
    description: "我的图书馆",
    head: (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "icon", type: "image/png", href: "/favicon.png" }),
        React.createElement("script", { src: "/assets/custom.js" }))),
    nav: [
        { text: "文档", link: "/docs/index.html" },
        {
            text: "赞助作者",
            link: "https://github.com/xcatliu/buy-me-a-coffee",
            target: "_blank",
            popover: (React.createElement(React.Fragment, null,
                React.createElement("img", { src: "/assets/wechat.jpg", width: "256", style: { marginRight: "1rem", verticalAlign: "top" } }),
                React.createElement("img", { src: "/assets/alipay.jpg", width: "256", style: { verticalAlign: "top" } }))),
        },
        {
            text: "关于",
            link: "/about/index.html",
            align: "right",
        },
    ],
    sidebar: {
        "/docs/": ["docs/introduction.md", "docs/usage.md", "docs/config.md"],
        "/about/": [
            "about/README.md",
            {
                link: "about/team.md",
                expanded: false,
                children: ["about/xcatliu.md"],
            },
            {
                text: "Who is using Pagic?",
                link: "about/usage.md",
            },
            {
                text: "Foldable item without link",
                children: ["about/join_us.md"],
            },
        ],
        "/": ["docs/introduction.md", "about/README.md"],
    },
    md: {
        anchorLevel: [1, 2, 3, 4, 5, 6],
        tocEnabled: true,
        tocLevel: [1, 2, 3, 4],
    },
    tocAd: (React.createElement("div", { dangerouslySetInnerHTML: {
            __html: `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 192*128 -->
<ins
  class="adsbygoogle"
  style="display:inline-block;width:192px;height:128px"
  data-ad-client="ca-pub-8483371329009107"
  data-ad-slot="6487368873"
></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>`,
        } })),
    tools: {
        editOnGitHub: true,
        backToTop: true,
    },
    ga: {
        id: 'UA-45256157-14',
    },
    gitalk: {
        clientID: '29aa4941759fc887ed4f',
        clientSecret: '33e355efdf3a1959624506a5d88311145208471b',
        repo: 'typescript-tutorial',
        owner: 'xcatliu',
        admin: ['xcatliu'],
        pagerDirection: 'first',
    }
};
