import type { PropType, ExtractPropTypes } from 'vue'
export const linkProps = {
  type: {
    type: String as PropType<string>,
    default: ''
  }
} as const

export type LinkProps = ExtractPropTypes<typeof linkProps>
