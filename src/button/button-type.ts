import { PropType, ExtractPropTypes } from 'vue'
export type IButtonType = 'primary' | 'secondary' | 'text'
export type IButtonSize = 'small' | 'medium' | 'large'
export const buttonProps = {
  size: {
    type: String as PropType<IButtonSize>,
    default: 'medium'
  },
  type: {
    type: String as PropType<IButtonType>,
    default: 'secondary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
