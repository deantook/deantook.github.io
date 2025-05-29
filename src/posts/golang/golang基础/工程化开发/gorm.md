# GORM 全面教程

## GORM 简介

GORM 是 Go 语言的一个优秀的 ORM (Object-Relational Mapping) 库，支持多种数据库(MySQL, PostgreSQL, SQLite, SQL Server 等)。它提供了丰富的功能，包括：

- 全功能 ORM
- 关联 (Has One, Has Many, Belongs To, Many To Many, 多态)
- 钩子 (Before/After Create/Save/Update/Delete/Find)
- 预加载
- 事务
- 复合主键
- SQL 构建器
- 自动迁移
- 日志
- 可扩展性

## 安装与配置

### 安装

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite  # 根据你的数据库选择对应的驱动
```

### 基本配置

```go
import (
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
)

func main() {
  // 连接数据库
  db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }
  
  // 获取通用数据库对象 sql.DB
  sqlDB, err := db.DB()
  
  // 设置连接池
  sqlDB.SetMaxIdleConns(10)       // 最大空闲连接数
  sqlDB.SetMaxOpenConns(100)      // 最大连接数
  sqlDB.SetConnMaxLifetime(time.Hour) // 连接最大存活时间
}
```

### 支持的数据库驱动

- MySQL: `gorm.io/driver/mysql`
- PostgreSQL: `gorm.io/driver/postgres`
- SQLite: `gorm.io/driver/sqlite`
- SQL Server: `gorm.io/driver/sqlserver`
- Clickhouse: `gorm.io/driver/clickhouse`

## 模型定义

### 基本模型

```go
type User struct {
  gorm.Model
  Name string
  Age  int
}
```

`gorm.Model` 包含以下字段：
```go
type Model struct {
  ID        uint `gorm:"primarykey"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt gorm.DeletedAt `gorm:"index"`
}
```

### 自定义表名

```go
func (User) TableName() string {
  return "profiles"
}
```

或者使用 `Table` 方法：

```go
db.Table("profiles").Create(&user)
```

### 字段标签

```go
type User struct {
  Name string `gorm:"type:varchar(100);uniqueIndex"`
  Age  int    `gorm:"default:18"`
  CreditCard CreditCard `gorm:"foreignKey:UserID"`
}
```

常用标签：
- `primaryKey`: 主键
- `unique`: 唯一索引
- `index`: 普通索引
- `uniqueIndex`: 唯一复合索引
- `not null`: 非空
- `default:value`: 默认值
- `type:sql_type`: 字段类型
- `size:length`: 字段长度
- `column:column_name`: 列名
- `foreignKey`: 外键
- `references`: 引用字段
- `constraint`: 约束

## CRUD 操作

### 创建记录

```go
// 创建单条记录
user := User{Name: "Jinzhu", Age: 18}
result := db.Create(&user)

// 批量插入
users := []User{{Name: "Jinzhu"}, {Name: "Jackson"}}
db.Create(&users)

// 使用选定字段创建
db.Select("Name", "Age").Create(&user)

// 忽略某些字段创建
db.Omit("Age").Create(&user)
```

### 查询记录

```go
// 获取第一条记录
var user User
db.First(&user)

// 获取最后一条记录
db.Last(&user)

// 获取所有记录
var users []User
db.Find(&users)

// 条件查询
db.Where("name = ?", "jinzhu").First(&user)
db.Where("name LIKE ?", "%jin%").Find(&users)

// 主键查询
db.First(&user, 10)  // 查找主键为10的记录
db.Find(&users, []int{1,2,3}) // 查找主键在1,2,3中的记录
```

### 更新记录

```go
// 更新单列
db.Model(&user).Update("name", "hello")

// 更新多列
db.Model(&user).Updates(User{Name: "hello", Age: 18})

// 更新选定字段
db.Model(&user).Select("name").Updates(map[string]interface{}{"name": "hello", "age": 18})

// 批量更新
db.Model(User{}).Where("age > ?", 10).Updates(User{Age: 18})

// 使用SQL表达式更新
db.Model(&user).Update("age", gorm.Expr("age * ? + ?", 2, 100))
```

### 删除记录

```go
// 删除单条记录
db.Delete(&user)

// 按主键删除
db.Delete(&User{}, 10)

// 批量删除
db.Where("name LIKE ?", "%jin%").Delete(&User{})

// 软删除（如果模型有DeletedAt字段）
db.Delete(&user)

// 永久删除
db.Unscoped().Delete(&user)
```

## 查询

### 条件查询

```go
// 基本条件
db.Where("name = ?", "jinzhu").First(&user)

// 多个条件
db.Where("name = ? AND age >= ?", "jinzhu", 18).Find(&users)

// 结构体条件
db.Where(&User{Name: "jinzhu", Age: 20}).First(&user)

// Map条件
db.Where(map[string]interface{}{"name": "jinzhu", "age": 20}).Find(&users)

// 主键切片
db.Where([]int64{1,2,3}).Find(&users)

// 内联条件
db.Find(&user, "name = ?", "jinzhu")
```

### 高级查询

```go
// 选择特定字段
db.Select("name", "age").Find(&users)

// 排序
db.Order("age desc, name").Find(&users)

// 限制和偏移
db.Limit(10).Offset(5).Find(&users)

// 分组和Having
db.Model(&User{}).Select("name, sum(age) as total").Group("name").Having("name = ?", "jinzhu").Find(&result)

// 连接查询
db.Model(&User{}).Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&result)

// 子查询
subQuery := db.Select("AVG(age)").Where("name LIKE ?", "%jin%").Table("users")
db.Select("AVG(age) as avgage").Group("name").Having("AVG(age) > (?)", subQuery).Find(&result)
```

### 原生SQL

```go
// 原生SQL查询
db.Raw("SELECT id, name, age FROM users WHERE name = ?", "jinzhu").Scan(&user)

// 原生SQL执行
db.Exec("DROP TABLE users")
```

### 链式操作

GORM 支持链式调用：

```go
tx := db.Where("name = ?", "jinzhu")

if someCondition {
  tx = tx.Where("age = ?", 20)
} else {
  tx = tx.Where("age = ?", 30)
}

if yetAnotherCondition {
  tx = tx.Order("created_at desc")
}

tx.Find(&users)
```

## 关联

### 一对一

```go
type User struct {
  gorm.Model
  Name       string
  CreditCard CreditCard
}

type CreditCard struct {
  gorm.Model
  Number string
  UserID uint
}

// 查询关联
var user User
db.Preload("CreditCard").First(&user, 1)

// 创建关联
user := User{
  Name: "jinzhu",
  CreditCard: CreditCard{Number: "411111111111"},
}
db.Create(&user)
```

### 一对多

```go
type User struct {
  gorm.Model
  Name      string
  Languages []Language `gorm:"many2many:user_languages;"`
}

type Language struct {
  gorm.Model
  Name string
}

// 查询关联
var user User
db.Preload("Languages").First(&user, 1)

// 创建关联
languages := []Language{
  {Name: "ZH"},
  {Name: "EN"},
}

user := User{
  Name:      "jinzhu",
  Languages: languages,
}
db.Create(&user)

// 添加关联
db.Model(&user).Association("Languages").Append(&Language{Name: "DE"})

// 删除关联
db.Model(&user).Association("Languages").Delete(&Language{Name: "DE"})

// 替换关联
db.Model(&user).Association("Languages").Replace([]Language{{Name: "FR"}, {Name: "JP"}})

// 清空关联
db.Model(&user).Association("Languages").Clear()

// 计数
db.Model(&user).Association("Languages").Count()
```

### 多对多

```go
type User struct {
  gorm.Model
  Name      string
  Languages []Language `gorm:"many2many:user_languages;"`
}

type Language struct {
  gorm.Model
  Name string
}

// 查询关联
var user User
db.Preload("Languages").First(&user, 1)

// 创建关联
languages := []Language{
  {Name: "ZH"},
  {Name: "EN"},
}

user := User{
  Name:      "jinzhu",
  Languages: languages,
}
db.Create(&user)

// 添加关联
db.Model(&user).Association("Languages").Append(&Language{Name: "DE"})

// 删除关联
db.Model(&user).Association("Languages").Delete(&Language{Name: "DE"})

// 替换关联
db.Model(&user).Association("Languages").Replace([]Language{{Name: "FR"}, {Name: "JP"}})

// 清空关联
db.Model(&user).Association("Languages").Clear()

// 计数
db.Model(&user).Association("Languages").Count()
```

### 预加载

```go
// 预加载单个关联
db.Preload("CreditCard").Find(&users)

// 预加载多个关联
db.Preload("CreditCard").Preload("Orders").Find(&users)

// 嵌套预加载
db.Preload("Orders.OrderItems").Find(&users)

// 带条件的预加载
db.Preload("Orders", "state NOT IN (?)", "cancelled").Find(&users)

// 自定义预加载SQL
db.Preload("Orders", func(db *gorm.DB) *gorm.DB {
  return db.Order("orders.amount DESC")
}).Find(&users)
```

## 事务

### 自动事务

```go
if err := db.Transaction(func(tx *gorm.DB) error {
  if err := tx.Create(&user1).Error; err != nil {
    return err
  }
  
  if err := tx.Create(&user2).Error; err != nil {
    return err
  }
  
  return nil
}); err != nil {
  // 处理错误
}
```

### 手动事务

```go
// 开始事务
tx := db.Begin()

// 在事务中执行一些数据库操作
if err := tx.Create(&user1).Error; err != nil {
  // 回滚事务
  tx.Rollback()
  return
}

if err := tx.Create(&user2).Error; err != nil {
  // 回滚事务
  tx.Rollback()
  return
}

// 提交事务
tx.Commit()
```

### 嵌套事务

```go
db.Transaction(func(tx *gorm.DB) error {
  tx.Create(&user1)
  
  tx.Transaction(func(tx2 *gorm.DB) error {
    tx2.Create(&user2)
    return nil
  })
  
  return nil
})
```

### 保存点

```go
tx := db.Begin()
tx.Create(&user1)

tx.SavePoint("sp1")
if err := tx.Create(&user2).Error; err != nil {
  tx.RollbackTo("sp1")
  tx.Create(&user3)
}

tx.Commit()
```

## 钩子

GORM 提供了以下钩子方法：

- BeforeSave
- BeforeCreate
- AfterSave
- AfterCreate
- BeforeUpdate
- AfterUpdate
- BeforeDelete
- AfterDelete
- AfterFind

### 示例

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
  u.UUID = uuid.New()
  
  if u.Name == "admin" {
    return errors.New("invalid name")
  }
  return
}

