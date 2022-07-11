import { defineComponent, toRefs } from 'vue'
import { LinkProps, linkProps } from './link-types'

export default defineComponent({
  name: 'Link',
  props: linkProps,
  emits: [],
  setup(props: LinkProps) {
    const { type } = toRefs(props)
    console.log(type, '参数')
    return () => {
      return <a class="s-link">{type.value}</a>
    }
  }
})
