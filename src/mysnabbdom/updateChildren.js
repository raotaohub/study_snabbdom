import {patchVnode} from "./patch";
import {htmlDomApi} from "./htmldomapi";
import createElement from "./createElement";

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
  *
  * */
  let before
  let oldKey2Inx
  let idxInOld
  let elmToMove
  /*
  * 1 新前和旧前
  * 2 新后和旧后
  * 3 新后和旧前
  * 4 新前和旧后
  * */
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    console.log("☆")
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    }
    /*
    * 1命中 新前和旧前
    * */
    else if (sameVnode(oldStartVnode, newStartVnode)) {
      console.log("1☆")
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    }
    /*
    * 2命中 新后和旧后
    * */
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      console.log("2☆")
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    /*
     * 3命中 新后和旧前 需要移动节点：移动旧前节点到旧后节点的下一个
     * */
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      console.log("3☆")
      patchVnode(oldStartVnode, newEndVnode)
      //
      api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    /*
     * 4命中 新前和旧后 需要移动节点：移动旧后节点到旧前节点的前面
     * */
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      console.log("4☆")
      patchVnode(oldEndVnode, newStartVnode)
      //
      api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      /*
      * 4种正常操作之外的被称为【人类迷惑行为】
      * */
      if (oldKey2Inx === undefined) {
        //通常第一次进入该语句才会创建，后续直接可以使用
        oldKey2Inx = createKeyToOldInxMap(oldCh, oldStartIdx, oldEndIdx)
      }
      // 字面上看就是从map种根据key取数组下标。
      idxInOld = oldKey2Inx[newStartVnode.key]
      //如果newStartVnode的key值，不能在map中取到值，就说明目前的DOM也没有这个元素，因此要创建DOM并新增
      if (idxInOld === undefined) {
        api.insertBefore(parentElm, createElement(newStartVnode), oldStartVnode.elm)
      } else {
        //如果key值存在。有两种情况
        elmToMove = oldCh[idxInOld]
        //1. 标签名不同 那么直接用新DOM插入到最前面
        if (elmToMove.sel !== newStartVnode.sel) {
          api.insertBefore(parentElm, createElement(newStartVnode), oldStartVnode.elm)
        } else {
          //2. 标签名相同 那么继续比对两个虚拟节点
          patchVnode(elmToMove, newStartVnode)
          oldCh[idxInOld] = undefined
          // 移动对应的真实DOM
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm)
        }
      }
      // 处理完成后移动新前指针。改了个BUG 还好5分钟搞定这条忘记写了！
      newStartVnode = newCh[++newStartIdx]
    }
  }
  /*
  * while循环结束
  * */
  console.log("旧前" + oldStartIdx, "旧后" + oldEndIdx)
  console.log("新前" + newStartIdx, "新后" + newEndIdx)
  if (newStartIdx <= newEndIdx) {
    console.log('新子节点还有剩余把！新增它们✔✔✔✔✔✔')
    /*
    * 添加情况
    * */
    before = oldCh[oldEndIdx + 1] == null ? null : oldCh[oldEndIdx + 1].elm
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      api.insertBefore(parentElm, createElement(newCh[i]), before)
    }
  }
  if (oldStartIdx <= oldEndIdx) {
    console.log('旧子节点还有剩余把！删除它们❌❌❌❌❌')
    /*
    * 删除情况
    * */
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      api.removeChild(parentElm, oldCh[i].elm)
    }
  }
  console.log("#")
}

/**
 * 本函数主要是为了创建一个 map ,以老子节点中key的值为map的键，以它在数组中的下标为值
 * */
function createKeyToOldInxMap(oldCh, begin, end) {
  console.warn("xxx")
  const map = {}

  let key, _a
  for (let i = begin; i <= end; i++) {
    key = (_a = oldCh[i]) === null || _a === void 0 ? void 0 : _a.key // 判空检查,确保没有值一定返回 undefined
    if (key !== undefined) {
      map[key] = i
    }
  }

  return map
}

