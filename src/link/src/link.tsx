import { defineComponent, toRefs } from 'vue'
import { LinkProps, linkProps } from './link-types'

export default defineComponent({
  name: 'Link',
  props: linkProps,
  emits: [],
  setup(props: LinkProps) {
    const { type } = toRefs(props)
    const handleClick = (data: string) => {
      console.log(data)
    }
    return () => {
      return (
        <a class="s-link" onClick={() => handleClick(type.value)}>
          {type.value}
        </a>
      )
    }
  }
})
