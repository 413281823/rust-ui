import { PropType, ExtractPropTypes } from 'vue'
export type IButtonType = 'primary' | 'secondrary' | 'text'

export const buttonProps = {
  type: {
    type: String as PropType<IButtonType>,
    default: 'secondrary'
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
