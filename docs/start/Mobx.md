# Mobx

作为一个数据层框架，mobx 基于一个最简单的原则：

> 当应用状态更新时，所有依赖于这些应用状态的监听者（包括 UI、服务端数据同步函数等），都应该自动得到细粒度地更新。

在使用 mobx 作为 react 的 store 时，我们该如何进行渲染性能优化呢？
通过分析源代码发现，在使用@observer 将 react 组件转换成一个监听者(Reactions)后，mobx 会为 react 组件提供一个精确的、细粒度的 shouldComponentUpdate 函数:

```js
shouldComponentUpdate: function(nextProps, nextState) {
  ......
  // update on any state changes (as is the default)
  if (this.state !== nextState) {
    return true;
  }
  // update if props are shallowly not equal
  return isObjectShallowModified(this.props, nextProps);
}
```


借助于 mobx 框架对 Observable 变量引用的跟踪和依赖收集，mobx 能够精确地得到 react 组件对 Observable 变量的依赖图谱，然后再用经典的 ShallowCompare 实现细粒度的 shouldComponentUpdate 函数，以达到 100%无浪费 render。这一切都是自动完成地，fantastic！使用 mobx 后，我们再也无需手动写 shouldComponentUpdate 函数了。