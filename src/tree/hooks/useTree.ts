import type { ITreeNode, IInnerTreeNode } from '../src/tree-types'
import { reactive, Ref, unref, computed } from 'vue'
import { generateInnerTree } from '../src/utils'
export type valueof<T> = T[keyof T]
export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[]) {
  const innerData: IInnerTreeNode[] = reactive(generateInnerTree(unref(node)))
  const toggleNode = (node: IInnerTreeNode) => {
    // 在原始的列表中获取该节点
    const cur = innerData.find(item => item.id === node.id)
    if (cur) cur.expanded = !cur.expanded
  }
  // 获取那些展开的节点列表
  const getChildren = (
    node: IInnerTreeNode,
    recursive = true
  ): IInnerTreeNode[] => {
    const result: IInnerTreeNode[] = []
    const startIndex = innerData.findIndex(item => item.id === node.id)
    //找到它后面所有的子节点
    for (
      let i = startIndex + 1;
      i < innerData.length && node.level < innerData[i].level;
      i++
    ) {
      if (recursive) {
        result.push(innerData[i])
      } else if (node.level === innerData[i].level - 1) {
        result.push(innerData[i])
      }
    }
    return result
  }
  // 获取那些展开的节点列表
  const getExpendedTree = computed(() => {
    // 收起的节点
    let excludeNodes: IInnerTreeNode[] = []
    const result: IInnerTreeNode[] = []

    for (const item of innerData) {
      // 如果遍历的节点在排除列表中，跳过本次循环
      if (excludeNodes.map(node => node.id).includes(item.id)) {
        continue
      }
      // 当前节点收起，它的子节点应该被排除掉
      if (item.expanded !== true) {
        excludeNodes = getChildren(item)
        console.log(excludeNodes)
      }
      result.push(item)
    }
    console.log('result:', result)
    return result
  })
  const getIndex = (node: IInnerTreeNode): number => {
    if (!node) {
      return -1
    }

    return innerData.findIndex(item => item.id === node.id)
  }
  const getNode = (node: IInnerTreeNode): IInnerTreeNode | undefined => {
    return innerData.find(item => item.id === node.id)
  }

  const setNodeValue = (
    node: IInnerTreeNode,
    key: keyof IInnerTreeNode,
    value: valueof<IInnerTreeNode>
  ): void => {
    if (getIndex(node) !== -1) {
      innerData[getIndex(node)][key] = value
    }
  }
  const toggleCheckNode = (node: IInnerTreeNode, checked = false) => {
    // 避免初始化的时候node中没有checked设置
    if (!node.parentId) {
      return
    }
    node.checked = !node.checked
    // 父到子之间的联动
    // 获取我们的子节点，并且同步他们的选中状态和父节点一致
    getChildren(node).forEach(child => {
      child.checked = node.checked
    })
    // 子节点是否有选中
    let childChecked = checked
    // 子-父联动
    // 获取父节点
    const parentNode = innerData.find(item => item.id === node.parentId)
    if (!parentNode) {
      return
    }
    if (checked) {
      if (!parentNode.checked) {
        setNodeValue(parentNode, 'checked', true)
      }
    } else {
      const siblingNodes = getChildren(parentNode, false)
      console.log(siblingNodes)
      const checkableSiblingNodes = siblingNodes.filter(item => item.checked)
      if (siblingNodes.length === checkableSiblingNodes.length) {
        // 所有兄弟节点均选中，父节点应该被选中
        setNodeValue(parentNode, 'checked', true)
        childChecked = true
      } else {
        setNodeValue(parentNode, 'checked', false)
      }
    }
    // // 获取我的兄弟节点：相当于获取parentNode的直接子节点

    if (parentNode.parentId) {
      // 递归往上设置父节点的 checked 属性
      toggleCheckNode(parentNode, childChecked)
    }
  }
  return {
    innerData,
    toggleNode,
    getChildren,
    getExpendedTree,
    toggleCheckNode
  }
}
