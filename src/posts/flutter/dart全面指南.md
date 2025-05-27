# Dart 全面指南

Dart 是 Google 开发的一种面向对象的编程语言，主要用于构建跨平台的移动、Web 和桌面应用程序。以下是 Dart 语言的全面指南：

## 1. Dart 语言基础

### 变量与数据类型
```dart
// 变量声明
var name = 'Dart'; // 类型推断
String language = 'Dart'; // 显式类型
final version = '3.0'; // 运行时常量
const pi = 3.14; // 编译时常量

// 基本数据类型
int age = 30; // 整数
double height = 1.75; // 浮点数
bool isDartCool = true; // 布尔值
String greeting = 'Hello'; // 字符串
dynamic anything = 'can be any type'; // 动态类型
```

### 运算符
```dart
// 算术运算符
var sum = 5 + 3;
var remainder = 10 % 3;

// 关系运算符
bool isEqual = (5 == 5);

// 逻辑运算符
bool result = (true && false) || true;

// 类型测试运算符
if (anything is String) {
  print('It is a String');
}

// 空安全运算符
String? nullableString;
var length = nullableString?.length ?? 0; // 如果为null则返回0
```

## 2. 控制流程

### 条件语句
```dart
// if-else
if (age > 18) {
  print('Adult');
} else {
  print('Minor');
}

// switch-case
var grade = 'A';
switch (grade) {
  case 'A':
    print('Excellent');
    break;
  case 'B':
    print('Good');
    break;
  default:
    print('Unknown');
}
```

### 循环
```dart
// for循环
for (var i = 0; i < 5; i++) {
  print(i);
}

// for-in循环
var numbers = [1, 2, 3];
for (var number in numbers) {
  print(number);
}

// while循环
var i = 0;
while (i < 3) {
  print(i);
  i++;
}

// do-while循环
do {
  print(i);
  i--;
} while (i > 0);
```

## 3. 集合类型

### List (数组)
```dart
var list = [1, 2, 3]; // 类型推断为List<int>
List<String> names = ['Alice', 'Bob', 'Charlie'];

// 常用操作
list.add(4); // 添加元素
list.remove(2); // 移除元素
print(list.length); // 获取长度
print(list[0]); // 访问元素
```

### Set (集合)
```dart
var uniqueNumbers = {1, 2, 3}; // 类型推断为Set<int>
Set<String> countries = {'USA', 'UK', 'Japan'};

// 常用操作
uniqueNumbers.add(4); // 添加元素
uniqueNumbers.remove(2); // 移除元素
print(uniqueNumbers.contains(3)); // 检查包含
```

### Map (字典)
```dart
var person = {'name': 'Alice', 'age': 30}; // 类型推断为Map<String, Object>
Map<String, int> scores = {'Alice': 90, 'Bob': 85};

// 常用操作
person['gender'] = 'female'; // 添加键值对
print(person['name']); // 访问值
print(person.containsKey('age')); // 检查键
```

## 4. 函数

### 基本函数
```dart
// 定义函数
int add(int a, int b) {
  return a + b;
}

// 箭头函数（单行函数）
int multiply(int a, int b) => a * b;

// 可选参数
void greet(String name, [String? title]) {
  print('Hello ${title ?? ''} $name');
}

// 命名参数
void introduce({required String name, int age = 18}) {
  print('I am $name, $age years old');
}

// 调用函数
greet('Alice'); // 可选参数
introduce(name: 'Bob', age: 25); // 命名参数
```

### 高阶函数
```dart
// 函数作为参数
void process(Function callback) {
  callback();
}

// 匿名函数
var list = [1, 2, 3];
list.forEach((item) {
  print(item);
});

// 闭包
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}
var add2 = makeAdder(2);
print(add2(3)); // 输出5
```

## 5. 面向对象编程

### 类与对象
```dart
class Person {
  // 实例变量
  String name;
  int age;
  
  // 构造函数
  Person(this.name, this.age);
  
  // 命名构造函数
  Person.guest() {
    name = 'Guest';
    age = 18;
  }
  
  // 方法
  void introduce() {
    print('I am $name, $age years old');
  }
}

// 使用类
var person = Person('Alice', 30);
person.introduce();
var guest = Person.guest();
```

### 继承与多态
```dart
class Animal {
  void makeSound() {
    print('Some sound');
  }
}

class Dog extends Animal {
  @override
  void makeSound() {
    print('Bark');
  }
}

class Cat extends Animal {
  @override
  void makeSound() {
    print('Meow');
  }
}

// 多态
Animal myPet = Dog();
myPet.makeSound(); // 输出Bark
```

