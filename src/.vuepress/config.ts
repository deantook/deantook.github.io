import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "deantook",
  description: "vuepress-theme-hope 的deantook",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
