document.write('开始')
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

// 创建path函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟节点1
const myVnode1 = h("a", {
  props: {
    href: "https://github.com/raotaohub",
    target: '_blank'
  }
}, 'raotao')
// 创建虚拟节点2
const myVnode2 = h('div', {}, "我是一个盒子")

// 创建虚拟节点3 子元素用 数组套。并且要用h函数渲染
const myVnode3 = h('ul', [
  h('li', "猪"),
  h('li', "恐龙"),
  h('li', "蛇"),
  h('li', "🐎马"),
])

console.log(myVnode3)
// 虚拟节点上树
const container = document.getElementById("container")
patch(container, myVnode3)


