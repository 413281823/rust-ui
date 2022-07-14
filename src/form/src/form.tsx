import { defineComponent } from 'vue'
import { FormProps, formProps } from './form-types'

export default defineComponent({
  name: 'Form',
  props: formProps,
  emits: [],
  setup(props: FormProps, ctx) {
    return () => {
      return <div class="s-form"></div>
    }
  }
})
