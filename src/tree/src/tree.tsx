import { defineComponent, toRefs, reactive, computed } from 'vue'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import { generateInnerTree } from './utils'
import '../style/tree.scss'

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps) {
    // 获取data
    const { data } = toRefs(props)
    const innerData = reactive(generateInnerTree(data.value))
    const toggleNode = (node: IInnerTreeNode) => {
      // 在原始的列表中获取该节点
      const cur = innerData.find(item => item.id === node.id)
      if (cur) cur.expanded = !cur.expanded
    }
    // 获取那些展开的节点列表
    const getChildren = (node: IInnerTreeNode): IInnerTreeNode[] => {
      let result = []
      const startIndex = innerData.findIndex(item => item.id === node.id)
      //找到它后面所有的子节点
      for (
        let i = startIndex + 1;
        i < innerData.length && node.level < innerData[i].level;
        i++
      ) {
        result.push(innerData[i])
      }
      return result
    }
    // 获取那些展开的节点列表
    const getExpendedTree = computed(() => {
      // 收起的节点
      let excludeNodes: IInnerTreeNode[] = []
      const result = []

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

    return () => {
      return (
        <div class="s-tree">
          {
            // 循环输出节点
            getExpendedTree.value.map(treeNode => (
              <div
                class="s-tree-node"
                style={{
                  paddingLeft: `${24 * (treeNode.level - 1)}px`
                }}
              >
                {treeNode.isLeaf ? (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '25px'
                    }}
                  />
                ) : (
                  <svg
                    style={{
                      width: '25px',
                      height: '16px',
                      display: 'inline-block',
                      transform: treeNode.expanded ? 'rotate(90deg)' : ''
                    }}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => toggleNode(treeNode)}
                  >
                    <path
                      fill="currentColor"
                      d="M384 192v640l384-320.064z"
                    ></path>
                  </svg>
                )}
                {treeNode.label}
              </div>
            ))
          }
        </div>
      )
    }
  }
})
