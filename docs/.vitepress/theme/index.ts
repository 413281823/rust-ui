import Theme from 'vitepress/theme'
import HelloWorld from "../../../src/components/HelloWorld.vue"
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import "vitepress-theme-demoblock/theme/styles/index.css"
export default {
    ...Theme,
    //扩张应用程序实例
    enhanceApp({app}) {
        app.component("HelloWorld",HelloWorld)
        app.component("DemoBlock",DemoBlock)
        app.component("Demo",Demo)
    }
}
