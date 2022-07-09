import { PropType, ExtractPropTypes } from 'vue'
export type IButtonType = 'primary' | 'secondary' | 'text'
export type IButtonSize = 'small' | 'medium' | 'large'
function call(funcs: MaybeArray<() => void>): void
function call<A1>(funcs: MaybeArray<(a1: A1) => void>, a1: A1): void
function call<A1, A2>(
  funcs: MaybeArray<(a1: A1, a2: A2) => void>,
  a1: A1,
  a2: A2
): void
function call<A1, A2, A3>(
  funcs: MaybeArray<(a1: A1, a2: A2, a3: A3) => void>,
  a1: A1,
  a2: A2,
  a3: A3
): void
// eslint-disable-next-line @typescript-eslint/ban-types
function call<A extends any[]>(funcs: Function[] | Function, ...args: A): void {
  if (Array.isArray(funcs)) {
    funcs.forEach(func => (call as any)(func, ...args))
  } else return funcs(...args)
}

export { call }

export type MaybeArray<T> = T | T[]

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
  },
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
