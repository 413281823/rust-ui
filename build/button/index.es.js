import { defineComponent, toRefs, computed, createVNode } from 'vue'
const buttonProps = {
  size: {
    type: String,
    default: 'medium'
  },
  type: {
    type: String,
    default: 'secondary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
}
var button = /* @__PURE__ */ (() =>
  '.s-btn{display:inline-flex;align-items:center;justify-content:center;height:28px;border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;padding:0 20px;border-radius:var(--s-border-radius, 2px);cursor:pointer;white-space:nowrap;line-height:1.5;outline-width:0px;font-size:var(--s-font-size-md, 12px);transition:background-color var(--s-animation-duration-slow, .3s) var(--s-animation-ease-in-out-smooth, cubic-bezier(.645, .045, .355, 1)),border-color var(--s-animation-duration-slow, .3s) var(--s-animation-ease-in-out-smooth, cubic-bezier(.645, .045, .355, 1)),color var(--s-animation-duration-slow, .3s) var(--s-animation-ease-in-out-smooth, cubic-bezier(.645, .045, .355, 1))}.s-btn.s-btn--primary{color:var(--s-light-text, #ffffff);background-color:var(--s-primary, #5e7ce0)}.s-btn.s-btn--secondary{color:var(--s-text, #252b3a);background-color:var(--s-block, #ffffff);border-color:var(--s-line, #adb0b8)}.s-btn.s-btn--text{padding:0;color:var(--s-brand-active, #526ecc)}.s-btn.s-btn--primary:disabled{color:var(--s-light-text, #ffffff);background:var(--s-primary-disabled, #98a8df);border:none}.s-btn.s-btn--primary:hover{background-color:var(--s-primary-hover, #7693f5)}.s-btn.s-btn--primary:focus{background-color:var(--s-primary-hover, #7693f5)}.s-btn.s-btn--primary:active{background-color:var(--s-primary-active, #344899)}.s-btn.s-btn--secondary:hover{border-color:var(--s-form-control-line-active, #5e7ce0);color:var(--s-brand-active, #526ecc)}.s-btn.s-btn--secondary:focus{border-color:var(--s-form-control-line-active, #5e7ce0);color:var(--s-brand-active, #526ecc)}.s-btn.s-btn--secondary:active{border-color:var(--s-form-control-line-active, #5e7ce0);color:var(--s-brand-active, #526ecc)}.s-btn.s-btn--secondary:disabled{color:var(--s-disabled-text, #757a83);background:var(--s-disabled-bg, #c6c9cf);border:1px solid var(--s-disabled-line, #a5a8ad)}.s-btn.s-btn--text:disabled{color:var(--s-disabled-text, #757a83)}.s-btn.s-btn--text:hover{color:var(--s-brand-active-focus, #344899)}.s-btn.s-btn--text:focus{color:var(--s-brand-active-focus, #344899)}.s-btn.s-btn--text:active{color:var(--s-brand-active-focus, #344899)}.s-btn.s-btn--small{height:24px;padding:0 16px;font-size:var(--s-font-size-md, 10px)}.s-btn.s-btn--medium{font-size:var(--s-font-size-md, 12px)}.s-btn.s-btn--large{height:32px;padding:0 24px;font-size:var(--s-font-size-md, 14px)}.s-btn[disabled]{cursor:not-allowed}.s-btn.s-btn--block{display:block;width:100%}\n')()
var Button = defineComponent({
  name: 'SButton',
  props: buttonProps,
  setup(props, { slots }) {
    const { size, type, disabled, block } = toRefs(props)
    const blickClass = computed(() => (block.value ? 's-btn--block' : ''))
    return () => {
      return createVNode(
        'button',
        {
          class: `s-btn s-btn--${type.value} s-btn--${size.value} ${blickClass.value}`,
          disabled: disabled.value
        },
        [slots.default ? slots.default() : '\u6309\u94AE']
      )
    }
  }
})
var index = {
  install(app) {
    app.component(Button.name, Button)
  }
}
export { Button, index as default }
