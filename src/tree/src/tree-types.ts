import type { PropType, ExtractPropTypes } from 'vue'

export interface ITreeNode {
  label: string
  id?: string
  children?: ITreeNode[]
  selected?: boolean
  checked?: boolean
  expanded?: boolean
  disableSelect?: boolean
  disableCheck?: boolean
  disableToggle?: boolean
}

export interface IInnerTreeNode extends ITreeNode {
  parentId?: string
  level: number
  isLeaf?: boolean
}

export const treeProps = {
  data: {
    type: Object as PropType<Array<ITreeNode>>,
    required: true
  },
  // 复选框控制
  checkable: {
    type: Boolean,
    default: false
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>
