import type { PropType, ExtractPropTypes } from 'vue'

export const inputProps = {} as const

export type InputProps = ExtractPropTypes<typeof inputProps>
