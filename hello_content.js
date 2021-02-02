/*
Author: Viktor (victor318x@gmail.com)
hello.tsx (c) 2021
Desc: description
Created:  2021/2/2 下午2:54:18
Modified: 2021/2/2 下午3:04:18
*/
const Hello = () => {
    const [count, setCount] = React.useState(0);
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Hello world"),
        React.createElement("p", null,
            "Count: ",
            count),
        React.createElement("button", { onClick: () => setCount(count + 1) }, "Count +1")));
};
export default Hello;
