# Go语言(Golang)入门指南

## 1. Go语言简介

Go(又称Golang)是Google开发的一种静态强类型、编译型、并发型编程语言。它具有以下特点：
- 简洁的语法
- 高效的编译和执行速度
- 内置并发支持
- 强大的标准库
- 垃圾回收机制
- 跨平台支持

## 2. 安装Go环境

### 2.1 下载安装
访问https://golang.org/dl/下载适合你操作系统的安装包。

### 2.2 环境配置
安装完成后，需要设置以下环境变量：
- `GOROOT`: Go的安装路径
- `GOPATH`: 工作目录路径(Go 1.8+默认在用户目录下的go文件夹)
- 将`$GOROOT/bin`和`$GOPATH/bin`添加到`PATH`中

### 2.3 验证安装
打开终端/命令行，输入：
```bash
go version
```
如果显示Go的版本信息，说明安装成功。

## 3. 第一个Go程序

创建一个`hello.go`文件：
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

运行程序：
```bash
go run hello.go
```

编译为可执行文件：
```bash
go build hello.go
```

## 4. 基础语法

### 4.1 变量声明
```go
// 使用var关键字
var name string = "Go"
var age = 10  // 类型推断
var isCool = true

// 简短声明(只能在函数内使用)
count := 42
```

### 4.2 常量
```go
const Pi = 3.14
const (
    StatusOK = 200
    StatusNotFound = 404
)
```

### 4.3 基本数据类型
- 布尔型: `bool`
- 数字类型: `int`, `int8`, `int16`, `int32`, `int64`, `uint`, `uint8`, `uint16`, `uint32`, `uint64`, `float32`, `float64`, `complex64`, `complex128`
- 字符串: `string`

### 4.4 控制结构
```go
// if语句
if x > 10 {
    fmt.Println("x is greater than 10")
} else if x == 10 {
    fmt.Println("x is equal to 10")
} else {
    fmt.Println("x is less than 10")
}

// for循环
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// while循环(Go中没有while关键字)
j := 0
for j < 10 {
    fmt.Println(j)
    j++
}

// switch语句
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("OS X")
case "linux":
    fmt.Println("Linux")
default:
    fmt.Printf("%s\n", os)
}
```

## 5. 函数

```go
// 基本函数
func add(a int, b int) int {
    return a + b
}

// 多返回值
func swap(x, y string) (string, string) {
    return y, x
}

// 命名返回值
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
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

## 6. 结构体和接口

### 6.1 结构体
```go
type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Alice", Age: 25}
    fmt.Println(p.Name)
    
    // 指针
    ptr := &p
    fmt.Println(ptr.Age) // 自动解引用
}
```

### 6.2 方法
```go
func (p Person) greet() string {
    return "Hello, my name is " + p.Name
}

// 指针接收者
func (p *Person) birthday() {
    p.Age++
}
```

### 6.3 接口
```go
type Greeter interface {
    greet() string
}

func sayHello(g Greeter) {
    fmt.Println(g.greet())
}
```

## 7. 并发编程

### 7.1 Goroutine
```go
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world") // 启动goroutine
    say("hello")
}
```

### 7.2 Channel
```go
func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
        sum += v
    }
    c <- sum // 将sum发送到channel
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}
    
    c := make(chan int)
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    x, y := <-c, <-c // 从channel接收
    
    fmt.Println(x, y, x+y)
}
```

## 8. 错误处理

```go
func divide(a, b float64) (float64, error) {
    if b == 0.0 {
        return 0.0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10.0, 0.0)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(result)
}
```

## 9. 包管理

Go模块(Go 1.11+)：
```bash
# 初始化模块
go mod init example.com/myproject

# 添加依赖
go get github.com/gin-gonic/gin

# 整理依赖
go mod tidy
```

## 10. 常用标准库

- `fmt`: 格式化I/O
- `os`: 操作系统功能
- `io`: I/O原语
- `net/http`: HTTP客户端和服务器
- `encoding/json`: JSON编码解码
- `time`: 时间处理
- `sync`: 同步原语

## 11. 下一步学习建议

1. 阅读https://golang.org/doc/
2. 练习编写小型项目
3. 学习Go的并发模式
4. 探索Go的生态系统和流行框架
5. 参与开源Go项目

通过这篇指南，你应该已经掌握了Go语言的基础知识。Go语言以其简洁和高效著称，非常适合构建高性能的网络服务和分布式系统。继续实践和探索，你会越来越熟悉这门强大的语言！