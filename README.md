### 环境信息 

1. 版本为 webpack@5

### 主要的功能模块和思路 h函数 => 虚拟节点 

### 相关DOM知识

```js
`把DOM就看作是学习CSS那样。掌握几个要点。`
1. 什么是DOM？
    
2. 如何获取元素？
    (1). document.getElementById(id:string(区分大小写))         @return: 元素对象Object
    (2). document.getElementsByTagName(tag:string(标签名))      @return: 元素对象集合的伪数组 HTMLCollection
    // HTML5以后的
    (3). document.getElementsByClassName(className:string)     @return: 元素对象集合的伪数组 HTMLCollection
    (4). document.querySelector('.class'||'#id'||'tagName')    @return: 选择器选择的第一个对象
    (5). document.querySelectorAll('.class'||'#id'||'tagName') @return: 素对象集合的伪数组 选择器选择的  全部对象
    ====================================================================================
    获取特殊元素
    (1). document.body                                         @return: body元素对象
    (2). document.documentElement                              @return: HTML元素对象

3. 如何操作元素？
    (1). element.innerHTML
    (2). element.innerText
    (3). element.tagName    标签名
    (4). element.href       超链接值
    (5). ...

4. 什么是事件？
    1.事件源
    2.事件类型
    3.事件处理程序
        ——事件三要素
    btn.onclick = ()=>{ //... }

5. 节点是什么？
   (1). 整个DOM文档中，所有的元素都是节点。利用节点的层次关系操作元素比较灵活。
   一个节点中至少拥有 1. nodeType 2. nodeName 3. nodeValue 这3个基本属性
   Node.nodeType = 1 元素节点
   Node.nodeType = 2 属性节点
   Node.nodeType = 3 文本节点

   (2). 如何操作元素节点？
        属性
        (1). `Node.childNodes`    @return: 包含所有子节点的`类数组`
        (2). Node.firstNode     @return: 返回该节点的第一个子节点Node，若该节点没有子节点则返回null
        (3). Node.lastNode      @return: 返回该节点最后一个子节点Node，若该节点没有子节点则返回null
        (4). Node.parentNode    @return: 返回一个当前节点(最近的)Node的父节点，如果没有返回null
        (5). Node.textContent   @return: 返回或设置一个元素内所有子节点及其后代的文本内容。
        (6). Node.nodeName      @return: 节点名的DOM字符串 ”#text“
        (7). Node.nodeValue     @return: 返回或设置节点值
        (8). `previousSibling`    @return: 返回当前节点的上一个兄弟节点
        (9). `nextSibling`        @return: 返回当前节点的下一个兄弟节点

        方法
        `(1). parentNode.appendChild(Node) 类似push。 若(参数引用了 DOM 树上的现有节点，则节点将从当前位置分离，并附加到新位置。)
        (2). parentNode.insertBefore(newNode,pivot) 在pivot之前插入newNode节点，
        (3). parentNode.removeChild(Node)
        (4). parentNode.replaceChild(newChild, oldChild)`

```