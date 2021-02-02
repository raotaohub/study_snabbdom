// vnode 就是将传入的参数放在一个对象中并返回它
export default function (sel, data, children, text, elm) {
  const key = data.key
  return { sel, data, children, text, elm, key }
}