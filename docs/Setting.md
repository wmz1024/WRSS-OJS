# WRSS - Setting

## Proxy问题

备注：目前WRSS并没有官方Proxy服务器 某些订阅<strong>可能不能加载</strong>

### 目前已知解决办法

 1. 使用插件 Allow CORS: Access-Control-Allow-Origin
 2. 自己手搓Proxy服务器 （官方的在写了在写了🥹）


## 通用设置

### 更新时间排序与发布时间排序

字面意思 可以修改排序方法

### XML订阅代理

获取RSS/Feed文件时 会根据此Proxy获取 原URL加在Proxy后

例如 `https://proxy.test.example.com/原URL`

### 图片获取代理

获取图片文件时 会根据此Proxy获取 原URL加在Proxy后

例如 `https://proxy.test.example.com/原URL`