func (u *User) AfterCreate(tx *gorm.DB) (err error) {
  if u.ID == 1 {
    tx.Model(u).Update("role", "admin")
  }
  return
}
```

## 性能优化

### 批量操作

```go
// 批量插入
var users = []User{{Name: "jinzhu1"}, {Name: "jinzhu2"}, {Name: "jinzhu3"}}
db.Create(&users)

// 批量更新
db.Model(User{}).Where("role = ?", "admin").Updates(User{Name: "hello"})

// 批量删除
db.Where("email LIKE ?", "%jinzhu%").Delete(Email{})
```

### 禁用钩子

```go
db.Session(&gorm.Session{SkipHooks: true}).Create(&user)
```

### 禁用默认事务

```go
db.Session(&gorm.Session{SkipDefaultTransaction: true}).Create(&user)
```

### 预编译SQL

```go
stmt := db.Session(&gorm.Session{DryRun: true}).Find(&users, []int{1,2,3}).Statement
sql := db.Dialector.Explain(stmt.SQL.String(), stmt.Vars...)
```

### 连接池优化

```go
sqlDB, err := db.DB()
sqlDB.SetMaxIdleConns(10)
sqlDB.SetMaxOpenConns(100)
sqlDB.SetConnMaxLifetime(time.Hour)
```

## 迁移

### 自动迁移

```go
// 自动迁移模型
db.AutoMigrate(&User{}, &Product{}, &Order{})

