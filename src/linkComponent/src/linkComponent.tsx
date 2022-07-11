import { defineComponent } from 'vue'
import { LinkComponentProps, linkComponentProps } from './linkComponent-types'

export default defineComponent({
  name: 'LinkComponent',
  props: linkComponentProps,
  emits: [],
  setup(props: LinkComponentProps, ctx) {
    return () => {
      return <div class="s-linkComponent"></div>
    }
  }
})
