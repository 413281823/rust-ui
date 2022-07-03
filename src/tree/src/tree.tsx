import { defineComponent, toRefs, reactive } from 'vue'
import { TreeProps, treeProps } from './tree-types'
import { generateInnerTree } from './utils'
import '../style/tree.scss'
export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps) {
    // 获取data
    const { data } = toRefs(props)
    const innerData = reactive(generateInnerTree(data.value))
    return () => {
      return (
        <div class="s-tree">
          {
            // 循环输出节点
            innerData.map(treeNode => treeNode.label)
          }
        </div>
      )
    }
  }
})
