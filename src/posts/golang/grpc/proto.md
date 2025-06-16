# Protocol Buffers (proto) 文件详解

Protocol Buffers (简称 protobuf) 是 Google 开发的一种语言中立、平台中立、可扩展的序列化结构化数据的方法。`.proto` 文件是定义数据结构和服务的接口定义语言(IDL)文件。

## 1. 基本结构

一个典型的 `.proto` 文件包含以下部分：

```protobuf
syntax = "proto3";  // 指定语法版本

package mypackage;  // 定义包名，用于防止命名冲突

option go_package = "github.com/example/mypackage";  // Go 特定的包路径

// 消息定义
message MyMessage {
  // 字段定义
}

// 服务定义
service MyService {
  // RPC 方法定义
}
```

## 2. 语法版本

- `proto2`: 旧版本，仍在使用但不再推荐
- `proto3`: 当前推荐版本，更简洁，支持更多语言

```protobuf
syntax = "proto3";  // 必须放在文件第一行
```

## 3. 消息类型 (Message)

消息是 protobuf 中的基本数据结构单元，类似于编程语言中的结构体或类。

### 基本消息定义

```protobuf
message Person {
  string name = 1;
  int32 id = 2;
  bool has_ponycopter = 3;
}
```

### 字段规则

- 字段格式：`[规则] 类型 字段名 = 字段编号;`
- proto3 默认规则是 singular (单数，0或1个)，不需要显式指定
- 其他规则：
  - `repeated`: 类似数组/列表
  - `oneof`: 类似联合体
  - `map`: 键值对

### 字段类型

| 类型 | 说明 | 对应 Go 类型 |
|------|------|-------------|
| double | 双精度浮点 | float64 |
| float | 单精度浮点 | float32 |
| int32 | 32位整数 | int32 |
| int64 | 64位整数 | int64 |
| uint32 | 无符号32位整数 | uint32 |
| uint64 | 无符号64位整数 | uint64 |
| sint32 | 有符号32位整数(更高效编码) | int32 |
| sint64 | 有符号64位整数(更高效编码) | int64 |
| fixed32 | 固定32位整数 | uint32 |
| fixed64 | 固定64位整数 | uint64 |
| sfixed32 | 固定32位有符号整数 | int32 |
| sfixed64 | 固定64位有符号整数 | int64 |
| bool | 布尔值 | bool |
| string | UTF-8字符串 | string |
| bytes | 任意字节序列 | []byte |

### 字段编号

- 每个字段必须有唯一的编号(1-2^29-1)
- 1-15占用1字节，16-2047占用2字节(常用字段用1-15)
- 19000-19999为协议内部保留

### 复杂消息示例

```protobuf
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
  enum Corpus {
    UNIVERSAL = 0;
    WEB = 1;
    IMAGES = 2;
    LOCAL = 3;
    NEWS = 4;
    PRODUCTS = 5;
    VIDEO = 6;
  }
  Corpus corpus = 4;
  repeated string snippets = 5;
  map<string, string> metadata = 6;
  oneof result_format {
    string plain_text = 7;
    string html = 8;
  }
}
```

## 4. 服务定义 (Service)

服务定义 RPC 接口，包含方法签名：

```protobuf
service RouteGuide {
  // 简单 RPC
  rpc GetFeature(Point) returns (Feature) {}
  
  // 服务器流式 RPC
  rpc ListFeatures(Rectangle) returns (stream Feature) {}
  
  // 客户端流式 RPC
  rpc RecordRoute(stream Point) returns (RouteSummary) {}
  
  // 双向流式 RPC
  rpc RouteChat(stream RouteNote) returns (stream RouteNote) {}
}
```

## 5. 导入其他 proto 文件

```protobuf
import "other_protos.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/timestamp.proto";
```

## 6. 选项 (Options)

可以添加各种选项来控制代码生成：

```protobuf
option java_package = "com.example.foo";  // Java 包名
option java_outer_classname = "Ponycopter";  // Java 外部类名
option go_package = "github.com/example/mypackage";  // Go 包路径
option optimize_for = SPEED;  // 优化选项: SPEED, CODE_SIZE, LITE_RUNTIME
```

## 7. 常用注释风格

```protobuf
// 单行注释

/*
多行注释
*/

message CommentMessage {
  // 字段注释
  string field = 1;
}
```

## 8. 枚举类型

```protobuf
enum EnumAllowingAlias {
  option allow_alias = true;
  UNKNOWN = 0;
  STARTED = 1;
  RUNNING = 1;  // 允许别名
}

enum EnumNotAllowingAlias {
  UNKNOWN = 0;
  STARTED = 1;
  // RUNNING = 1;  // 如果不设置 allow_alias，这会报错
}
```

## 9. 保留字段

防止未来使用已删除的字段编号或名称：

```protobuf
message Foo {
  reserved 2, 15, 9 to 11;
  reserved "foo", "bar";
  // string bar = 3;  // 这会报错，因为 bar 是保留名称
}
```

## 10. 嵌套类型

```protobuf
message SearchResponse {
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
  }
  repeated Result results = 1;
}

// 外部引用
message OtherMessage {
  SearchResponse.Result result = 1;
}
```

## 11. 默认值

proto3 中每个类型都有默认值：
- string: 空字符串
- bytes: 空字节数组
- bool: false
- 数值类型: 0
- 枚举: 第一个定义的枚举值(必须为0)
- 消息字段: 未设置，语言特定(Go 中是 nil)

## 12. JSON 映射

protobuf 3 支持与 JSON 的规范映射：
- message → JSON object
- 基本类型 → JSON 对应类型
- repeated → JSON array
- bool → true/false
- string → string
- bytes → base64 string
- 枚举 → enum name string
- Timestamp → RFC 3339 string
- Duration → string ending with "s"

## 13. 常用 WKT (Well-Known Types)

Google 提供了一些常用的预定义类型：

```protobuf
import "google/protobuf/any.proto";
import "google/protobuf/duration.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/struct.proto";
import "google/protobuf/timestamp.proto";
import "google/protobuf/wrappers.proto";
```

## 14. 最佳实践

1. 为所有消息和字段添加注释
2. 使用驼峰命名法(CamelCase)命名消息和枚举
3. 使用下划线命名法(snake_case)命名字段
4. 为未来扩展预留一些字段编号
5. 重要变更时考虑版本控制
6. 复杂业务逻辑考虑使用 Any 或 Struct 类型

## 15. 代码生成示例

```bash
# 生成 Go 代码
protoc --go_out=. --go_opt=paths=source_relative \
       --go-grpc_out=. --go-grpc_opt=paths=source_relative \
       your_service.proto

# 生成多种语言代码
protoc --go_out=. --java_out=./java --python_out=./python \
       --cpp_out=./cpp --csharp_out=./csharp \
       your_service.proto
```

通过 `.proto` 文件定义接口，可以生成多种语言的代码，实现跨语言的服务调用和数据交换，这是 gRPC 强大跨平台能力的基础。