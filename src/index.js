import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

let newVnode1 = h('ul',
  {},
  [
    h("li", {key: "A"}, "A"),
    h("li", {key: "B"}, "B"),
    h("li", {key: "C"}, "C"),
    h("li", {key: "D"}, "D"),
    h("li", {key: "E"}, "E"),

  ],
  // "我是一个没有children的家伙"
)

let newVnode2 = h('ul',
  {},
  [
    h("li", {key: "F"}, "F"),
    h("li", {key: "E"}, "E"),
    h("li", {key: "A"}, "A"),
    h("li", {key: "B"}, "B"),
    h("li", {key: "C"}, "C"),
    h("li", {key: "D"}, "D"),
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
