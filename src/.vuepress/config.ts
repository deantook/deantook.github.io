import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "文澜阁",
      description: "好风凭借力，送我上青云",
    }
  },
  theme,
  shouldPrefetch: false,
});