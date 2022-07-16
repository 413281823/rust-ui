import type { PropType, ExtractPropTypes } from 'vue'
import { EmitType } from '../../types'
export type OnUpdateValue = (value: string & [string, string]) => void
export const inputProps = {
  modelValue: {
    type: String as PropType<string>
  },
  onInput: [Function, Array] as PropType<OnUpdateValue>,
  onFocus: [Function, Array] as PropType<EmitType<(e: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<EmitType<(e: FocusEvent) => void>>,
  onClick: [Function, Array] as PropType<EmitType<(e: MouseEvent) => void>>,
  onChange: [Function, Array] as PropType<OnUpdateValue>
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>
