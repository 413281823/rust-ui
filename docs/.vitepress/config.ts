//这里可以使用markdown-it插件
import {demoBlockPlugin} from "vitepress-theme-demoblock";

export default {
    themeConfig: {
        sidebar: [
            {
                text: "快速开始",
                items:[
                    {text:'安装',link: '/'}
                ]
            },
            {
                text: '组件',
                items: [
                    { text: 'Button', link: '/component/Button/' },
                ]
            }
        ]
    },
    markdown:{
        config(md) {
            md.use(demoBlockPlugin)
        }
    }
}
