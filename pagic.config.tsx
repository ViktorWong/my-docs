import { React } from "https://deno.land/x/pagic/mod.ts";

export default {
  srcDir: "docs", // 源目录
  // outDir: "public", // 输出目录
  root: "/",
  theme: "docs",
  includes: ["assets"],
  plugins: ["sidebar", "prev_next", "ga", "gitalk", "blog", "i18n"],
  github: "https://github.com/ViktorWong/my-docs",
  title: "ViktorHub",
  description: "我的图书馆",
  head: (
    <>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <script src="/assets/custom.js" />
    </>
  ),
  nav: [
    { text: "秘籍收藏", link: "/collection/index.html" },
    { text: "面霸心经", link: "/interview/index.html" },
    { text: "修仙入门", link: "/start/index.html" },
    { text: "进阶功法", link: "/advanced/index.html" },
    { text: "跨界码王", link: "/crossover/RN.html" },
    {
      text: "投桃报李",
      link: "http://www.itdongdong.com",
      target: "_blank",
      popover: (
        <>
          <img
            src="http://lib.itdongdong.com/weixin.png"
            width="256"
            style={{ marginRight: "1rem", verticalAlign: "top" }}
          />
          <img
            src="http://lib.itdongdong.com/zhifubao.png"
            width="256"
            style={{ verticalAlign: "top" }}
          />
        </>
      ),
    },
  ],
  sidebar: {
    "/collection/": ["collection/README.md"],
    "/interview/": [
      {
        link: "interview/README.md",
        title: "面霸心经",
        children: [
          "interview/README.md",
          "interview/Alibaba.md",
          "interview/HTTP.md",
          "interview/DataStructure.md",
          "interview/Algorithm.md",
        ],
      },
    ],
    crossover: [
      {
        link: "crossover/RN.md",
        title: "ReactNative",
        children: [],
      },
    ],
    "/start/": [
      "start/CSS.md",
      "start/CSS3.md",
      "start/JS.md",
      "start/Mobile.md",
      "start/Performance.md",
      "start/Codeing.md",
      "start/Mobx.md",
    ],
    "/advanced/": ["advanced/README.md"],
  },
  md: {
    anchorLevel: [1, 2, 3, 4, 5, 6],
    tocEnabled: true,
    tocLevel: [1, 2, 3, 4],
  },
  tools: {
    editOnGitHub: true,
    backToTop: true,
  },
  gitalk: {
    clientID: "0af8ad0c8674b58c37c0",
    clientSecret: "fe697a9667fc2b49387bf550e4178b3eaa5b8859",
    repo: "my-docs",
    owner: "ViktorWong",
    admin: ["ViktorWong"],
  },
};
