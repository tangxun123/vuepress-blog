# nginx 使用技巧
 
## 一、nginx 是什么？为什么它这么重要？
1. 静态资源服务器
   - 直接提供 HTML、CSS、JS、图片等静态文件
   - 支持 gzip 压缩，减少传输大小
   - 设置缓存策略，提升加载速度
2. 反向代理
    - 将用户请求转发到后端服务器
    - 实现负载均衡，分散服务器压力
    - 隐藏后端服务器真实地址，提升安全性
3. 负载均衡
    - 将请求分发到多个服务器
    - 支持多种负载均衡算法
    - 实现高可用和容错

## 二、nginx 应用场景
1. 静态资源部署
>这是前端开发者最常用的场景。React/Vue 项目打包后，需要部署到服务器上供用户访问。

```js
// 项目结构示例
my-app/
├── build/
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── media/
│   └── favicon.ico
└── nginx.conf
```
2. API 代理
>前端应用需要调用后端 API，可能存在跨域问题。通过nginx代理，可以完美解决这个问题。
```
location /app-api/ {
    proxy_pass http://192.168.0.100:1800/;
    proxy_connect_timeout 120000;
    proxy_read_timeout 120000;
    error_page 404 = /40x.html;
    root \nginx\html;
}
```
3. 性能优化
通过 nginx 的各种配置，可以显著提升前端应用的性能。

## 三、前端需掌握的 nginx 技巧
1. 最简单的静态文件服务
```
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;
    
    # 处理单页应用的路由
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
2. 静态资源缓存策略
```
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    
    # HTML 文件不缓存，确保获取最新版本
    location~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # CSS、JS 文件缓存 1 年
    location~* \.(css|js)$ {
        expires1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 图片文件缓存 1 个月
    location~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        expires1M;
        add_header Cache-Control "public";
    }
}
```
3. API 代理配置
```
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    
    # 静态文件服务
    location / {
        try_files$uri$uri/ /index.html;
    }
    
    # API 代理
    location /app-api/ {
        proxy_pass http://192.168.0.100:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }   
}
```
### 解决跨域问题的多种方案

方案一：nginx 代理（推荐）

```
location /app-api/ {
    proxy_pass http://192.168.0.100:1800/;
    # 其他代理配置...
}
```
方案二：CORS 头配置
```
location /app-api/ {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
    add_header Access-Control-Allow-Headers "Content-Type, Authorization";
    
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    proxy_pass http://backend-server/;
}
```
## 四、在 http 块中启用 gzip
```
http {
    gzipon;
    gzip_varyon;
    gzip_min_length1024;
    gzip_proxied any;
    gzip_comp_level6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
}
```
压缩效果对比：

- 原始文件大小: 100KB
- 压缩后大小:  25KB
- 压缩率:      75%
- 加载时间减少: 60%
## 五、安全头配置
```
server {
    # 防止点击劫持
    add_header X-Frame-Options "SAMEORIGIN" always;
    
    # 防止 MIME 类型嗅探
    add_header X-Content-Type-Options "nosniff" always;
    
    # XSS 防护
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 内容安全策略
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
    
    # 其他配置...
}
```
## 六、定义上游服务器组
```
upstream backend {
    server192.168.1.10:3001;
    server192.168.1.11:3001;
    server192.168.1.12:3001;
}

server {
    listen80;
    server_name your-domain.com;
    
    location /app-api/ {
        proxy_pass http://192.168.0.100:1800/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
## 七、实战：前端项目 nginx 配置
> Vue 单页应用配置
```
server {
    listen 80;
    server_name vue-app.com;
    
    # 启用 gzip 压缩
    gzipon;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 静态资源缓存
    location~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires1y;
        add_header Cache-Control "public, immutable";
    }
    
    # HTML 文件不缓存
    location~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 单页应用路由处理
    location / {
        root   /home/web/dist;
        try_files $uri $uri/ /index.html; 
        index  index.html index.htm;
    }
    # API 代理
    location /app-api/ {
        proxy_pass http://192.168.0.100:1800/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

 

