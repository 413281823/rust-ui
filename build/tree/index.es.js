import { defineComponent, toRefs, reactive, computed, createVNode } from "vue";
const treeProps = {
  data: {
    type: Object,
    required: true
  }
};
function generateInnerTree(tree2, level = 0, path = []) {
  level++;
  return tree2.reduce((prev, cur) => {
    var _a;
    const o = { ...cur };
    o.level = level;
    if (path.length > 0 && path[path.length - 1].level >= level) {
      while (((_a = path[path.length - 1]) == null ? void 0 : _a.level) >= level) {
        path.pop();
      }
    }
    path.push(o);
    const parentNode = path[path.length - 2];
    if (parentNode) {
      o.parentId = parentNode.id;
    }
    if (o.children) {
      const children = generateInnerTree(o.children, level, path);
      delete o.children;
      return prev.concat(o, children);
    } else {
      o.isLeaf = true;
      return prev.concat(o);
    }
  }, []);
}
var tree = /* @__PURE__ */ (() => ".s-tree-node{text-align:left}\n")();
var Tree = defineComponent({
  name: "STree",
  props: treeProps,
  setup(props) {
    const {
      data
    } = toRefs(props);
    const innerData = reactive(generateInnerTree(data.value));
    const toggleNode = (node) => {
      const cur = innerData.find((item) => item.id === node.id);
      if (cur)
        cur.expanded = !cur.expanded;
    };
    const getChildren = (node) => {
      let result = [];
      const startIndex = innerData.findIndex((item) => item.id === node.id);
      for (let i = startIndex + 1; i < innerData.length && node.level < innerData[i].level; i++) {
        result.push(innerData[i]);
      }
      return result;
    };
    const getExpendedTree = computed(() => {
      let excludeNodes = [];
      const result = [];
      for (const item of innerData) {
        if (excludeNodes.map((node) => node.id).includes(item.id)) {
          continue;
        }
        if (item.expanded !== true) {
          excludeNodes = getChildren(item);
          console.log(excludeNodes);
        }
        result.push(item);
      }
      console.log("result:", result);
      return result;
    });
    return () => {
      return createVNode("div", {
        "class": "s-tree"
      }, [
        getExpendedTree.value.map((treeNode) => createVNode("div", {
          "class": "s-tree-node",
          "style": {
            paddingLeft: `${24 * (treeNode.level - 1)}px`
          }
        }, [treeNode.isLeaf ? createVNode("span", {
          "style": {
            display: "inline-block",
            width: "25px"
          }
        }, null) : createVNode("svg", {
          "style": {
            width: "25px",
            height: "16px",
            display: "inline-block",
            transform: treeNode.expanded ? "rotate(90deg)" : ""
          },
          "viewBox": "0 0 1024 1024",
          "xmlns": "http://www.w3.org/2000/svg",
          "onClick": () => toggleNode(treeNode)
        }, [createVNode("path", {
          "fill": "currentColor",
          "d": "M384 192v640l384-320.064z"
        }, null)]), treeNode.label]))
      ]);
    };
  }
});
const CLASS_PREFIX = "s";
const GLOBAL_CONFIG_NAME = "_sniper";
const setGlobalConfig = (app, options = { classPrefix: CLASS_PREFIX }) => {
  var _a;
  app.config.globalProperties[GLOBAL_CONFIG_NAME] = {
    ...(_a = app.config.globalProperties[GLOBAL_CONFIG_NAME]) != null ? _a : {},
    classPrefix: options.classPrefix
  };
};
function installComponent(app, component, options) {
  console.log(component.name);
  const registered = app.component(component.name);
  if (!registered) {
    setGlobalConfig(app, options);
    app.component(component.name, component);
  }
}
var index = {
  install(app, options) {
    installComponent(app, Tree, options);
  }
};
export { Tree, index as default };
