import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

document.write("手写snabbdom核心代码")
let newVnode1 = h('ul',
  {},
  [
    h("li", {key: "A"}, "A"),
    h("li", {key: "B"}, "B"),
    h("li", {key: "C"}, "C"),
    h("li", {key: "D"}, "D"),
    h("li", {key: "E"}, "E"),
  ],
  // "text"
)

let newVnode2 = h('ul',
  {},
  [
    h("li", {key: "B"}, "B2"),
    h("li", {key: "A"}, "A2"),
    h("li", {key: "C"}, "C2"),
    h("li", {key: "E"}, "E2"),
    h("li", {key: "D"}, "D2"),

  ]
)

const container = document.getElementById('container')

const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')

window.onload = function () {

  // 第一次上树
  patch(container, newVnode1)

  btn.onclick = function () {
    patch(newVnode2, newVnode1)
  }
  btn2.onclick = function () {
    patch(newVnode1, newVnode2)
  }
}
