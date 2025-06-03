# slog 的最佳实践

`slog` 作为 Go 1.21+ 的结构化日志系统，正确使用可以显著提升日志的可观测性和系统可维护性。以下是使用 `slog` 的最佳实践：

## 1. 初始化配置

### 全局 logger 配置
```go
import (
    "log/slog"
    "os"
)

func init() {
    // 使用 JSON 格式，适合生产环境
    logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
        Level: slog.LevelInfo, // 设置日志级别
        AddSource: true,      // 添加源代码位置
    }))
    
    // 设置为全局 logger
    slog.SetDefault(logger)
}
```

### 环境区分
```go
func setupLogger(env string) *slog.Logger {
    switch env {
    case "development":
        return slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
            Level: slog.LevelDebug,
        }))
    default: // production
        return slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
            Level: slog.LevelInfo,
        }))
    }
}
```

## 2. 日志记录实践

### 结构化字段命名
```go
// 好的实践 - 使用小写蛇形命名法
slog.Info("user logged in", 
    "user_id", 123,
    "client_ip", "192.168.1.1",
    "http_method", "POST",
)

// 避免 - 不一致的命名
slog.Info("user logged in", 
    "userId", 123,       // 混合命名风格
    "ClientIP", "192...", // 首字母大写
)
```

### 错误记录
```go
err := doSomething()
if err != nil {
    slog.Error("operation failed",
        "error", err,          // 记录原始错误
        "operation", "update", // 上下文信息
        "retry_count", 3,
    )
    // 或者使用 LogAttrs 提高性能
    slog.LogAttrs(context.Background(), slog.LevelError, "operation failed",
        slog.String("error", err.Error()),
        slog.String("operation", "update"),
        slog.Int("retry_count", 3),
    )
}
```

## 3. 性能优化

### 使用 LogAttrs
```go
// 更高效的日志记录方式
slog.LogAttrs(context.Background(), slog.LevelInfo, "user action",
    slog.Int("user_id", 123),
    slog.String("action", "login"),
    slog.Time("event_time", time.Now()),
)
```

### 延迟计算
```go
expensiveValue := slog.Attr{
    Key: "metrics",
    Value: slog.AnyValue(func() any {
        return calculateExpensiveMetrics() // 只有当日志会被记录时才计算
    }),
}
```

## 4. 上下文管理

### 请求上下文
```go
func handleRequest(w http.ResponseWriter, r *http.Request) {
    // 为请求创建子 logger
    logger := slog.Default().With(
        "request_id", r.Header.Get("X-Request-ID"),
        "path", r.URL.Path,
    )
    
    // 在请求处理中使用
    logger.Info("request started")
    defer logger.Info("request completed")
}
```

### 协程安全
```go
// logger 是并发安全的，可以安全地在多个 goroutine 中使用
go func(l *slog.Logger) {
    l.Info("background task started")
}(logger)
```

## 5. 高级实践

### 自定义日志级别
```go
const LevelTrace = slog.Level(-8)

func main() {
    logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
        Level: LevelTrace, // 启用自定义级别
    }))
    
    logger.Log(context.Background(), LevelTrace, "trace message")
}
```

### 自定义处理器
```go
type CustomHandler struct {
    handler slog.Handler
    // 可以添加自定义字段
}

func (h *CustomHandler) Handle(ctx context.Context, r slog.Record) error {
    // 添加统一字段
    r.AddAttrs(slog.String("app_version", "1.0.0"))
    return h.handler.Handle(ctx, r)
}

func main() {
    baseHandler := slog.NewJSONHandler(os.Stdout, nil)
    logger := slog.New(&CustomHandler{handler: baseHandler})
    logger.Info("custom handler example")
}
```

## 6. 测试与验证

### 测试日志输出
```go
func TestLogging(t *testing.T) {
    var buf bytes.Buffer
    logger := slog.New(slog.NewJSONHandler(&buf, nil))
    
    logger.Info("test message", "key", "value")
    
    if !strings.Contains(buf.String(), `"key":"value"`) {
        t.Error("expected log output to contain key-value pair")
    }
}
```

## 7. 避免的常见错误

1. **过度日志记录**：避免记录过多低级别日志，会降低性能
2. **敏感信息泄露**：不要记录密码、令牌等敏感信息
3. **不一致的字段名**：保持字段命名风格一致
4. **忽略错误**：不要只记录错误消息而忽略原始错误对象
5. **阻塞操作**：避免在日志记录中执行可能阻塞的操作

通过遵循这些最佳实践，您可以充分利用 `slog` 的优势，构建可观测性强、性能优越的日志系统。