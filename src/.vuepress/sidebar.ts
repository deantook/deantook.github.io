import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "",
        {
            text: "项目管理",
            collapsible: true,
            prefix: "/posts/项目管理/",
            children: [
                {text: "目录", link: "0-目录"},
                {
                    text: "流程管理",
                    collapsible: true,
                    prefix: "/posts/项目管理/01-流程管理",
                    children: [
                        {text: "项目规划", link: "1-项目规划"},
                        {text: "敏捷方法", link: "2-敏捷方法"},
                        {text: "风险管理", link: "3-风险管理"},
                        {text: "依赖管理", link: "4-依赖管理"},
                        {text: "里程碑管理", link: "5-里程碑管理"},
                        {text: "范围管理", link: "6-范围管理"},
                        {text: "时间估算", link: "7-时间估算"},
                        {text: "执行与交付", link: "8-执行与交付"},
                    ]
                },
                {
                    text: "技术领导力",
                    collapsible: true,
                    prefix: "/posts/项目管理/02-技术领导力",
                    children: [
                        {text: "架构决策", link: "01-架构决策"},
                        {text: "系统监控与性能", link: "02-系统监控与性能"},
                        {text: "基础设施扩展", link: "03-基础设施扩展"},
                        {text: "技术债务管理", link: "04-技术债务管理"},
                        {text: "技术路线规划", link: "05-技术路线规划"},
                        {text: "构建 vs 购买评估", link: "06-构建 vs 购买评估"},
                        {text: "技术风险评估", link: "07-技术风险评估"},
                        {text: "安全与测试策略", link: "08-安全与测试策略"},
                        {text: "CI/CD 实施与发布流程", link: "09-CICD 实施与发布流程"},
                    ]
                },
                {
                    text: "团队与人员管理",
                    collapsible: true,
                    prefix: "/posts/项目管理/03-团队与人员管理",
                    children: [
                        {text: "招聘与团队结构", link: "1-招聘与团队结构"},
                        {text: "绩效评估", link: "2-绩效评估"},
                        {text: "指导与辅导", link: "3-指导与辅导"},
                        {text: "职业发展规划", link: "4-职业发展规划"},
                        {text: "团队授权与任务分配", link: "5-团队授权与任务分配"},
                        {text: "冲突解决与反馈", link: "6-冲突解决与反馈"},
                        {text: "团队激励与信任建立", link: "7-团队激励与信任建立"},
                        {text: "一对一会议与团队会议", link: "8-一对一会议与团队会议"},
                    ]
                },
                {
                    text: "质量与流程",
                    collapsible: true,
                    prefix: "/posts/项目管理/04-质量与流程",
                    children: [
                        {text: "事件管理", link: "1-事件管理"},
                        {text: "测试策略", link: "2-测试策略"},
                        {text: "代码评审最佳实践", link: "3-代码评审最佳实践"},
                        {text: "文档与标准", link: "4-文档与标准"},
                        {text: "持续改进与流程优化", link: "5-持续改进与流程优化"},
                    ]
                },
                {
                    text: "业务洞察",
                    collapsible: true,
                    prefix: "/posts/项目管理/05-业务洞察",
                    children: [
                        {text: "产品战略对齐", link: "1-产品战略对齐"},
                        {text: "投资回报分析", link: "2-投资回报分析"},
                        {text: "市场与竞争分析", link: "3-市场与竞争分析"},
                        {text: "预算与成本优化", link: "4-预算与成本优化"},
                        {text: "供应商管理", link: "5-供应商管理"},
                    ]
                },
                {
                    text: "沟通与协作",
                    collapsible: true,
                    prefix: "/posts/项目管理/06-沟通与协作",
                    children: [
                        {text: "利益相关者管理", link: "1-利益相关者管理"},
                        {text: "跨部门协作", link: "2-跨部门协作"},
                        {text: "高层沟通与报告", link: "3-高层沟通与报告"},
                        {text: "客户反馈与关系管理", link: "4-客户反馈与关系管理"},
                        {text: "合作伙伴与技术集成", link: "5-合作伙伴与技术集成"},
                    ]
                },
                {
                    text: "工程文化",
                    collapsible: true,
                    prefix: "/posts/项目管理/07-工程文化",
                    children: [
                        {text: "团队文化建设", link: "1-团队文化建设"},
                        {text: "包容性环境", link: "2-包容性环境"},
                        {text: "学习与知识分享", link: "3-学习与知识分享"},
                        {text: "无责后检", link: "4-无责后检"},
                        {text: "创新与持续改进", link: "5-创新与持续改进"},
                    ]
                },
                {
                    text: "变更管理",
                    collapsible: true,
                    prefix: "/posts/项目管理/08-变更管理",
                    children: [
                        {text: "技术变更", link: "1-技术变更"},
                        {text: "组织变革", link: "2-组织变革"},
                        {text: "团队重组", link: "3-团队重组"},
                        {text: "工具与流程迁移", link: "4-工具与流程迁移"},
                    ]
                },
                {
                    text: "危机与应急管理",
                    collapsible: true,
                    prefix: "/posts/项目管理/09-危机与应急管理",
                    children: [
                        {text: "紧急应对与战情室", link: "1-紧急应对与战情室"},
                        {text: "事件响应与服务恢复", link: "2-事件响应与服务恢复"},
                        {text: "灾难恢复与业务连续性", link: "3-灾难恢复与业务连续性"},
                        {text: "安全事件处理", link: "4-安全事件处理"},
                    ]
                },
                {
                    text: "知识与文档管理",
                    collapsible: true,
                    prefix: "/posts/项目管理/10-知识与文档管理",
                    children: [
                        {text: "架构与流程文档", link: "1-架构与流程文档"},
                        {text: "经验总结与最佳实践", link: "2-经验总结与最佳实践"},
                        {text: "知识库与分享活动", link: "3-知识库与分享活动"},
                        {text: "变更记录与决策文档", link: "4-变更记录与决策文档"},
                    ]
                },
            ],
        },
    ],
});
