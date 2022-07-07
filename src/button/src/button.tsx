/* eslint-disable vue/no-reserved-component-names */
// button/src/button.tsx
import { defineComponent, toRefs, computed, ComputedRef } from 'vue'
import { buttonProps, ButtonProps } from '../button-type'
import '../style/button.scss'
export default defineComponent({
  name: 'Button',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { size, type, disabled, block } = toRefs(props)
    const blockClass: ComputedRef<string> = computed(() =>
      block.value ? 's-btn--block' : ''
    )
    return () => {
      return (
        <button
          class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockClass.value}`}
          disabled={disabled.value}
        >
          {slots.default ? slots.default() : '按钮'}
        </button>
      )
    }
  }
})
