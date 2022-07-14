import { defineComponent } from 'vue'
import { InputProps, inputProps } from './input-types'

export default defineComponent({
  name: 'Input',
  props: inputProps,
  emits: [],
  setup(props: InputProps, ctx) {
    return () => {
      return <div class="s-input"></div>
    }
  }
})
