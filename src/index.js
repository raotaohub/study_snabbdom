import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"

let newVnode1 = h('ul',
  {},
  [
    h("li", {}, "11111"),
    h("li", {}, "22222"),
    h("li", {}, "33333"),
  ],
  // "我是一个没有children的家伙"
)

let newVnode2 = h('ul',
  {},
  [
    h("li", {}, "99999"),
    h("li", {}, "88888"),
    h("li", {}, "77777"),
  ]
)

const container = document.getElementById('container')

const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')


window.onload = function () {

  // 第一次上树
  patch(container, newVnode1)

  btn.onclick = function () {

  }
  btn2.onclick = function () {
    patch(newVnode1, newVnode2)
  }
}