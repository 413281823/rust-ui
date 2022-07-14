import type { PropType, ExtractPropTypes } from 'vue'

export const formProps = {} as const

export type FormProps = ExtractPropTypes<typeof formProps>
