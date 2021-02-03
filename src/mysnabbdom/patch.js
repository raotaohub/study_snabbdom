import vnode from './vnode'
import createElement from './createElement'
import updateChildren from "./updateChildren";

/**
 * @patch函数 用于将h函数的返回值渲染到目标中
 *
 */
export default function patch(oldVnode, newVnode) {
  let elm = null, parent = null;
  /**
   * 判断 oldVnode 是不是虚拟DOM。如果不是的话，要先转成虚拟DOM。
   * 并并把真实DOM挂在虚拟节点的 elm 属性上。
   */
  if (!isVnode(oldVnode)) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  /**
   * 此时 oldVnode 和 newVnode 都是虚拟节点
   * 然后根据sel和key判断是否是同一个节点。
   */
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    /**
     *@同一个节点精细比较
     */
    patchVnode(oldVnode, newVnode)
  } else {
    /**
     * @不是同一个节点暴力替换
     * @elm 挂载旧节点的真实DOM
     * @parent elm的父节点
     * @newDom 根据新虚拟节点创建的真实 DOM
     */
    elm = oldVnode.elm
    parent = oldVnode.elm.parentNode

    let newInsertDom = createElement(newVnode)
    newVnode.elm = newInsertDom

    if (elm && parent) {
      parent.insertBefore(newInsertDom, elm)
      parent.removeChild(elm)
    }
  }
}

/**
 *@isVnode
 *@return boolean
 */
function isVnode(vnode) {
  return vnode.sel !== undefined
}

function patchVnode(oldVnode, newVnode) {
  const elm = newVnode.elm = oldVnode.elm
  const newCh = newVnode.children
  const oldCh = oldVnode.children

  if (oldVnode === newVnode) return
  if (newVnode.text !== '' && (newCh == null || newCh.length === 0)) {
    if (oldVnode.text !== newVnode.text) {
      elm.innerText = newVnode.text
      oldVnode.children = undefined
    } //.. 如果内容都一样什么都不做

  } else {
    // 如果new没有text属性就说明有children属性
    if (oldCh !== undefined && oldCh.length > 0 && newCh.length > 0) {
      /**
       *★新老节点都有children节点★ 而且不相同 那么就要进行深度diff了
       */
      if (newCh !== oldCh) {
        console.log('updateChildren')
        updateChildren(elm, oldCh, newCh)
      }
    } else {
      /**
       * 老节点没有children
       * 1、把old.text清空
       * 2、把new.children插入到DOM
       */
      oldVnode.elm.innerText = ""
      let i = 0, len = newCh.length, c;
      for (i; i < len; i++) {
        c = createElement(newCh[i])
        elm.appendChild(c)
      }
    }
  }
}

export {patchVnode}
