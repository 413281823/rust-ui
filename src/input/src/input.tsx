import { defineComponent } from 'vue'
import { InputProps, inputProps } from './input-types'
import '../style/input.scss'
export default defineComponent({
  name: 'Input',
  props: inputProps,
  emits: ['update:modelValue'],
  setup(props: InputProps, { emit }) {
    const handleInput = (e: InputEvent | Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
    return () => {
      return (
        <input
          class="s-input"
          value={props.modelValue}
          onInput={handleInput}
        ></input>
      )
    }
  }
})
