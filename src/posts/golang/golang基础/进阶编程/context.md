# Context

## 1. Context概述

Context（上下文）是Go语言中一个非常重要的概念，主要用于在goroutine之间传递请求范围的数据、取消信号和截止时间。它提供了一种标准化的方式来控制并发操作的生命周期。

### 1.1 Context的作用

- **取消传播**：允许一个操作（如HTTP请求）的取消信号传播到所有相关的goroutine
- **超时控制**：可以设置操作的超时时间
- **值传递**：在调用链中安全地传递请求范围的值
- **截止时间**：可以设置操作的绝对截止时间

### 1.2 Context包的位置

Context定义在标准库的`context`包中：
```go
import "context"
```

## 2. Context接口

Context的核心是一个接口：

```go
type Context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key interface{}) interface{}
}
```

### 2.1 接口方法详解

1. **Deadline()**：
   - 返回Context的截止时间
   - 如果没有设置截止时间，`ok`返回`false`

2. **Done()**：
   - 返回一个只读channel，当Context被取消或超时时会关闭
   - 如果Context永远不会取消，返回nil

3. **Err()**：
   - 返回Context被取消的原因
   - 如果Context还未被取消，返回nil

4. **Value(key)**：
   - 获取与key关联的值
   - 如果没有与key关联的值，返回nil

## 3. Context的创建与派生

### 3.1 基础Context

- **context.Background()**：
  - 返回一个空的Context
  - 通常用作根Context

- **context.TODO()**：
  - 也是一个空Context
  - 当不确定使用哪个Context时使用（通常用于重构）

### 3.2 派生Context

可以从现有Context派生出新的Context：

1. **WithCancel**：
   ```go
   func WithCancel(parent Context) (ctx Context, cancel CancelFunc)
   ```
   - 创建一个可取消的Context
   - 调用返回的`cancel`函数会取消该Context及其子Context

2. **WithDeadline**：
   ```go
   func WithDeadline(parent Context, d time.Time) (Context, CancelFunc)
   ```
   - 创建一个有截止时间的Context
   - 当到达截止时间时自动取消

3. **WithTimeout**：
   ```go
   func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)
   ```
   - 创建一个有超时时间的Context
   - 实际上是WithDeadline的便捷包装

4. **WithValue**：
   ```go
   func WithValue(parent Context, key, val interface{}) Context
   ```
   - 创建一个携带键值对的Context
   - 用于在调用链中传递请求范围的值

## 4. Context的使用模式

### 4.1 取消传播

```go
func operation(ctx context.Context) {
    select {
    case <-time.After(500 * time.Millisecond):
        fmt.Println("operation completed")
    case <-ctx.Done():
        fmt.Println("operation canceled:", ctx.Err())
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    go operation(ctx)
    
    time.Sleep(200 * time.Millisecond)
    cancel() // 取消操作
    time.Sleep(200 * time.Millisecond)
}
```

### 4.2 超时控制

```go
func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()
    
    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Println("work completed")
    case <-ctx.Done():
        fmt.Println("work canceled:", ctx.Err()) // 会输出"context deadline exceeded"
    }
}
```

### 4.3 值传递

```go
func main() {
    ctx := context.WithValue(context.Background(), "userID", 123)
    
    // 在函数调用链中获取值
    userID := ctx.Value("userID").(int)
    fmt.Println("User ID:", userID)
}
```

## 5. Context的最佳实践

1. **传递Context**：
   - 函数应接受Context作为第一个参数，通常命名为`ctx`
   - 不要将Context存储在结构体中，应显式传递

2. **取消与清理**：
   - 使用`defer cancel()`确保及时释放资源
   - 即使操作完成也应调用cancel

3. **值的使用**：
   - 仅用于传递请求范围的数据
   - 不要使用Context传递函数的可选参数
   - 键应定义为自己的类型，避免冲突

4. **错误处理**：
   - 总是检查`ctx.Done()`和`ctx.Err()`
   - 在长时间运行的操作中定期检查Context状态

5. **HTTP服务**：
   - `http.Request`已经包含Context
   - 使用`req.Context()`获取

## 6. Context在标准库中的应用

许多标准库和第三方库都支持Context：

- **net/http**：`http.Request`包含Context
- **database/sql**：查询操作支持Context
- **os/exec**：命令执行支持Context
- **net**：网络操作支持Context

## 7. 常见陷阱与注意事项

1. **内存泄漏**：
   - 忘记调用cancel可能导致资源泄漏
   - 确保在所有路径上都调用cancel

2. **过度使用Value**：
   - Context不是数据存储，不要滥用Value传递数据
   - 可能导致代码难以理解和维护

3. **过早取消**：
   - 父Context取消会影响所有子Context
   - 设计时要考虑这种级联效应

4. **nil Context**：
   - 不要传递nil作为Context
   - 使用`context.Background()`或`context.TODO()`

## 8. 高级用法

### 8.1 自定义Context实现

可以实现自己的Context类型来满足特殊需求：

```go
type customCtx struct {
    context.Context
    customValue string
}

func (c *customCtx) Value(key interface{}) interface{} {
    if key == "custom" {
        return c.customValue
    }
    return c.Context.Value(key)
}

func main() {
    base := context.Background()
    ctx := &customCtx{Context: base, customValue: "special"}
    
    val := ctx.Value("custom").(string)
    fmt.Println(val) // 输出: special
}
```

### 8.2 Context与channel结合

```go
func worker(ctx context.Context, input <-chan int) {
    for {
        select {
        case data := <-input:
            fmt.Println("Processing:", data)
        case <-ctx.Done():
            fmt.Println("Worker exiting:", ctx.Err())
            return
        }
    }
}
```

## 9. 性能考虑

1. **Context是轻量级的**：
   - 创建和取消Context开销很小
   - 可以频繁创建和销毁

2. **Value查找**：
   - Value查找是线性的（从子到父Context）
   - 对于性能敏感的场景，避免深层嵌套的Value查找

3. **Done channel**：
   - 每次调用Done()返回相同的channel
   - 不会为每次调用创建新的channel

## 10. 总结

Go语言的Context提供了一种优雅的方式来管理goroutine的生命周期、传播取消信号和处理请求范围的值。正确使用Context可以：

- 避免goroutine泄漏
- 实现更好的超时和取消控制
- 安全地传递请求范围的数据
- 编写更健壮的并发代码

理解并熟练使用Context是成为高效Go开发者的关键技能之一。