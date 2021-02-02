/*
Author: Viktor (victor318x@gmail.com)
_layout.tsx (c) 2021
Desc: description
Created:  2021/2/2 下午3:11:21
Modified: 2021/2/2 下午3:11:28
*/

import { React, PagicLayout } from 'https://deno.land/x/pagic@v1.2.0/mod.ts';

const Layout: PagicLayout = ({ title, content }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </head>
    <body>
      {content}
      <p>Custom _layout.tsx</p>
    </body>
  </html>
);

export default Layout;