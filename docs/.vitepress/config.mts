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
                        link: '/src/客户端开发/flutter精进计划.md'
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
                                        link: '/src/客户端开发/客户端开发概述/原生开发/概览.md'
                                    },
                                    {
                                        text: '原生开发的前世今生',
                                        link: '/src/客户端开发/客户端开发概述/原生开发/前世今生.md'
                                    },
                                    {
                                        text: '原生开发的拓展知识',
                                        link: '/src/客户端开发/客户端开发概述/原生开发/拓展知识.md'
                                    },
                                ]
                            },
                            {
                                text: '混合开发',
                                collapsible: true, // 可折叠
                                collapsed: false,  // 默认展开
                                items: [
                                    {
                                        text: '混合开发概览',
                                        link: '/src/客户端开发/客户端开发概述/混合开发/概览.md'
                                    },
                                    {
                                        text: '混合开发的前世今生',
                                        link: '/src/客户端开发/客户端开发概述/混合开发/前世今生.md'
                                    },
                                ]
                            },
                            {
                                text: '跨平台开发',
                                collapsible: true, // 可折叠
                                collapsed: false,  // 默认展开
                                items: [
                                    {
                                        text: '概览',
                                        link: '/src/客户端开发/客户端开发概述/跨平台开发/概览.md'
                                    },
                                    {
                                        text: '前世今生',
                                        link: '/src/客户端开发/客户端开发概述/跨平台开发/前世今生.md'
                                    },
                                    {
                                        text: '现代跨平台开发框架',
                                        link: '/src/客户端开发/客户端开发概述/跨平台开发/现代跨平台开发框架.md'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        text: '通识',
                        collapsible: true, // 可折叠
                        collapsed: false,  // 默认展开
                        items: [
                            {
                                text: 'UI渲染机制与事件循环',
                                link: '/src/客户端开发/通识/UI渲染机制与事件循环.md'
                            },
                            {
                                text: 'App生命周期与页面生命周期',
                                link: '/src/客户端开发/通识/App生命周期与页面生命周期.md'
                            },
                            {
                                text: '状态管理',
                                link: '/src/客户端开发/通识/状态管理.md'
                            },
                            {
                                text: '本地存储方式',
                                link: '/src/客户端开发/通识/本地存储方式.md'
                            },
                            {
                                text: '网络特点',
                                link: '/src/客户端开发/通识/网络特点.md'
                            },
                            {
                                text: '拓展通识',
                                link: '/src/客户端开发/通识/拓展通识.md'
                            },
                            {
                                text: '全景图：从底层机制到架构思维',
                                link: '/src/客户端开发/通识/全景图：从底层机制到架构思维.md'
                            },
                        ]
                    },
                    {
                        text: '工程化',
                        collapsible: true, // 可折叠
                        collapsed: false,  // 默认展开
                        items: [
                            {
                                text: 'Android构建工具',
                                link: '/src/客户端开发/工程化/Android构建工具.md'
                            },
                            {
                                text: 'iOS构建工具',
                                link: '/src/客户端开发/工程化/iOS构建工具.md'
                            },
                            {
                                text: '桌面端构建工具',
                                link: '/src/客户端开发/工程化/桌面端构建工具.md'
                            },
                            {
                                text: '依赖管理',
                                link: '/src/客户端开发/工程化/依赖管理.md'
                            },
                            {
                                text: 'CI/CD',
                                link: '/src/客户端开发/工程化/CICD.md'
                            },
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
