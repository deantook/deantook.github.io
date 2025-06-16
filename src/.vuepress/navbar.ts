import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "文章",
        icon: "book",
        prefix: "posts/",
        children: [
            "flutter/",
            "golang/",
            "前端",
            "运维/",
            "大模型",
            "杂技"
        ],
    },
]);
