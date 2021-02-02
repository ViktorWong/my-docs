# 算法

## 排序

以下两个函数是排序中会用到的通用函数，就不一一写了

```js
function checkArray(array) {
  if (array.length == 0) return array
}
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}
```

### 冒泡排序（Bubble Sort）

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

#### 算法描述

1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
3. 针对所有的元素重复以上的步骤，除了最后一个；
4. 重复步骤 1~3，直到排序完成。

#### 过程演示

![冒泡排序](/sortGif/BubbleSort.gif)

#### 代码实现

```js
function BubbleSort(array) {
  checkArray(array)
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (array[j + 1] < array[j]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}
```

#### 算法分析

- 最佳情况：T(n) = O(n)
- 最差情况：T(n) = O(n<sup>2</sup>)
- 平均情况：T(n) = O(n<sup>2</sup>)

### 插入排序（Insertion Sort）

插入排序是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用 in-place 排序（即只需用到 O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

#### 算法描述

一般来说，插入排序都采用 in-place 在数组上实现。

1. 从第一个元素开始，该元素可以认为已经被排序；
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
4. 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置；
5. 将新元素插入到该位置后；
6. 重复步骤 2~5。

#### 过程演示

![插入排序](/sortGif/InsertionSort.gif)

#### 代码实现

```js
function InsertionSort(array) {
  checkArray(array)
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      swap(array, j, j + 1)
    }
  }
  return array
}
```

#### 算法分析

- 最佳情况：T(n) = O(n)
- 最坏情况：T(n) = O(n<sup>2</sup>)
- 平均情况：T(n) = O(n<sup>2</sup>)

### 希尔排序（Shell Sort）

