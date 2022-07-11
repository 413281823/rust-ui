import { defineComponent, toRefs } from 'vue'
import { LinkProps, linkProps } from './link-types'

export default defineComponent({
  name: 'Link',
  props: linkProps,
  emits: [],
  setup(props: LinkProps) {
    const { data } = toRefs(props)
    console.log(data.value, '参数')
    return () => {
      return <a class="s-link">{data.value}</a>
    }
  }
})
