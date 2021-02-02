import {patchVnode} from "./patch";
import {htmlDomApi} from "./htmldomapi";

function sameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key
}
export default function updateChildren(parentElm, oldCh, newCh) {
  const api = htmlDomApi
  /*
  *
  * */
  let newStartIdx = 0
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  /*
  *
  * */
  let oldStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]

  /*
  * 1 新前和旧前
  * 2 新后和旧后
  * 3 新后和旧前
  * 4 新前和旧后
  * */
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    //  1 新前和旧前
    if (sameVnode(oldStartVnode, newStartVnode)) {
      console.log("1☆")
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    }
    //  2 新后和旧后
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      console.log("2☆")
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    //  3 新后和旧前
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      console.log("3☆")
      patchVnode(oldStartVnode, newEndVnode)
      /*
      * 3命中 需要移动节点：移动旧前节点到旧后节点的下一个
      * */
      api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    //  4 新前和旧后
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      console.log("4☆")
      patchVnode(oldEndVnode, newStartVnode)
      /*
      * 4命中 需要移动节点：移动旧后节点到旧前节点的前面
      * */
      api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      console.log('循环走一个')
    }
  }
}


