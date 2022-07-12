import { defineComponent, toRefs } from 'vue'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import useTree from '../hooks/useTree'
import '../style/tree.scss'
const NODE_HEIGHT = 28
const NODE_INDENT = 24
export default defineComponent({
  name: 'Tree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    // 获取data
    const { data, checkable } = toRefs(props)
    const {
      toggleNode,
      getExpendedTree,
      toggleCheckNode,
      getChildrenExpanded
    } = useTree(data)
    const spanStyle = (treeNode: IInnerTreeNode) => {
      return {
        height: `${NODE_HEIGHT * getChildrenExpanded(treeNode).length}px`,
        left: `${NODE_INDENT * (treeNode.level - 1) + 11}px`,
        top: `${NODE_HEIGHT}px`
      }
    }
    return () => {
      return (
        <div class="s-tree">
          {
            // 循环输出节点
            getExpendedTree.value.map(treeNode => (
              <div
                class="s-tree-node hover:bg-slate-300 relative leading-8 flex items-center"
                style={{
                  paddingLeft: `${NODE_HEIGHT * (treeNode.level - 1)}px`
                }}
              >
                {/* 连接线 */}
                {!treeNode.isLeaf && treeNode.expanded && (
                  <span
                    class="s-tree-node__vline absolute w-px bg-gray-400"
                    style={spanStyle(treeNode)}
                  ></span>
                )}

                {treeNode.isLeaf ? (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '25px'
                    }}
                  />
                ) : slots.icon ? (
                  slots.icon({ nodeData: treeNode, toggleNode })
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
                {/* 复选框 */}
                {/** 复选框 */}
                {checkable.value && (
                  <span
                    class={`relative ${
                      treeNode.inChecked ? 's-tree__inChecked' : ''
                    }`}
                  >
                    {treeNode.inChecked && (
                      <span
                        class="s-tree-checkbox__inner cursor-pointer"
                        onClick={() => toggleCheckNode(treeNode)}
                      >
                        -
                      </span>
                    )}
                    <input
                      type="checkbox"
                      style={{ marginRight: '8px' }}
                      v-model={treeNode.checked}
                      onClick={() => toggleCheckNode(treeNode)}
                    ></input>
                  </span>
                )}
                {/** 标签 */}
                {slots.content ? slots.content(treeNode) : treeNode.label}
              </div>
            ))
          }
        </div>
      )
    }
  }
})
