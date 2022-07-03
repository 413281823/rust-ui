import { defineComponent, toRefs, createVNode, createTextVNode } from "vue";
const treeProps = {
  data: {
    type: Object,
    required: true
  }
};
var Tree = defineComponent({
  name: "STree",
  props: treeProps,
  setup(props) {
    toRefs(props);
    return () => {
      return createVNode("div", {
        "class": "s-tree"
      }, [createTextVNode("asdf")]);
    };
  }
});
const CLASS_PREFIX = "s";
const GLOBAL_CONFIG_NAME = "_sniper";
const COMPONENT_PREFIX = "S";
const setGlobalConfig = (app, options = { classPrefix: CLASS_PREFIX }) => {
  var _a;
  app.config.globalProperties[GLOBAL_CONFIG_NAME] = {
    ...(_a = app.config.globalProperties[GLOBAL_CONFIG_NAME]) != null ? _a : {},
    classPrefix: options.classPrefix
  };
};
const getComponentPrefix = (options) => {
  var _a;
  return (_a = options == null ? void 0 : options.componentPrefix) != null ? _a : COMPONENT_PREFIX;
};
function installComponent(app, component, options) {
  const componentPrefix = getComponentPrefix(options);
  const registered = app.component(componentPrefix + component.name);
  if (!registered) {
    setGlobalConfig(app, options);
    app.component(componentPrefix + component.name, component);
  }
}
var index = {
  install(app, options) {
    installComponent(app, Tree, options);
  }
};
export { Tree, index as default };
