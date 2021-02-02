/*
Author: Viktor (victor318x@gmail.com)
hello.tsx (c) 2021
Desc: description
Created:  2021/2/2 下午2:54:18
Modified: 2021/2/2 下午3:04:18
*/

import { React } from 'https://deno.land/x/pagic/mod.ts';

const Hello = () => {
    const [count, setCount] = React.useState(0);
    return (
      <>
        <h1>Hello world</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Count +1</button>
      </>
    );
  };
  
  export default Hello;