// 添加表后缀
db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{})
```

### 手动迁移

```go
// 创建表
db.Migrator().CreateTable(&User{})

// 检查表是否存在
db.Migrator().HasTable(&User{})
db.Migrator().HasTable("users")

// 添加列
db.Migrator().AddColumn(&User{}, "Name")

// 修改列
db.Migrator().AlterColumn(&User{}, "Name")

// 删除列
db.Migrator().DropColumn(&User{}, "Name")

// 创建索引
db.Migrator().CreateIndex(&User{}, "Name")
db.Migrator().CreateIndex(&User{}, "idx_name") // 复合索引

// 删除索引
db.Migrator().DropIndex(&User{}, "Name")
db.Migrator().DropIndex(&User{}, "idx_name")

// 重命名表
db.Migrator().RenameTable(&User{}, &UserInfo{})
db.Migrator().RenameTable("users", "user_infos")
```

### 外键约束

```go
type User struct {
  gorm.Model
  CreditCards []CreditCard `gorm:"foreignKey:UserRefer"`
}

type CreditCard struct {
  gorm.Model
  Number    string
  UserRefer uint
}

db.SetupJoinTable(&User{}, "CreditCards", &CreditCard{})
```

## 高级特性

### 复合主键

```go
type Product struct {
  ID           string `gorm:"primaryKey"`
  LanguageCode string `gorm:"primaryKey"`
  Code         string
  Name         string
}

