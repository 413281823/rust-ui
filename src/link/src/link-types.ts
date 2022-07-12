import type { PropType, ExtractPropTypes } from 'vue'
export const linkProps = {
  type: {
    type: String,
    default: ''
  }
} as const

export type LinkProps = ExtractPropTypes<typeof linkProps>
