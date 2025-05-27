# 快速上手 Flutter 指南

Flutter 是 Google 推出的跨平台移动应用开发框架，可以同时构建 iOS 和 Android 应用。以下是快速上手 Flutter 的关键步骤：

## 1. 环境搭建

1. **安装 Flutter SDK**
   - 下载适合你操作系统的 [Flutter SDK](https://flutter.dev/docs/get-started/install)
   - 解压到合适位置，并将 `flutter/bin` 目录添加到 PATH 环境变量

2. **安装 IDE**
   - 推荐使用 [Android Studio](https://developer.android.com/studio) 或 [VS Code](https://code.visualstudio.com/)
   - 安装 Flutter 和 Dart 插件

3. **运行 `flutter doctor`**
   - 在终端运行此命令检查环境配置
   - 根据提示安装缺失的依赖项

## 2. 创建第一个项目

```bash
flutter create my_first_app
cd my_first_app
flutter run
```

## 3. 理解 Flutter 基础

### 主要概念

- **Widget**: Flutter 中一切皆为 widget，包括布局、样式和交互元素
- **MaterialApp**: 遵循 Material Design 规范的应用容器
- **Scaffold**: 提供基本应用框架（AppBar、Body、FloatingActionButton 等）
- **Stateful 和 Stateless Widget**: 区分有状态和无状态组件

### 示例代码

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('欢迎使用 Flutter')),
        body: Center(
          child: Text('Hello, Flutter!'),
        ),
      ),
    );
  }
}
```

## 4. 常用 Widget 速查

| Widget 类型 | 示例 |
|------------|------|
| 文本 | `Text('Hello')` |
| 按钮 | `ElevatedButton(onPressed: () {}, child: Text('点击'))` |
| 图片 | `Image.network('https://example.com/image.jpg')` |
| 列表 | `ListView.builder(itemBuilder: (context, index) => ListTile(...))` |
| 布局 | `Row()`, `Column()`, `Stack()` |
| 表单 | `TextField()`, `Form()`, `TextFormField()` |

## 5. 状态管理基础

```dart
class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('计数: $_counter')),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        child: Icon(Icons.add),
      ),
    );
  }
}
```

## 6. 下一步学习建议

1. 浏览 [Flutter 官方文档](https://flutter.dev/docs)
2. 尝试 [Flutter 示例应用](https://flutter.dev/docs/development/ui/widgets-intro)
3. 学习 Dart 语言基础（Flutter 使用的编程语言）
4. 探索 Flutter 的热重载功能，实时查看修改效果
5. 了解如何添加第三方包（通过 `pubspec.yaml` 文件）

记住，Flutter 的学习曲线可能一开始较陡峭，但随着对 widget 和布局系统的熟悉，开发效率会显著提高。