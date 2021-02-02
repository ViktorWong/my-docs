/*
Author: Viktor (victor318x@gmail.com)
index.ts (c) 2021
Desc: description
Created:  2021/2/2 下午6:23:59
Modified: 2021/2/2 下午6:40:47
*/

import { React } from "https://deno.land/x/pagic/mod.ts";

const style = `
h2 {
  font-weight: normal;
}
.main_article {
  width: 960px;
  max-width: 960px;
  padding-bottom: 0;
}
.cards {
  display: flex;
  justify-content: center;
  margin: 3rem -1rem 0 -1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}
.cards > div {
  width: 20rem;
  padding: 0 1rem;
}
.cards ul {
  color: var(--color-text-muted);
}
.btn {
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border: 0;
  cursor: pointer;
  opacity: 0.9;
  font-size: 14px;
  text-decoration: none;
  background-color: var(--color-border);
  color: var(--color-text);
}
.btn:hover {
  text-decoration: none;
}
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
}
.btn:hover {
  opacity: 1;
}
@media screen and (max-width: 44rem) {
  h2 {
    text-align: center;
  }
  .cards {
    flex-direction: column;
  }
  .cards > div {
    width: 100vw;
  }
  .cards ul {
    text-align: center;
    padding-left: 0;
    list-style: none;
  }
  pre {
    margin-left: -1rem;
    margin-right: -1rem;
  }
}
`

const IndexPage = () => (
  <>
    <div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <h1
        style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          fontSize: '64px',
          color: 'hsl(210, 70%, 50%)'
        }}
      >
        Viktor's Docs
      </h1>
      <p
        style={{
          fontSize: '28px',
          marginTop: '2rem',
          textAlign: 'center',
          color: 'var(--color-text-muted)'
        }}
      >
        建设Web全栈数字图书馆，揭秘Web全栈架构师，打造个人核心竞争力
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem'
        }}
      >
        <a className="btn btn-primary" href="/start/">
          开始阅读
        </a>
        <a className="btn" target="_blank" href="https://github.com/ViktorWong/my-docs">
          源码仓库
        </a>
      </div>
    </div>
    <div className="cards">
      <div>
        <h2>原创文章</h2>
        <ul>
          <li>融合了笔者的大量思考。</li>
          <li>本书、笔者和读者一起成长。</li>
          <li>友好的交流环境。</li>
        </ul>
      </div>
      <div>
        <h2>内容丰富</h2>
        <ul>
          <li>从多方位建设 <code>Web</code> 生态。</li>
          <li>
            内容包括但不局限于 <code>Deno</code> <code>Node</code> <code>React</code> <code>Vue</code> 等众多技术要点。
          </li>
          <li>收录各种翻译文章、授权转载文章。</li>
        </ul>
      </div>
      <div>
        <h2>长期维护</h2>
        <ul>
          <li>来源于一份对持续深入地掌握前沿技术的渴望。</li>
          <li>基于 <code>Pagic</code> 静态网站生成器，构建长期的网站技术支持。</li>
          <li>野心，不止于此。</li>
        </ul>
      </div>
    </div>
    <h2>推荐你的 Web 文章？快来一起建设吧</h2>
    <pre
      style={{
        fontSize: '1rem'
      }}
    >
      <code
        dangerouslySetInnerHTML={{
          __html: `# 直接在 issues 区里推荐
https://github.com/ViktorWong/my-docs/issues`
        }}
      />
    </pre>
  </>
)

export default IndexPage