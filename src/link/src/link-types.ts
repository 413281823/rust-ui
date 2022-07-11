import type { PropType, ExtractPropTypes } from 'vue'
type ILinkType = 'primary' | 'success' | 'warning'
export const linkProps = {
  data: {
    type: String as PropType<ILinkType>,
    default: 'primary'
  }
} as const

export type LinkProps = ExtractPropTypes<typeof linkProps>
