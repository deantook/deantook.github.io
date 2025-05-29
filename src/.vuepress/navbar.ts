import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "文章",
        icon: "book",
        prefix: "posts/",
        children: [
            "前端",
            "大模型",
            "golang/",
            "sre/",
            "flutter/"
        ],
    },
]);