### 接口与抽象类
```dart
// 抽象类
abstract class Shape {
  double area(); // 抽象方法
}

// 实现接口
class Circle implements Shape {
  double radius;
  
  Circle(this.radius);
  
  @override
  double area() {
    return 3.14 * radius * radius;
  }
}
```

### Mixin
```dart
mixin Swimming {
  void swim() {
    print('Swimming');
  }
}

mixin Flying {
  void fly() {
    print('Flying');
  }
}

class Duck with Swimming, Flying {}

var duck = Duck();
duck.swim();
duck.fly();
```

## 6. 异步编程

### Future
```dart
Future<String> fetchUserData() {
  // 模拟异步操作
  return Future.delayed(Duration(seconds: 2), () => 'User Data');
}

void main() {
  fetchUserData().then((data) {
    print(data);
  }).catchError((error) {
    print('Error: $error');
  });
  
  print('Fetching data...');
}
```

### async/await
```dart
Future<void> printUserData() async {
  try {
    var data = await fetchUserData();
    print(data);
  } catch (error) {
    print('Error: $error');
  }
}
```

### Stream
```dart
Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

void main() async {
  await for (var number in countStream(5)) {
    print(number);
  }
}
```

## 7. 空安全

Dart 的空安全特性帮助避免空指针异常：

```dart
// 可空类型
String? nullableString;

// 非空断言
print(nullableString!.length); // 运行时可能抛出异常

// 空检查
if (nullableString != null) {
  print(nullableString.length); // 自动提升为非空
}

// 空合并运算符
var length = nullableString?.length ?? 0;
```

## 8. 泛型

```dart
class Box<T> {
  T value;
  
  Box(this.value);
  
  T getValue() => value;
}

void main() {
  var intBox = Box<int>(10);
  var stringBox = Box<String>('Hello');
  
  print(intBox.getValue());
  print(stringBox.getValue());
}
```

## 9. 扩展方法

```dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }
}

void main() {
  var numString = '42';
  print(numString.parseInt()); // 输出42
}
```

## 10. 库与导入

```dart
// 导入核心库
import 'dart:math';

// 导入外部包
import 'package:http/http.dart' as http;

// 导入部分内容
import 'package:my_package/utils.dart' show calculate;

// 导入并隐藏
import 'package:my_package/utils.dart' hide debugPrint;

// 延迟加载
import 'package:greetings/hello.dart' deferred as hello;

void main() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

## 11. 文件与IO操作

```dart
import 'dart:io';

void main() async {
  // 读取文件
  var file = File('test.txt');
  var contents = await file.readAsString();
  print(contents);
  
  // 写入文件
  await file.writeAsString('Hello Dart!');
  
  // 目录操作
  var dir = Directory('docs');
  await dir.create();
  
  // 列出目录内容
  var list = dir.list();
  await for (var entity in list) {
    print(entity.path);
  }
}
```

## 12. 测试

Dart 内置测试支持：

```dart
import 'package:test/test.dart';

int add(int a, int b) => a + b;

void main() {
  test('add function test', () {
    expect(add(2, 3), equals(5));
    expect(add(-1, 1), equals(0));
  });
  
  group('String operations', () {
    test('string split', () {
      var str = 'a,b,c';
      expect(str.split(','), equals(['a', 'b', 'c']));
    });
    
    test('string trim', () {
      var str = '  dart  ';
      expect(str.trim(), equals('dart'));
    });
  });
}
```

## 13. 与Flutter结合

Dart 是 Flutter 的主要编程语言：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Flutter Demo')),
        body: Center(
          child: Text('Hello Flutter!'),
        ),
      ),
    );
  }
}
```

## 14. 最佳实践

1. **遵循Dart风格指南**：使用dart format工具保持代码风格一致
2. **使用空安全**：始终启用空安全特性
3. **优先使用final和const**：提高代码可读性和性能
4. **合理使用async/await**：避免嵌套过深的回调
5. **编写文档注释**：使用///为公共API添加文档
6. **单元测试**：为关键功能编写测试
7. **使用强类型**：避免过度使用dynamic类型

## 15. 学习资源

1. [Dart官方文档](https://dart.dev/guides)
2. [Dart API参考](https://api.dart.dev/)
3. [Dart Pad在线编辑器](https://dartpad.dev/)
4. [Flutter文档](https://flutter.dev/docs)
5. [Dart语言规范](https://dart.dev/guides/language/spec)

通过掌握这些Dart核心概念，您将能够高效地开发跨平台应用程序，特别是使用Flutter框架构建移动应用。