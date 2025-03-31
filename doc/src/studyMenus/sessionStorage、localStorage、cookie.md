# SessionStorage、LocalStorage 和 Cookie

## Web 存储概述

Web 存储是现代浏览器提供的在客户端存储数据的机制，主要包括 sessionStorage、localStorage 和 Cookie。这些技术允许网站在用户浏览器中存储数据，但它们在使用方式、存储容量和生命周期等方面存在显著差异。

## SessionStorage

sessionStorage 是 HTML5 引入的存储机制，用于在会话期间存储数据。

### 特点

1. **生命周期**：数据仅在当前会话（窗口或标签页）中有效，关闭页面后数据会被清除
2. **存储容量**：通常为 5MB 左右（各浏览器实现不同）
3. **作用域**：仅限于当前窗口/标签页，不同窗口间数据不共享
4. **存储方式**：以键值对形式存储，值只能是字符串

### 基本用法
```js
sessionStorage.setItem('username', 'John');
console.log(sessionStorage.getItem('username')); // 输出: John
sessionStorage.removeItem('username');
sessionStorage.clear(); // 清空
```

## LocalStorage
### 基本用法
```js
localStorage.setItem('theme', 'dark');
console.log(localStorage.getItem('theme')); // 输出: dark
localStorage.removeItem('theme');
sessionStorage.clear(); // 清空
```
### 特点

1. **持久性存储**：数据永久保存在浏览器中，除非手动删除或清除浏览器缓存
2. **存储容量**：一般为 5-10MB（具体取决于浏览器）
3. **作用域**：同源策略下，所有窗口共享数据
4. **存储方式**：以键值对形式存储，值只能是字符串
5. **操作方式**：提供简单的 API 进行增删改查操作
6. **同步操作**：localStorage 的读写操作都是同步的


## Cookie
### 基本用法
```js
// Cookie 示例
document.cookie = "user=John; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
document.cookie = "theme=dark; max-age=3600; path=/";

// 读取 cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
console.log(getCookie('user')); // 输出: John
```
### 特点

1. **容量限制**：单个 Cookie 通常限制在 4KB 左右
2. **数量限制**：每个域名下的 Cookie 数量也有限制（一般为 20-50 个）
3. **过期时间**：可以设置过期时间（expires）或存活时间（max-age）
4. **安全性**：
   - 可以设置 HttpOnly 防止 JavaScript 访问
   - 可以设置 Secure 只在 HTTPS 连接中传输
   - 可以设置 SameSite 防止 CSRF 攻击
5. **作用域**：可以通过 domain 和 path 设置 Cookie 的作用域
6. **自动发送**：浏览器每次请求都会自动携带 Cookie
7. **兼容性**：几乎所有浏览器都支持
8. **服务器交互**：可以由服务器端设置，也可以由客户端设置




