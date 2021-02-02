document.write('开始')
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

// 创建path函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
// 得到节点
const container = document.getElementById("container")
const btn = document.getElementById("btn")

const vnode1 = h('ul', { key: "ul" }, [
  h('li', { key: "A" }, "A"),
  h('li', { key: "B" }, "B"),
  h('li', { key: "C" }, "C"),
  h('li', { key: "D" }, "D"),
])


patch(container, vnode1)

const vnode2 = h('ul', { key: "ul" }, [
  h('li', { key: "E" }, "E"),
  h('li', { key: "A" }, "A"),
  h('li', { key: "B" }, "B"),
  h('li', { key: "C" }, "C"),
  h('li', { key: "D" }, "D"),

])

// 1. key 值是用来标识一个节点的唯一的标识
// 2. 只有是同一个虚拟节点才会进行精细比较，否则就暴力拆除重建。什么算同一个虚拟节点？key相同
// 3. 只进行同层比较比较，否则就暴力拆除重建。
btn.onclick = function () {
  patch(vnode1, vnode2)
}























// // 创建虚拟节点1
// const myVnode1 = h("a", {
//   props: {
//     href: "https://github.com/raotaohub",
//     target: '_blank'
//   }
// }, 'raotao')
// // 创建虚拟节点2
// const myVnode2 = h('div', {}, "我是一个盒子")

// // 创建虚拟节点3 子元素用 数组套。并且要用h函数渲染
// const myVnode3 = h('ul', [
//   h('li', "猪"),
//   h('li', "恐龙"),
//   h('li', "蛇"),
//   h('li', "🐎马"),
// ])

// console.log(myVnode3)
// // 虚拟节点上树
// const container = document.getElementById("container")
// patch(container, myVnode3)


