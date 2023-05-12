# WRSS - Setting

## 有意思的使用方法

### 作为网站RSS预览器

考虑到用户没有RSS订阅器的话 把RSS地址直接改成本RSS管理器即可

使用方法

```
https://feed.wmza.cn/#page=LoadFeed&url=您站的订阅URL
```

## Proxy问题

备注：目前WRSS并没有官方Proxy服务器 某些订阅<strong>可能不能加载</strong>

### 目前已知解决办法

 1. 使用插件 Allow CORS: Access-Control-Allow-Origin
 2. 自己手搓Proxy服务器 （官方的在写了在写了🥹）

### 官方的 在做了在做了 🥹🥹🥹

如果你有服务器/虚拟主机 可以尝试使用以下PHP代码来Proxy你的XML订阅代理

```php
<?php
$origin = $_GET['origin'];
header('Access-Control-Allow-Origin: *');
$xml_string = file_get_contents($origin);
header('Content-Type: application/xml');
echo $xml_string;
```

官方因为没有钱 目前还没有给大家用的😭😭😭😭😭😭

（等我把服务器钱赚出来就给大家用！！！！！！！！！！！！

## 通用设置

### 更新时间排序与发布时间排序

字面意思 可以修改排序方法

### XML订阅代理

获取RSS/Feed文件时 会根据此Proxy获取 原URL加在Proxy后

例如 `https://proxy.test.example.com/原URL`

### 图片获取代理

获取图片文件时 会根据此Proxy获取 原URL加在Proxy后

例如 `https://proxy.test.example.com/原URL`