希尔排序是希尔在 1959 年提出的一种排序算法。希尔排序也是一种插入排序，它是简单插入排序经过改进之后的一个更高效的版本，也称为缩小增量排序，同时该算法是冲破 O(n<sup>2</sup>）的第一批算法之一。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。

希尔排序是把记录按下表的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至 1 时，整个文件恰被分成一组，算法便终止。

#### 算法描述

在此我们选择增量 gap=length/2，缩小增量继续以 gap = gap/2 的方式，这种增量选择我们可以用一个序列来表示，{n/2,(n/2)/2...1}，称为增量序列。

希尔排序的增量序列的选择与证明是个数学难题，我们选择的这个增量序列是比较常用的，也是希尔建议的增量，称为希尔增量，但其实这个增量序列不是最优的。此处我们做示例使用希尔增量。

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

- 选择一个增量序列 t1，t2，…，tk，其中 ti>tj，tk=1；
- 按增量序列个数 k，对序列进行 k 趟排序；
- 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

#### 代码实现

```js
function ShellSort(array) {
  let len = array.length
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < len; i++) {
      for (var j = i - gap; j >= 0 && array[j] > array[gap + j]; j -= gap) {
        swap(array, j, gap + j)
      }
    }
  }
  return array
}
```

#### 过程演示

![希尔排序](/sortGif/ShellSort.png)

#### 算法分析

- 最佳情况：T(n) = O(nlog2n)
- 最坏情况：T(n) = O(nlog2n)
- 平均情况：T(n) =O(nlog2n)

### 选择排序（Selection Sort）

选择排序是表现最稳定的排序算法之一，因为无论什么数据进去都是 O(n<sup>2</sup>) 的时间复杂度，所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。理论上讲，选择排序可能也是平时排序一般人想到的最多的排序方法了吧。

选择排序是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

#### 算法描述

n 个值的直接选择排序可经过 n-1 趟直接选择排序得到有序结果。

1. 初始状态：无序区为 R[1..n]，有序区为空；
2. 第 i 趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为 R[1..i-1]和 R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第 1 个记录 R 交换，使 R[1..i]和 R[i+1..n)分别变为记录个数增加 1 个的新有序区和记录个数减少 1 个的新无序区；
3. n-1 趟结束，数组完成排序。

#### 过程演示

![选择排序](/sortGif/SelectionSort.gif)

#### 代码实现

```js
function SelectionSort(array) {
  checkArray(array)
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex
    }
    swap(array, i, minIndex)
  }
  return array
}
```

#### 算法分析

- 最佳情况：T(n) = O(n<sup>2</sup>)
- 最差情况：T(n) = O(n<sup>2</sup>)
- 平均情况：T(n) = O(n<sup>2</sup>)

### 归并排序（Merge Sort）

和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是 O(nlogn）的时间复杂度。代价是需要额外的内存空间。

归并排序的原理如下。递归的将数组两两分开直到最多包含两个元素，然后将数组排序合并，最终合并为排序好的数组。假设我有一组数组 [3, 1, 2, 8, 9, 7, 6]，中间数索引是 3，先排序数组 [3, 1, 2, 8] 。在这个左边数组上，继续拆分直到变成数组包含两个元素（如果数组长度是奇数的话，会有一个拆分数组只包含一个元素）。然后排序数组 [3, 1] 和 [2, 8] ，然后再排序数组 [1, 3, 2, 8] ，这样左边数组就排序完成，然后按照以上思路排序右边数组，最后将数组 [1, 2, 3, 8] 和 [6, 7, 9] 排序。

#### 算法描述

- 把长度为 n 的输入序列分成两个长度为 n/2 的子序列；
- 对这两个子序列分别采用归并排序；
- 将两个排序好的子序列合并成一个最终的排序序列。

#### 过程演示

![归并算法](/sortGif/MergeSort.gif)

#### 代码实现

```js
function sort(array) {
  checkArray(array)
  mergeSort(array, 0, array.length - 1)
  return array
}

function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) return
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1))
  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)

  let help = []
  let i = 0
  let p1 = left
  let p2 = mid + 1
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++]
  }
  while (p1 <= mid) {
    help[i++] = array[p1++]
  }
  while (p2 <= right) {
    help[i++] = array[p2++]
  }
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i]
  }
  return array
}
```

#### 算法分析

- 最佳情况：T(n) = O(n)
- 最差情况：T(n) = O(nlogn)
- 平均情况：T(n) = O(nlogn)

以上算法使用了递归的思想。递归的本质就是压栈，每递归执行一次函数，就将该函数的信息（比如参数，内部的变量，执行到的行数）压栈，直到遇到终止条件，然后出栈并继续执行函数。对于以上递归函数的调用轨迹如下

```js
// data = [3, 1, 2, 8, 9, 7, 6]
mergeSort(data, 0, 6) // mid = 3
mergeSort(data, 0, 3) // mid = 1
mergeSort(data, 0, 1) // mid = 0
mergeSort(data, 0, 0) // 遇到终止，回退到上一步
mergeSort(data, 1, 1) // 遇到终止，回退到上一步
// 排序 p1 = 0, p2 = mid + 1 = 1
// 回退到 `mergeSort(data, 0, 3)` 执行下一个递归
mergeSort(2, 3) // mid = 2
mergeSort(3, 3) // 遇到终止，回退到上一步
// 排序 p1 = 2, p2 = mid + 1 = 3
// 回退到 `mergeSort(data, 0, 3)` 执行合并逻辑
// 排序 p1 = 0, p2 = mid + 1 = 2
// 执行完毕回退
// 左边数组排序完毕，右边也是如上轨迹
```

### 快速排序（Quick Sort）

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

#### 算法描述

1. 随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。
2. 比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。然后将数组以基准值的位置分为两部分。
3. 继续递归以上操作。

#### 过程演示

![快速排序](/sortGif/QuickSort.gif)

#### 代码实现

```js
function sort(array) {
  checkArray(array);
  quickSort(array, 0, array.length - 1);
  return array;
}

function quickSort(array, left, right) {
  if (left < right) {
    swap(array, , right)
    // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
    let indexs = part(array, parseInt(Math.random() * (right - left + 1)) + left, right);
    quickSort(array, left, indexs[0]);
    quickSort(array, indexs[1] + 1, right);
  }
}
function part(array, left, right) {
  let less = left - 1;
  let more = right;
  while (left < more) {
    if (array[left] < array[right]) {
      // 当前值比基准值小，`less` 和 `left` 都加一
	   ++less;
       ++left;
    } else if (array[left] > array[right]) {
      // 当前值比基准值大，将当前值和右边的值交换
      // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
      swap(array, --more, left);
    } else {
      // 和基准值相同，只移动下标
      left++;
    }
  }
  // 将基准值和比基准值大的第一个值交换位置
  // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
  swap(array, right, more);
  return [less, more];
}
```

#### 算法分析

该算法的复杂度和归并排序是相同的，但是额外空间复杂度比归并排序少，只需 O(logn)，并且相比归并排序来说，所需的常数时间也更少。

### 堆排序（Heap Sort）

堆排序利用了二叉堆的特性来做，二叉堆通常用数组表示，并且二叉堆是一颗完全二叉树（所有叶节点（最底层的节点）都是从左往右顺序排序，并且其他层的节点都是满的）。二叉堆又分为大根堆与小根堆。

- 大根堆是某个节点的所有子节点的值都比他小
- 小根堆是某个节点的所有子节点的值都比他大

堆排序的原理就是组成一个大根堆或者小根堆。以小根堆为例，某个节点的左边子节点索引是 i _ 2 + 1，右边是 i _ 2 + 2，父节点是 (i - 1) /2。

#### 算法描述

1. 首先遍历数组，判断该节点的父节点是否比他小，如果小就交换位置并继续判断，直到他的父节点比他大
2. 重新以上操作 1，直到数组首位是最大值
3. 然后将首位和末尾交换位置并将数组长度减一，表示数组末尾已是最大值，不需要再比较大小
4. 对比左右节点哪个大，然后记住大的节点的索引并且和父节点对比大小，如果子节点大就交换位置
5. 重复以上操作 3 - 4 直到整个数组都是大根堆。

#### 过程演示

![堆排序](/sortGif/HeapSort.gif)

#### 代码实现

```js
function heap(array) {
  checkArray(array)
  // 将最大值交换到首位
  for (let i = 0; i < array.length; i++) {
    heapInsert(array, i)
  }
  let size = array.length
  // 交换首位和末尾
  swap(array, 0, --size)
  while (size > 0) {
    heapify(array, 0, size)
    swap(array, 0, --size)
  }
  return array
}

function heapInsert(array, index) {
  // 如果当前节点比父节点大，就交换
  while (array[index] > array[parseInt((index - 1) / 2)]) {
    swap(array, index, parseInt((index - 1) / 2))
    // 将索引变成父节点
    index = parseInt((index - 1) / 2)
  }
}
function heapify(array, index, size) {
  let left = index * 2 + 1
  while (left < size) {
    // 判断左右节点大小
    let largest =
      left + 1 < size && array[left] < array[left + 1] ? left + 1 : left
    // 判断子节点和父节点大小
    largest = array[index] < array[largest] ? largest : index
    if (largest === index) break
    swap(array, index, largest)
    index = largest
    left = index * 2 + 1
  }
}
```

以上代码实现了小根堆，如果需要实现大根堆，只需要把节点对比反一下就好。

#### 算法分析

- 最佳情况：T(n) = O(nlogn)
- 最差情况：T(n) = O(nlogn)
- 平均情况：T(n) = O(nlogn)

### 计数排序（Counting Sort）

计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。

计数排序是一种稳定的排序算法。计数排序使用一个额外的数组 C，其中第 i 个元素是待排序数组 A 中值等于 i 的元素的个数。然后根据数组 C 来将 A 中的元素排到正确的位置。它只能对整数进行排序。

#### 算法描述

1. 找出待排序的数组中最大和最小的元素；
2. 统计数组中每个值为 i 的元素出现的次数，存入数组 C 的第 i 项；
3. 对所有的计数累加（从 C 中的第一个元素开始，每一项和前一项相加）；
4. 反向填充目标数组：将每个元素 i 放在新数组的第 C(i)项，每放一个元素就将 C(i)减去 1。

#### 过程演示

![计数排序](/sortGif/CountingSort.gif)

#### 代码实现

```js
function countingSort(array) {
  checkArray(array)
  let bias,
    min = array[0],
    max = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
    if (array[i] < min) {
      min = array[i]
    }
  }
  bias = 0 - min
  let bucket = Array.apply(null, Array(max - min + 1)).map(() => 0)
  for (let i = 0; i < array.length; i++) {
    bucket[array[i] + bias]++
  }
  let index = 0,
    i = 0
  while (index < array.length) {
    if (bucket[i] != 0) {
      array[index] = i - bias
      bucket[i]--
      index++
    } else {
      i++
    }
  }
  return array
}
```

#### 算法分析

当输入的元素是 n 个 0 到 k 之间的整数时，它的运行时间是 O(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。由于用来计数的数组 C 的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上 1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。

- 最佳情况：T(n) = O(n+k)
- 最差情况：T(n) = O(n+k)
- 平均情况：T(n) = O(n+k)

### 桶排序（Bucket Sort）

桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。

桶排序的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排

#### 算法描述

1. 人为设置一个 BucketSize，作为每个桶所能放置多少个不同数值（例如当 BucketSize==5 时，该桶可以存放｛1,2,3,4,5｝这几种数字，但是容量不限，即可以存放 100 个 3）；
2. 遍历输入数据，并且把数据一个一个放到对应的桶里去；
3. 对每个不是空的桶进行排序，可以使用其它排序方法，也可以递归使用桶排序；
4. 从不是空的桶里把排好序的数据拼接起来。

注意，如果递归使用桶排序为各个桶排序，则当桶数量为 1 时要手动减小 BucketSize 增加下一循环桶的数量，否则会陷入死循环，导致内存溢出。

#### 过程演示

![桶排序](/sortGif/BucketSort.png)

#### 代码实现

数组替代链表版本

```js
function bucketSort(arr, bucketCount) {
  if (arr.length <= 1) {
    return arr
  }
  bucketCount = bucketCount || 10
  //初始化桶
  var len = arr.length,
    buckets = [],
    result = [],
    max = arr[0],
    min = arr[0]
  for (var i = 1; i < len; i++) {
    min = min <= arr[i] ? min : arr[i]
    max = max >= arr[i] ? max : arr[i]
  }
  //求出每一个桶的数值范围
  var space = (max - min + 1) / bucketCount
  //将数值装入桶中
  for (var i = 0; i < len; i++) {
    //找到相应的桶序列
    var index = Math.floor((arr[i] - min) / space)
    //判断是否桶中已经有数值
    if (buckets[index]) {
      //数组从小到大排列
      var bucket = buckets[index]
      var k = bucket.length - 1
      while (k >= 0 && buckets[index][k] > arr[i]) {
        buckets[index][k + 1] = buckets[index][k]
        k--
      }
      buckets[index][k + 1] = arr[i]
    } else {
      //新增数值入桶，暂时用数组模拟链表
      buckets[index] = []
      buckets[index].push(arr[i])
    }
  }
  //开始合并数组
  var n = 0
  while (n < bucketCount) {
    if (buckets[n]) {
      result = result.concat(buckets[n])
    }
    n++
  }
  return result
}
```

模拟链表实现版本

```js
var L = require('linklist') //链表
function bucketSort(arr, bucketCount) {
  if (arr.length <= 1) {
    return arr
  }
  bucketCount = bucketCount || 10
  //初始化桶
  var len = arr.length,
    buckets = [],
    result = [],
    max = arr[0],
    min = arr[0]
  for (var i = 1; i < len; i++) {
    min = min <= arr[i] ? min : arr[i]
    max = max >= arr[i] ? max : arr[i]
  }
  //求出每一个桶的数值范围
  var space = (max - min + 1) / bucketCount
  //将数值装入桶中
  for (var i = 0; i < len; i++) {
    //找到相应的桶序列
    var index = Math.floor((arr[i] - min) / space)
    //判断是否桶中已经有数值
    if (buckets[index]) {
      //数组从小到大排列
      var bucket = buckets[index]
      var insert = false //插入标石
      L.reTraversal(bucket, function(item, done) {
        if (arr[i] <= item.v) {
          //小于，左边插入
          L.append(item, _val(arr[i]))
          insert = true
          done() //退出遍历
        }
      })
      if (!insert) {
        //大于，右边插入
        L.append(bucket, _val(arr[i]))
      }
    } else {
      var bucket = L.init()
      L.append(bucket, _val(arr[i]))
      buckets[index] = bucket //链表实现
    }
  }
  //开始合并数组
  for (var i = 0, j = 0; i < bucketCount; i++) {
    L.reTraversal(buckets[i], function(item) {
      // console.log(i+":"+item.v);
      result[j++] = item.v
    })
  }
  return result
}

//链表存储对象
function _val(v) {
  return {
    v: v
  }
}
```

其中，linklist 为引用的第三方库，地址 [linklist](https://github.com/dead-horse/js-linklist)

#### 算法分析

桶排序最好情况下使用线性时间 O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为 O(n)。很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。

- 最佳情况：T(n) = O(n+k)
- 最差情况：T(n) = O(n+k)
- 平均情况：T(n) = O(n2)

### 基数排序（Radix Sort）

基数排序也是非比较的排序算法，对每一位进行排序，从最低位开始排序，复杂度为 O(kn),为数组长度，k 为数组中的数的最大的位数；

基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的。

#### 算法描述

1. 取得数组中的最大数，并取得位数；
2. arr 为原始数组，从最低位开始取每个位组成 radix 数组；
3. 对 radix 进行计数排序（利用计数排序适用于小范围数的特点）；

#### 过程演示

![基数排序](/sortGif/RadixSort.gif)

#### 代码实现

```js
function radixSort(array, maxDigit) {
  var mod = 10
  var dev = 1
  var counter = []
  console.time('基数排序耗时')
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (var j = 0; j < array.length; j++) {
      var bucket = parseInt((array[j] % mod) / dev)
      if (counter[bucket] == null) {
        counter[bucket] = []
      }
      counter[bucket].push(array[j])
    }
    var pos = 0
    for (var j = 0; j < counter.length; j++) {
      var value = null
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          array[pos++] = value
        }
      }
    }
  }
  console.timeEnd('基数排序耗时')
  return array
}
```

#### 算法分析

- 最佳情况：T(n) = O(n \* k)
- 最差情况：T(n) = O(n \* k)
- 平均情况：T(n) = O(n \* k)

基数排序有两种方法：

- MSD 从高位开始进行排序
- LSD 从低位开始进行排序

### 基数排序 vs 计数排序 vs 桶排序

这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

- 基数排序：根据键值的每位数字来分配桶
- 计数排序：每个桶只存储单一键值
- 桶排序：每个桶存储一定范围的数值

## 短链接原理及实现

### 什么是短链接

> 就是把`普通网址`，转换成比较短的网址。比如：`https://t.cn/zyqd5JGm` 这种，在微博这些限制字数的应用里。好处不言而喻。短、字符少、美观、便于发布、传播。

- 百度短网址服务 [http://dwz.cn/](http://dwz.cn/)
- 谷歌短网址服务 [https://goo.gl/](https://goo.gl/)

### 原理解析

当我们在浏览器里输入 ·https://t.cn/zyqd5JGm` 时

1. DNS 首先解析获得 `http://t.cn` 的 IP 地址
2. 当 DNS 获得 IP 地址以后（比如：`116.211.169.137`），会向这个地址发送 `HTTP` `GET` 请求，查询短码 `zyqd5JGm`
3. `http://t.cn` 服务器会通过短码 `zyqd5JGm` 获取对应的长 URL
4. 请求通过 `HTTP` （301 或 302） 转到对应的长 URL [https://www.itdongdong.com](https://www.itdongdong.com) 。



::: tip
**重定向的问题(301还是302)**

`301` 是永久重定向，`302` 是临时重定向。
因为短地址一经生成就不会变化，所以用 `301` 是符合 `http` 语义的。同时对服务器压力也会有一定减少。
但是如果使用了 `301`，就无法统计到短地址被点击的次数了。而这个点击次数是一个非常有意思的大数据分析数据源。能够分析出的东西非常非常多。所以选择`302`虽然会增加服务器压力，但是也是一个很好的选择。

具体选择，可以根据自己的业务需求来选择！

:::

### 算法实现

#### Hash实现
通过一定方式将任意长的文本转化为一个固定长的字符串，只要目标文本长度适当，那么我们对于不同的输入通过哈希几乎(注意是几乎)不可能得到对应同一个字符串．通过对长链接进行Hash运算，将Hash值作为这个长链接的唯一标示．但是通过Hash实现可能会造成碰撞．不一样的长网址缩短成了同一个短网址，那也就做不到复原了．

对于碰撞问题，有一种缓冲方法就是在呈现碰撞了以后后边在增加随机字符，随机字符的增加能够缓解碰撞的疑问，但是这终究是一种缓冲的办法，没有彻底解决碰撞．

#### 自增序列算法
自增序列算法也叫永不重复算法。

设置 id 自增，一个 10进制 id 对应一个 62进制的数值，1对1，也就不会出现重复的情况。这个利用的就是低进制转化为高进制时，字符数会减少的特性。


短址的长度一般设为 6 位，而每一位是由 [a - z, A - Z, 0 - 9] 总共 62 个字母组成的，所以 6 位的话，总共会有 62^6 ~= 568亿种组合，基本上够用了。

附上一个进制转换工具 [http://tool.lu/hexconvert/](http://tool.lu/hexconvert/)

#### 摘要算法
1. 将长网址 `md5` 生成 32 位签名串,分为 4 段, 每段 8 个字节 
2. 对这四段循环处理, 取 8 个字节, 将他看成 16 进制串与 0x3fffffff(30位1) 与操作, 即超过 30 位的忽略处理 
3. 这 30 位分成 6 段, 每 5 位的数字作为字母表的索引取得特定字符, 依次进行获得 6 位字符串 
4. 总的 `md5` 串可以获得 4 个 6 位串,取里面的任意一个就可作为这个长 url 的短 url 地址 

这种算法,虽然会生成4个,但是仍然存在重复几率


#### 两种算法对比 
第一种算法的好处就是简单好理解，永不重复。但是短码的长度不固定，随着 id 变大从一位长度开始递增。如果非要让短码长度固定也可以就是让 id 从指定的数字开始递增就可以了。百度短网址用的这种算法。

第二种算法，存在碰撞（重复）的可能性，虽然几率很小。短码位数是比较固定的。不会从一位长度递增到多位的。据说微博使用的这种算法。
