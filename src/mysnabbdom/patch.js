import vnode from './vnode'
import createElement from './createElement'
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
     * @parent elm的父元素
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
 *@return 判断传入的值是否是一个虚拟节点的布尔值
 */
function isVnode(vnode) {
  return vnode.sel !== undefined && vnode.sel !== ""
}

function patchVnode(oldVnode, newVnode) {
  if (oldVnode === newVnode) return
  if (newVnode.text !== '' && (newVnode.children == null || newVnode.children.length == 0)) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.innerText = newVnode.text
      oldVnode.children = undefined
    }
  } else {


    if (oldVnode.children != undefined
      && oldVnode.children.length > 0
      && newVnode.children.length > 0) {
      /**
       *★新老节点都有children节点★
       *
       */
      console.log('新老节点都有children节点')
    } else {
      /**
       * 老节点没有children
       * 1、把old.text清空
       * 2、把new.children插入到DOM
       */
      let elm = oldVnode.elm,
        i = 0,
        newCh,
        newChs = newVnode.children,
        len = newVnode.children.length;
      elm.innerText = ""
      elm.innerHTML = ""
      for (i; i < len; i++) {
        newCh = createElement(newChs[i])
        elm.appendChild(newCh)
      }
    }
  }
}
