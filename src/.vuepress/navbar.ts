import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "文章",
        icon: "book",
        prefix: "posts/",
        children: [
            "front",
            "LargeModel",
            "golang/",
            "sre/",
            "flutter/"
        ],
    },
]);
