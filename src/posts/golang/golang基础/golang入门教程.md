# Golang 入门教程

Go语言（Golang）是由Google开发的一种静态类型、编译型、并发性强的编程语言。它结合了静态编译语言的性能优势和动态语言的开发效率，特别适合构建高性能的网络服务、并发处理和云原生应用。本教程将带你快速入门Go语言的基础语法和核心特性。

## 1. 安装Go

首先需要安装Go开发环境：

1. 从官网下载适合你操作系统的安装包
2. 按照安装向导完成安装
3. 验证安装：在终端运行 `go version`，应该会显示安装的Go版本

Go的标准安装会包含`go`命令行工具，用于编译、运行和管理Go程序。

## 2. 第一个Go程序

创建一个名为`hello.go`的文件，写入以下内容：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界!") // 打印Hello World及中文
}
```

运行程序：

```bash
go run hello.go
```

或者编译后运行：

```bash
go build hello.go
./hello
```

## 3. 基本语法

### 3.1 变量和常量

Go是静态类型语言，变量需要显式声明类型或使用类型推断：

```go
var name string = "Alice" // 显式声明
age := 25                 // 类型推断，编译器自动推断为int

const Pi = 3.14159
```

### 3.2 数据类型

Go的基本数据类型：

- 整数：`int`, `int8`, `int16`, `int32`, `int64`, `uint`, `byte` (uint8), `rune` (int32)
- 浮点数：`float32`, `float64`
- 布尔：`bool`
- 字符串：`string`

复合类型：

- 数组：`var arr [5]int`
- 切片（动态数组）：`var slice []int = make([]int, 5, 10)`
- 映射（map）：`m := make(map[string]int)`
- 结构体：`type Person struct { Name string; Age int }`
- 指针：`var p *int`

### 3.3 控制结构

```go
// if-else
if x > 10 {
    // ...
} else if x > 5 {
    // ...
} else {
    // ...
}

// switch
switch day {
case "Monday":
    // ...
case "Tuesday":
    // ...
default:
    // ...
}

// for循环
for i := 0; i < 10; i++ {
    // ...
}

// 类似while的循环
sum := 1
for sum < 1000 {
    sum += sum
}

// 遍历数组/切片/map
for index, value := range []int{1, 2, 3} {
    // ...
}
```

### 3.4 函数

```go
func add(a int, b int) int {
    return a + b
}

// 多返回值
func swap(x, y string) (string, string) {
    return y, x
}

// 可变参数
func sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}
```

## 4. 高级特性

### 4.1 并发编程

Go的并发模型基于goroutine和channel：

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 3; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world") // 启动goroutine
    say("hello")    // 主goroutine
}
```

使用channel进行通信：

```go
func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
        sum += v
    }
    c <- sum // 发送sum到channel c
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}
    c := make(chan int)
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    x, y := <-c, <-c // 从c接收两个值

    fmt.Println(x, y, x+y)
}
```

### 4.2 接口

Go的接口是隐式的，任何实现了接口方法的类型都隐式满足该接口：

```go
type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

func printArea(s Shape) {
    fmt.Println(s.Area())
}

func main() {
    c := Circle{Radius: 5}
    printArea(c) // Circle实现了Shape接口
}
```

### 4.3 错误处理

Go使用多返回值处理错误：

```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}
```

## 5. 标准库

Go的标准库非常丰富，常用包包括：

- `fmt` - 格式化I/O
- `os` - 操作系统接口
- `io` - 输入输出
- `bytes` - 字节操作
- `strconv` - 字符串转换
- `time` - 时间操作
- `sync` - 同步原语
- `http` - HTTP服务端和客户端
- `encoding/json` - JSON编码解码

## 6. 构建和测试

构建可执行文件：

```bash
go build main.go
```

安装到`$GOPATH/bin`：

```bash
go install
```

运行测试：

```bash
go test
```

编写测试文件通常以`_test.go`结尾：

```go
package main

import "testing"

func TestAdd(t *testing.T) {
    if add(1, 2) != 3 {
        t.Error("Expected 1 + 2 to equal 3")
    }
}
```

## 7. 项目结构

典型的Go项目结构：

```markdown
myproject/
├── go.mod          # Go模块定义文件
├── main.go         # 程序入口
├── internal/       # 内部包
│   └── utils.go    # 内部工具函数
├── pkg/            # 公共库代码
│   └── math.go     # 公共数学函数
└── api/            # API定义等
```

## 8. 学习资源

1. 官方文档
2. Effective Go
3. Go标准库文档
4. Go Tour - 交互式学习Go语言
5. GitHub上的Go项目 - 学习优秀实践

## 9. 下一步

学习完基础后，可以尝试：

- 构建一个简单的HTTP API服务
- 实现并发下载器
- 学习Go的测试框架
- 探索Go的并发模式
- 阅读优秀的开源Go项目代码

Go语言以其简洁的语法和强大的并发支持，已经成为云原生时代的重要编程语言。通过实践和不断学习，你将能够利用Go构建高效、可靠的软件系统。