// button/src/button.tsx
import { defineComponent, toRefs } from 'vue'
import { buttonProps, ButtonProps } from '../button-type'
import '../style/button.scss'
export default defineComponent({
  name: 'SButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type } = toRefs(props)
    return () => {
      return (
        <button class={`s-btn s-btn--${type.value}`}>
          {slots.default ? slots.default() : '按钮'}
        </button>
      )
    }
  }
})