db.Create(&Product{ID: "1", LanguageCode: "en", Code: "A1", Name: "Apple"})
```

### 自定义数据类型

```go
import "database/sql/driver"

type JSON json.RawMessage

// 实现 sql.Scanner 接口
func (j *JSON) Scan(value interface{}) error {
  bytes, ok := value.([]byte)
  if !ok {
    return errors.New(fmt.Sprint("Failed to unmarshal JSON value:", value))
  }
  
  result := json.RawMessage{}
  err := json.Unmarshal(bytes, &result)
  *j = JSON(result)
  return err
}

// 实现 driver.Valuer 接口
func (j JSON) Value() (driver.Value, error) {
  if len(j) == 0 {
    return nil, nil
  }
  return json.RawMessage(j).MarshalJSON()
}

type User struct {
  gorm.Model
  Name string
  Attrs JSON `gorm:"type:json"`
}
```

### 上下文支持

```go
ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()

db.WithContext(ctx).Find(&users)
```

### 调试模式

```go
db.Debug().Where("name = ?", "jinzhu").First(&user)
```

### 自定义日志

```go
newLogger := logger.New(
  log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
  logger.Config{
    SlowThreshold: time.Second,   // 慢 SQL 阈值
    LogLevel:      logger.Info,   // 日志级别
    Colorful:      true,          // 彩色打印
  },
)

db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{
  Logger: newLogger,
})
```

### 插件

GORM 支持插件系统，可以扩展功能：

```go
import "gorm.io/plugin/dbresolver"

db.Use(dbresolver.Register(dbresolver.Config{
  // 写库配置
  Sources: []gorm.Dialector{mysql.Open("db1")},
  
  // 读库配置
  Replicas: []gorm.Dialector{mysql.Open("db2"), mysql.Open("db3")},
  
  // 策略
  Policy: dbresolver.RandomPolicy{},
}))
```

## 最佳实践

1. **模型设计**
   - 使用 `gorm.Model` 作为基础模型
   - 为字段添加适当的标签
   - 合理设计关联关系

2. **查询优化**
   - 使用 `Select` 只查询需要的字段
   - 合理使用 `Preload` 避免 N+1 查询
   - 批量操作代替循环单条操作

3. **错误处理**
   - 总是检查错误
   - 使用 `Error` 方法获取错误

4. **事务管理**
   - 对多个相关操作使用事务
   - 注意事务的隔离级别

5. **性能考虑**
   - 设置合理的连接池大小
   - 避免在循环中执行数据库操作
   - 考虑使用缓存

6. **安全**
   - 使用参数化查询防止 SQL 注入
   - 限制查询结果数量

7. **测试**
   - 使用 `DryRun` 模式测试 SQL
   - 考虑使用内存数据库进行单元测试

8. **日志**
   - 在生产环境设置适当的日志级别
   - 监控慢查询

## 总结

GORM 是一个功能强大且灵活的 Go ORM 库，支持多种数据库和高级特性。通过本教程，你应该已经掌握了 GORM 的核心概念和常用操作。要了解更多细节，建议查阅 [GORM 官方文档](https://gorm.io/)。