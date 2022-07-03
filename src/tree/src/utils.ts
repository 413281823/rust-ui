import { IInnerTreeNode, ITreeNode } from './tree-types'

export function generateInnerTree(tree: ITreeNode[]): IInnerTreeNode[] {
  return tree.reduce((prev, cur) => {
    const o = { ...cur } as IInnerTreeNode
    if (cur.children) {
      return prev.concat(o, generateInnerTree(cur.children))
    } else {
      return prev.concat(o)
    }
  }, [] as IInnerTreeNode[])
}
