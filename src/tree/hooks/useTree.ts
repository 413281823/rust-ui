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
  const getParent = (node: IInnerTreeNode): IInnerTreeNode => {
    const parentNode = innerData.find(item => item.id === node.parentId)
    return parentNode as IInnerTreeNode
  }
  // 子-父联动 并且设置父节点选中内容
  const setChecked = (node: IInnerTreeNode) => {
    // 获取父节点
    const parentNode = getParent(node)
    if (!parentNode) return
    // 获取兄弟节点：相当于获取 parentNode 的直接子节点
    const siblingNodes = getChildren(parentNode, true)
    // 兄弟节点是否全部选中状态
    console.log(siblingNodes)
    const siblingCheckStatus = siblingNodes.every(sibling => sibling.checked)
    parentNode.checked = siblingCheckStatus
    const siblingIncheckedStatus = siblingNodes.some(child => child.checked)
    if (siblingCheckStatus) {
      // 全部选中
      parentNode.inChecked = false
    } else if (siblingIncheckedStatus) {
      // 兄弟节点中存在选中的节点
      parentNode.inChecked = true
    } else {
      parentNode.inChecked = false
    }
    if (parentNode.parentId) setChecked(parentNode)
  }
  // checkBox click 事件
  const toggleCheckNode = (node: IInnerTreeNode) => {
    // 避免初始化的时候 node 中没有 checked 设置
    node.checked = !node.checked
    node.inChecked = false // 重置待选中状态
    // 父 => 联动
    // 获取子节点，并同步他们的选中状态和父节点一致
    getChildren(node).forEach(child => {
      child.checked = node.checked
    })
    setChecked(node)
  }
  // 计算参考线高度
  const getChildrenExpanded = (
    node: IInnerTreeNode,
    result: IInnerTreeNode[] = []
  ) => {
    // 获取当前节点的直接子节点
    const childrenNodes = getChildren(node, false)
    result.push(...childrenNodes)
    childrenNodes.forEach(item => {
      if (item.expanded) {
        getChildrenExpanded(item, result)
      }
    })
    return result
  }
  return {
    innerData,
    toggleNode,
    getChildren,
    getExpendedTree,
    toggleCheckNode,
    getChildrenExpanded
  }
}
