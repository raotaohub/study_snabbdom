/**
 *@createElement函数 用于将将虚拟节点，转换成真正的DOM节点
 *@return:相应的DOM节点
 */
export default function createElement(vnode) {
  // 先根据vnode的sel创建真正的DOM节点
  let domNode = document.createElement(vnode.sel)
  /**
  * 当vnode传入的时候，
  *   1. 判断它的text是否有值
  *   2. 判断它是否有children属性，children属性是否有元素
  *       如果text有值，且children为undefined说明遍历到最里层了
  */
  if (vnode.text != ''
    && (vnode.children == undefined || vnode.children.length === 0)
  ) {
    /**
    * 当遍历到一个虚拟节点没有子节点时，会把虚拟元素的值设置给domNode
    * 然后又把虚拟节点的elm属性，指向domNode并返回
    */
    domNode.innerText = vnode.text
    vnode.elm = domNode

  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {

    for (let i = 0; i < vnode.children.length; i++) {
      let ch = createElement(vnode.children[i])
      domNode.appendChild(ch)
    }
    return domNode
  }

  return vnode.elm   //   return domNode 都是同一个 DOM
}


/**
 * 
* 调用createElement(myVnode)以如下例子说明
*   首次进入函数 createElement(myVnode) => 根据vnode.sel创建真实DOM => <ul></ul> =>else =>
*/

/**第 1 次 for 循环
*   ch = { sel: "li", data: {}, children: undefined, text: "11111", elm: li },
*   调用createElement(ch) => 根据 ch.sel 创建真实DOM => <li></li> => if => DOM.innerText = "11111" =>
*   >>> @return  ch.elm = DOM =>
*   >>> 回到主函数 => domNode.appendChild(ch)
*   >>> <ul><li>'11111'</li></ul>
*/

/**第 2 次 for 循环
 * 重复1
 * >>> <ul><li>'11111'</li><li>'22222'</li></ul> 
*/

/**第 3 次 for 循环
 * 重复1
 *   >>> <ul><li>'11111'</li><li>'22222'</li><li>'33333'</li></ul>
 */
(
  function () {
    {
      let myVnode = {
        sel: "ul",
        children: [
          { sel: "li", data: {}, children: undefined, text: "11111", elm: li },
          { sel: "li", data: {}, children: undefined, text: "22222", elm: li },
          { sel: "li", data: {}, children: undefined, text: "33333", elm: li },
        ],
        data: {},
        elm: undefined,
        sel: "ul",
        text: undefined,
      }
    }
  }
)
