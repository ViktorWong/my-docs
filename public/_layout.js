/*
Author: Viktor (victor318x@gmail.com)
_layout.tsx (c) 2021
Desc: description
Created:  2021/2/2 下午3:11:21
Modified: 2021/2/2 下午3:11:28
*/
const Layout = ({ title, content }) => (React.createElement("html", null,
    React.createElement("head", null,
        React.createElement("title", null, title),
        React.createElement("meta", { charSet: "utf-8" })),
    React.createElement("body", null,
        content,
        React.createElement("p", null, "Custom _layout.tsx"))));
export default Layout;
