import vnode from "./vnode"
/*
* 1.  h('div',{},'text')
* 2.  h('div',{},[])
* 3.  h('div',{},h())
* h函数用于将传入的数据，转换为用对象表示的一种文档结构。
*/
export default function (sel, data, c) {
  if (arguments.length !== 3) {
    console.error('必须传入3个参数！')
  }
  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c, undefined)

  } else if (Array.isArray(c)) {
    let children = []
    /**注释
    * 检测数组中的每一项是否符合h函数的要求
    */
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('数组中有项的参数有误！')
      }
      children.push(c[i])
    }

    return vnode(sel, data, children, undefined, undefined)

  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)

  } else {
    throw new Error('参数有误！')
  }

}