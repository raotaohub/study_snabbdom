function insertBefore(parent, newNode, referenceNode) {
  parent.insertBefore(newNode, referenceNode)
}

function appendChild(node, child) {
  node.appendChild(child)
}

function removeChild(node, child) {
  return node.removeChild(child)
}

function parentNode(node) {

  return node.parentNode
}

function nextSibling(node) {
  return node.nextSibling
}

function previousSibling(node) {
  return node.previousSibling
}

export const htmlDomApi = {
  insertBefore,
  appendChild,
  parentNode,
  removeChild,
  nextSibling,
  previousSibling
}
