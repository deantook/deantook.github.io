# React 全面入门指南

## 1. React 简介

React 是由 Facebook 开发的一个用于构建用户界面的 JavaScript 库。它采用组件化模式，专注于构建高效、灵活的用户界面。

### 1.1 React 的特点
- **组件化开发**：将 UI 拆分为独立可复用的组件
- **虚拟 DOM**：高效的 DOM 操作机制
- **单向数据流**：数据自上而下流动，易于追踪
- **JSX 语法**：JavaScript 的语法扩展，方便编写 UI
- **跨平台能力**：支持 Web、移动端（React Native）、VR 等
- **丰富的生态系统**：React Router、Redux、Next.js 等

## 2. 快速开始

### 2.1 使用 CDN 引入
最简单的方式是直接在 HTML 中引入 React：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    
    <script type="text/babel">
      function App() {
        return <h1>Hello, React!</h1>;
      }
      
      ReactDOM.render(<App />, document.getElementById('root'));
    </script>
  </body>
</html>
```

### 2.2 使用 Create React App (推荐)
对于正式项目，推荐使用官方脚手架工具：

```bash
# 安装 Create React App
npx create-react-app my-app

# 进入项目目录并启动
cd my-app
npm start
```

## 3. React 核心概念

### 3.1 JSX 语法
JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码：

```jsx
const element = <h1>Hello, world!</h1>;
```

JSX 特性：
- 可以嵌入表达式：`{variable}`
- 可以指定属性：`<div className="container"></div>`
- 可以包含子元素
- 防止注入攻击（自动转义内容）

### 3.2 组件基础
React 组件分为函数组件和类组件：

#### 函数组件
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### 类组件
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 3.3 Props 和 State

#### Props（属性）
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 使用组件
<Welcome name="Sara" />
```

#### State（状态）
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

### 3.4 事件处理
React 事件采用驼峰命名法：

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

## 4. 组件深入

### 4.1 生命周期方法（类组件）
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

### 4.2 条件渲染
```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

### 4.3 列表 & Key
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

## 5. Hooks（React 16.8+）

Hooks 让函数组件也能使用状态和其他 React 特性。

### 5.1 useState
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 5.2 useEffect
```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // 仅在 count 更改时更新

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 5.3 自定义 Hook
```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading };
}

// 使用自定义 Hook
function MyComponent() {
  const { data, loading } = useFetch('https://api.example.com/data');
  
  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

## 6. 状态管理

### 6.1 Context API
```jsx
// 创建 Context
const ThemeContext = React.createContext('light');

// 提供者组件
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 消费者组件（类组件）
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button theme={this.context} />;
  }
}

// 消费者组件（函数组件）
function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {value => <button theme={value} />}
    </ThemeContext.Consumer>
  );
}
```

### 6.2 Redux（第三方库）
Redux 是一个可预测的状态容器。

#### 基本概念
```javascript
import { createStore } from 'redux';

// 1. 定义 reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// 2. 创建 store
let store = createStore(counter);

// 3. 订阅更新
store.subscribe(() => console.log(store.getState()));

// 4. 分发 action
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
```

#### 与 React 集成
```jsx
import { Provider, connect } from 'react-redux';

// 连接组件
const Counter = ({ count, increment, decrement }) => (
  <div>
    <p>{count}</p>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
);

const mapStateToProps = state => ({ count: state });
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' })
});

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

// 提供 store
ReactDOM.render(
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>,
  document.getElementById('root')
);
```

## 7. 路由管理

### 7.1 React Router
React Router 是 React 的官方路由解决方案。

#### 基本使用
```jsx
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
```

#### 动态路由
```jsx
<Route path="/users/:id" component={User} />

// 在 User 组件中获取参数
function User({ match }) {
  return <h2>User ID: {match.params.id}</h2>;
}
```

## 8. 样式方案

### 8.1 CSS Modules
```jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.error}>Error Button</button>;
}
```

### 8.2 styled-components
```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function StyledExample() {
  return (
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  );
}
```

## 9. 性能优化

### 9.1 React.memo
```jsx
const MyComponent = React.memo(function MyComponent(props) {
  // 仅在 props 变化时重新渲染
});
```

### 9.2 useMemo & useCallback
```jsx
function Parent({ a, b }) {
  // 仅在 a 变化时重新计算
  const memoizedValue = useMemo(() => computeExpensiveValue(a), [a]);
  
  // 仅在 b 变化时重新创建函数
  const memoizedCallback = useCallback(
    () => doSomething(b),
    [b],
  );

  return <Child onClick={memoizedCallback} value={memoizedValue} />;
}
```

### 9.3 虚拟化长列表
```jsx
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

function VirtualizedList() {
  return (
    <List
      height={150}
      itemCount={1000}
      itemSize={35}
      width={300}
    >
      {Row}
    </List>
  );
}
```

## 10. 测试

### 10.1 Jest + React Testing Library
```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('button click calls onClick handler', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 11. 最佳实践

1. **组件设计**：
    - 单一职责原则
    - 合理划分容器组件和展示组件
    - 使用 PropTypes 或 TypeScript 进行类型检查

2. **状态管理**：
    - 避免过度使用 Redux
    - 优先考虑本地状态和 Context API
    - 合理使用状态提升

3. **性能优化**：
    - 避免不必要的重新渲染
    - 使用代码分割（React.lazy + Suspense）
    - 合理使用 React.memo、useMemo 和 useCallback

4. **代码组织**：
    - 按功能或路由组织文件结构
    - 保持组件小而专注
    - 使用一致的命名约定

## 12. 学习资源

- 官方文档: https://reactjs.org/
- React Router: https://reactrouter.com/
- Redux: https://redux.js.org/
- Next.js: https://nextjs.org/
- React 中文文档: https://zh-hans.reactjs.org/
- React 社区资源: https://github.com/enaqx/awesome-react

通过本指南，您应该已经掌握了 React 的核心概念和基本用法。React 是一个强大而灵活的库，但要精通它需要不断实践和探索。建议从简单项目开始，逐步深入复杂的应用场景。