import type { PropType, ExtractPropTypes } from 'vue'
type LinkType = 'primary' | 'success' | 'warning'
export const linkProps = {
  type: {
    type: String as PropType<LinkType>,
    default: ''
  }
} as const

export type LinkProps = ExtractPropTypes<typeof linkProps>
