import type { PropType, ExtractPropTypes } from 'vue'
type ILinkType = 'primary' | 'success' | 'warning'
export const linkProps = {
  type: {
    type: String as PropType<ILinkType>,
    default: ''
  }
} as const

export type LinkProps = ExtractPropTypes<typeof linkProps>
