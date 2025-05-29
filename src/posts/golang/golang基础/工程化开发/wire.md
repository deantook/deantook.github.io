# Google Wire 依赖注入

## 什么是依赖注入

依赖注入(Dependency Injection, DI)是一种设计模式，它将对象的创建和依赖关系的管理从对象内部转移到外部容器中。主要优点包括：

- **解耦**：组件不直接创建依赖项
- **可测试性**：容易替换模拟对象进行测试
- **可维护性**：依赖关系清晰可见
- **灵活性**：配置变更不需要修改代码

## Wire 简介

Google Wire 是一个 Go 语言的编译时依赖注入框架，特点包括：

- **编译时代码生成**：不是基于反射的运行时注入
- **类型安全**：所有依赖关系在编译时检查
- **无运行时开销**：生成的代码就是普通 Go 代码
- **显式依赖**：所有依赖关系都明确声明

与其他 DI 框架相比，Wire 更轻量、更符合 Go 的哲学。

## 安装与设置

### 安装 Wire

```bash
go install github.com/google/wire/cmd/wire@latest
```

### 项目初始化

1. 确保项目使用 Go Modules
2. 添加 Wire 依赖：

```bash
go get github.com/google/wire
```

## 基础用法

### 基本概念

- **Provider**: 提供特定类型实例的函数
- **Injector**: Wire 生成的函数，按依赖关系调用 Providers

### 示例项目结构

```
myapp/
├── cmd/
│   └── main.go
├── internal/
│   └── app/
│       ├── app.go
│       ├── wire.go      # 包含 injector 定义
│       └── wire_gen.go  # Wire 生成的代码
└── go.mod
```

### 简单示例

1. 定义 Providers (`app/app.go`):

```go
package app

import "log"

type Config struct {
	Message string
}

type App struct {
	config *Config
	logger *log.Logger
}

func NewConfig() *Config {
	return &Config{Message: "Hello, Wire!"}
}

func NewLogger() *log.Logger {
	return log.Default()
}

func NewApp(config *Config, logger *log.Logger) *App {
	return &App{config: config, logger: logger}
}

func (a *App) Run() {
	a.logger.Println(a.config.Message)
}
```

2. 定义 Injector (`app/wire.go`):

```go
// +build wireinject

package app

import (
	"github.com/google/wire"
)

func InitializeApp() *App {
	wire.Build(NewConfig, NewLogger, NewApp)
	return &App{}
}
```

3. 生成代码:

```bash
wire ./internal/app
```

4. 使用生成的代码 (`cmd/main.go`):

```go
package main

import (
	"myapp/internal/app"
)

func main() {
	app := app.InitializeApp()
	app.Run()
}
```

## Provider Sets

Provider Set 是一组相关的 Providers，可以一起使用。

### 定义 Provider Set

```go
var AppSet = wire.NewSet(
	NewConfig,
	NewLogger,
	NewApp,
)
```

### 使用 Provider Set

```go
func InitializeApp() *App {
	wire.Build(AppSet)
	return &App{}
}
```

### 嵌套 Provider Sets

```go
var ConfigSet = wire.NewSet(NewConfig)
var LoggerSet = wire.NewSet(NewLogger)

var AppSet = wire.NewSet(
	ConfigSet,
	LoggerSet,
	NewApp,
)
```

## 绑定接口

Wire 可以通过 `wire.Bind` 将接口绑定到具体实现。

### 示例

1. 定义接口和实现 (`app/logger.go`):

```go
package app

type Logger interface {
	Println(v ...interface{})
}

type FileLogger struct{}

func (l *FileLogger) Println(v ...interface{}) {
	// 实现文件日志
}

func NewFileLogger() *FileLogger {
	return &FileLogger{}
}
```

2. 绑定接口 (`app/wire.go`):

```go
var AppSet = wire.NewSet(
	NewConfig,
	NewFileLogger,
	wire.Bind(new(Logger), new(*FileLogger)),
	NewApp,
)

func NewApp(config *Config, logger Logger) *App {
	return &App{config: config, logger: logger}
}
```

## 结构体 Providers

Wire 可以自动填充结构体字段，减少样板代码。

### 示例

```go
type App struct {
	Config *Config
	Logger Logger
}

var AppSet = wire.NewSet(
	NewConfig,
	NewFileLogger,
	wire.Bind(new(Logger), new(*FileLogger)),
	wire.Struct(new(App), "*"), // * 表示所有字段
)

func InitializeApp() *App {
	wire.Build(AppSet)
	return &App{}
}
```

## 清理函数

某些资源需要清理，Wire 支持返回清理函数的 Providers。

### 示例

```go
func NewFileLogger() (*FileLogger, func(), error) {
	logger := &FileLogger{}
	cleanup := func() {
		// 清理资源
	}
	return logger, cleanup, nil
}

func InitializeApp() (*App, func(), error) {
	wire.Build(AppSet)
	return &App{}, nil, nil
}
```

## 高级特性

### 值绑定

绑定具体值而不是 Provider 函数：

```go
var AppSet = wire.NewSet(
	wire.Value(&Config{Message: "Hello"}),
	NewLogger,
	NewApp,
)
```

### 接口字段绑定

绑定结构体中的特定接口字段：

```go
type App struct {
	Logger Logger `wire:"-"`
}
```

### Provider 选项

```go
var AppSet = wire.NewSet(
	NewConfig,
	wire.Bind(new(Logger), new(*FileLogger)),
	wire.Struct(new(App), "*"),
	wire.FieldsOf(new(Config), "Message"), // 使用 Config 的 Message 字段
)
```

## 最佳实践

1. **分层组织代码**：按功能或层级组织 Provider Sets
2. **最小化 Injector**：Injector 只应包含 wire.Build 调用
3. **明确依赖**：避免隐式依赖
4. **合理使用接口**：在需要灵活性的地方使用接口
5. **测试注入器**：测试生成的代码
6. **文档化 Provider Sets**：为复杂的 Provider Sets 添加注释

## 常见问题

### 1. Wire 生成代码失败

- 确保文件有 `// +build wireinject` 构建标签
- 检查所有依赖的 Provider 都已定义
- 确保没有循环依赖

### 2. 如何处理环境特定配置

```go
func NewConfig(env string) (*Config, error) {
	switch env {
	case "prod":
		return &Config{Message: "Production"}, nil
	default:
		return &Config{Message: "Development"}, nil
	}
}

func InitializeApp(env string) (*App, error) {
	wire.Build(NewConfig, NewLogger, NewApp)
	return &App{}, nil
}
```

### 3. 如何调试依赖问题

使用 `wire` 命令的 `-verbose` 标志：

```bash
wire -verbose ./internal/app
```

### 4. 如何处理第三方库的类型

为第三方类型创建 Provider：

```go
func NewDB() (*sql.DB, error) {
	return sql.Open("mysql", "user:password@/dbname")
}

var DBSet = wire.NewSet(NewDB)
```

## 总结

Google Wire 是一个强大而轻量级的依赖注入框架，特别适合 Go 语言项目。通过本教程，你应该已经掌握了：

1. Wire 的基本概念和工作原理
2. 如何设置和使用 Wire
3. 各种高级功能如 Provider Sets、接口绑定等
4. 最佳实践和常见问题解决方法

Wire 可以帮助你构建更清晰、更可测试的 Go 应用程序架构。随着项目规模的增长，良好的依赖管理会带来显著的维护优势。