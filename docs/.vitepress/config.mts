import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Moons",
    description: "Moons Txt",
    lang: 'zh',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: '文章', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: '客户端开发',
                collapsible: true, // 可折叠
                collapsed: false,  // 默认展开
                items: [
                    {
                        text: 'flutter 精进计划',
                        link: '/src/app/1_flutter_planning.md'
                    },
                    {
                        text: '客户端开发概览',
                        collapsible: true, // 可折叠
                        collapsed: false,  // 默认展开
                        items: [
                            {
                                text: '原生开发',
                                collapsible: true, // 可折叠
                                collapsed: false,  // 默认展开
                                items: [
                                    {
                                        text: '原生开发概览',
                                        link: '/src/app/1_intro/1_1_原生开发/1_1_1_原生开发概览.md'
                                    },
                                    {
                                        text: '原生开发的前世今生',
                                        link: '/src/app/1_intro/1_1_原生开发/1_1_2_原生开发的前世今生.md'
                                    },
                                    {
                                        text: '原生开发的拓展知识',
                                        link: '/src/app/1_intro/1_1_原生开发/1_1_3_原生开发的拓展知识.md'
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/deantook'}
        ]
    }
})
