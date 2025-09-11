import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Moons",
    description: "Moons Txt",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: '文章', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'},
                    {
                        text: '客户端开发',
                        collapsible: true, // 可折叠
                        collapsed: false,  // 默认展开
                        items: [
                            {text: 'Flutter学习计划', link: '/src/app/1_flutter_planning'},
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
