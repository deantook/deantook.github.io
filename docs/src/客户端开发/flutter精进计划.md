# 📚 Flutter 精进计划

## 🟢 阶段 0：客户端知识打底（1–2 周）

- [x] **客户端历史 & 概念**
  - [ ] 了解原生开发（Android：Java/Kotlin，iOS：Objective-C/Swift）
  - [ ] 了解混合开发（Cordova、Ionic、React Native）
  - [ ] 了解跨平台开发（Flutter、KMP、.NET MAUI）
- [ ] **客户端开发通识**
  - [ ] 学习 UI 渲染机制与事件循环
  - [ ] 学习 App 生命周期、页面生命周期（重点）
  - [ ] 理解客户端状态管理（与服务端 stateless 对比）
  - [ ] 学习本地存储方式（KV 存储、SQLite、文件系统）
  - [ ] 掌握客户端网络特点（断网、弱网、缓存、重试）
- [ ] **工程化 & 发布**
  - [ ] 学习 Android 构建工具（Gradle）与 iOS 构建工具（Xcode Build）
  - [ ] 理解依赖管理（Maven / CocoaPods / pub.dev）
  - [ ] 学习应用签名与发布流程（Google Play / App Store）
  - [ ] 了解 CI/CD（Fastlane、Codemagic）

👉 **目标**：只需理解整体概念，不必深入。

## 🟢 阶段 1：Dart & Flutter 基础（2 周）

- [ ] **环境搭建 & Dart 基础**
  - [ ] 安装 Flutter SDK、配置开发环境
  - [ ] 熟悉项目结构（lib、pubspec.yaml、android/ios）
  - [ ] 学习 Dart 基础语法（变量、函数、类、集合）
  - [ ] 学习异步编程（Future、async/await、Stream）
- [ ] **UI & 布局**
  - [ ] 学习常用 Widget（Text、Image、Container、Row、Column、Stack）
  - [ ] 学习列表组件（ListView、GridView）
  - [ ] 学习布局系统（Flex、Expanded、Align）
  - [ ] 熟悉 Material 与 Cupertino 风格
- [ ] **路由与多页面**
  - [ ] 学习 Navigator 1.0（push/pop）
  - [ ] 学习命名路由与参数传递
  - [ ] 使用 BottomNavigationBar / TabBar 实现多页面切换
  - [ ] 学习 App 生命周期与 Widget 生命周期
- [ ] **小项目实践**
  - [ ] 实现一个多页面的新闻阅读 App（假数据即可）

## 🟢 阶段 2：状态管理 & 工程化（3 周）

- [ ] **状态管理入门**
  - [ ] 使用 setState 管理本地状态
  - [ ] 理解 InheritedWidget 原理
  - [ ] 学习 Provider（ChangeNotifier）
  - [ ] 学习 Riverpod（理解 Provider 不足后进阶）
- [ ] **网络 & 数据**
  - [ ] 使用 http / dio 请求 API
  - [ ] 学习 JSON 解析（手写 Model）
  - [ ] 使用 json_serializable 自动生成 Model
  - [ ] 使用 shared_preferences 存储简单数据
  - [ ] 使用 sqflite 进行本地数据库操作
- [ ] **工程化**
  - [ ] 学习模块化项目结构（分层架构）
  - [ ] 配置多环境（dev/prod）
  - [ ] 学习日志记录与错误收集
- [ ] **小项目实践**
  - [ ] 简单购物车 App（含本地存储 + Provider 状态管理）

## 🟢 阶段 3：进阶 & 综合项目（3–4 周）

- [ ] **UI 优化 & 动画**
  - [ ] 学习主题与样式（ThemeData、ColorScheme）
  - [ ] 使用 Hero 动画实现页面切换
  - [ ] 使用 AnimatedContainer、AnimatedOpacity 等隐式动画
  - [ ] 学习 CustomPainter 绘制自定义图形
- [ ] **原生交互 & 工程落地**
  - [ ] 学习 Flutter 与原生交互（MethodChannel）
  - [ ] 学习 CI/CD（Codemagic / Fastlane）
- [ ] **综合项目：个人记账 App**
  - [ ] 设计需求与数据库表结构
  - [ ] 实现首页 UI（收支列表）
  - [ ] 实现收支记录表单
  - [ ] 实现本地存储（sqflite）
  - [ ] 实现分类功能（餐饮、交通、娱乐…）
  - [ ] 实现统计功能（按分类汇总）
  - [ ] 使用 fl_chart 显示图表
  - [ ] 实现设置页（主题切换、语言切换）
  - [ ] 应用动画优化体验
  - [ ] 使用 Provider/Riverpod/Bloc 管理全局状态
  - [ ] （扩展）增加 API 同步 → 本地 + 服务端结合
- [ ] **总结**
  - [ ] 自测与修复 Bug
  - [ ] 编写 README 与文档
  - [ ] 打包 & 签名
  - [ ] 部署到真机运行

## 🟢 阶段 4：扩展提升（长期）

- [ ] 学习 Flutter Web 与桌面端开发
- [ ] 学习高级状态管理（Riverpod、Bloc、MobX）
- [ ] 学习 Flutter 与原生交互（MethodChannel）
- [ ] 参与开源项目 / 发布自己的 Flutter 库
- [ ] 学习客户端性能优化（内存分析、掉帧检测、电池优化）


我是一个服务端工程师，我要学习 flutter 开发，这是我根据自身条件给自己设置的课程安排，我需要你根据这个安排一步步地给我生成讲义或者内容。如，现在开始第一步：了解原生开发（Android：Java/Kotlin，iOS：Objective-C/Swift）