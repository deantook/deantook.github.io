import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文章",
    prefix: "/posts/",
    children: [
      { text: "项目管理", link: "项目管理/0-目录" },
    ],
  },
]);
