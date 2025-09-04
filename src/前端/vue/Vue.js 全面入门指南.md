# Vue.js 全面入门指南

## 1. Vue.js 简介

Vue.js 是一套用于构建用户界面的渐进式 JavaScript 框架。与其他大型框架不同，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，易于上手，便于与第三方库或既有项目整合。

### 1.1 Vue 的特点
- **渐进式框架**：可以根据需求逐步采用
- **虚拟 DOM**：高效的 DOM 操作
- **响应式数据绑定**：数据变化自动更新视图
- **组件化**：可复用的组件结构
- **轻量级**：核心库只有 20KB 左右
- **丰富的生态系统**：Vue Router, Vuex, Vue CLI 等

## 2. 快速开始

### 2.1 直接引入 CDN
最简单的使用方式是直接在 HTML 文件中引入 Vue 的 CDN：

```html
<!DOCTYPE html>
<html>
<head>
  <title>My First Vue App</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    {{ message }}
  </div>

  <script>
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })
  </script>
</body>
</html>
```

### 2.2 使用 Vue CLI (推荐)
对于大型项目，推荐使用 Vue CLI 脚手架工具：

```bash
# 安装 Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-project

# 进入项目目录并运行
cd my-project
npm run serve
```

## 3. Vue 核心概念

### 3.1 实例与模板语法

```javascript
new Vue({
  el: '#app', // 挂载点
  data: {    // 数据
    message: 'Hello Vue!',
    count: 0
  },
  methods: { // 方法
    increment() {
      this.count++
    }
  },
  template: ` // 模板
    <div>
      <p>{{ message }}</p>
      <button @click="increment">Count: {{ count }}</button>
    </div>
  `
})
```

### 3.2 指令系统

Vue 提供了一系列内置指令：

- **v-bind**：动态绑定属性，简写 `:`
  ```html
  <img :src="imageSrc">
  ```

- **v-model**：双向数据绑定
  ```html
  <input v-model="message">
  ```

- **v-for**：列表渲染
  ```html
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
  ```

- **v-if/v-else/v-show**：条件渲染
  ```html
  <div v-if="seen">Now you see me</div>
  <div v-else>Now you don't</div>
  ```

- **v-on**：事件监听，简写 `@`
  ```html
  <button @click="doSomething">Click me</button>
  ```

### 3.3 计算属性和侦听器

```javascript
new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: {
      // 计算属性 getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // 计算属性 setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  watch: {
    // 侦听 firstName 的变化
    firstName: function (val, oldVal) {
      console.log('firstName changed from ' + oldVal + ' to ' + val)
    }
  }
})
```

### 3.4 组件系统

组件是 Vue 的核心概念之一，允许我们将 UI 拆分为独立可复用的代码片段。

```javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button @click="count++">You clicked me {{ count }} times.</button>'
})

// 使用组件
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

## 4. 组件深入

### 4.1 Props 和 Events

```javascript
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

// 父组件中使用
<blog-post title="My journey with Vue"></blog-post>
```

### 4.2 插槽 (Slots)

```html
<!-- 子组件 -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<!-- 父组件中使用 -->
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 4.3 动态组件

```html
<component :is="currentTabComponent"></component>
```

## 5. Vue Router

Vue Router 是 Vue.js 的官方路由管理器。

### 5.1 基本使用

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')
```

### 5.2 路由视图和导航

```html
<!-- App.vue -->
<div id="app">
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  
  <router-view></router-view>
</div>
```

### 5.3 路由参数

```javascript
const routes = [
  { path: '/user/:id', component: User }
]

// 组件中访问参数
this.$route.params.id
```

## 6. 状态管理 (Vuex)

Vuex 是 Vue 的集中式状态管理库。

### 6.1 基本概念

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
})
```

### 6.2 在组件中使用

```javascript
// 访问状态
this.$store.state.count

// 提交 mutation
this.$store.commit('increment')

// 分发 action
this.$store.dispatch('incrementAsync')

// 使用 getter
this.$store.getters.doubleCount
```

## 7. 生命周期钩子

Vue 实例有一系列生命周期钩子函数：

```javascript
new Vue({
  data: {
    message: 'Hello'
  },
  beforeCreate() {
    // 实例初始化之后，数据观测和事件配置之前
  },
  created() {
    // 实例创建完成后调用，已完成数据观测
  },
  beforeMount() {
    // 挂载开始之前被调用
  },
  mounted() {
    // 实例挂载到 DOM 后调用
  },
  beforeUpdate() {
    // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前
  },
  updated() {
    // 数据更改导致虚拟 DOM 重新渲染和打补丁后调用
  },
  beforeDestroy() {
    // 实例销毁之前调用
  },
  destroyed() {
    // 实例销毁后调用
  }
})
```

## 8. 高级特性

### 8.1 Mixins

```javascript
const myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin!')
    }
  }
}

new Vue({
  mixins: [myMixin],
  created() {
    console.log('hello from component!')
  }
})
// 输出:
// hello from mixin!
// hello from component!
```

### 8.2 自定义指令

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时...
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 使用
<input v-focus>
```

### 8.3 插件开发

```javascript
const MyPlugin = {
  install(Vue, options) {
    // 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }

    // 添加全局指令
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })

    // 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
    }
  }
}

Vue.use(MyPlugin)
```

## 9. Vue 3 新特性

Vue 3 是 Vue.js 的最新主要版本，带来了许多改进：

### 9.1 Composition API

```javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    function increment() {
      count.value++
    }
    
    onMounted(() => {
      console.log('Component is mounted!')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
```

### 9.2 Teleport

```html
<teleport to="body">
  <div class="modal">
    I'm a teleported modal!
  </div>
</teleport>
```

### 9.3 Fragments

```html
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

## 10. 最佳实践

1. **组件命名**：使用多单词命名避免与 HTML 元素冲突
2. **Prop 定义**：尽量详细定义 prop，包括类型和验证
3. **Key 属性**：在 v-for 中总是使用 key
4. **避免 v-if 和 v-for 一起使用**
5. **样式作用域**：对于组件样式使用 scoped 特性
6. **私有属性**：使用 $_ 前缀表示私有属性/方法
7. **文件结构**：按功能或路由组织组件

## 11. 学习资源

- 官方文档: https://vuejs.org/
- Vue Router: https://router.vuejs.org/
- Vuex: https://vuex.vuejs.org/
- Vue CLI: https://cli.vuejs.org/
- Vue School: https://vueschool.io/
- Vue Mastery: https://www.vuemastery.com/

通过本指南，您应该已经掌握了 Vue.js 的核心概念和基本用法。Vue 的学习曲线相对平缓，但要精通仍需不断实践和探索。建议从简单项目开始，逐步深入复杂的应用场景。