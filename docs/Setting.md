# WRSS - Setting

## 有意思的使用方法

### 作为网站RSS预览器

考虑到用户没有RSS订阅器的话 把RSS地址直接改成本RSS管理器即可

使用方法

```
https://feed.wmza.cn/#page=LoadFeed&url=您站的订阅URL
```

## Proxy问题

（最新消息： 已经解决啦！

备注：官方XML代理服务器使用Cloudflare CDN 如果网络不好可能无法加载 服务器在外地 如果您所选RSS服务在内地 可能会出现加载慢或者超时的状况

备注：目前WRSS并没有官方Proxy服务器 某些订阅<strong>可能不能加载</strong>

### 目前已知解决办法

 1. 使用插件 Allow CORS: Access-Control-Allow-Origin （目前最优解）
 2. 使用公共Proxy服务器（推荐）
 3. 自己手搓Proxy服务器

### 官方的 做好啦！

如果你有服务器/虚拟主机 可以尝试使用以下PHP代码来Proxy你的XML订阅代理

```php
<?php
$origin = $_GET['origin'];
header('Access-Control-Allow-Origin: *');
$xml_string = file_get_contents($origin);
header('Content-Type: application/xml');
echo $xml_string;
```

（最新公告：有钱了耶！ 可以给大家提供服务了！

官方因为没有钱 目前还没有给大家用的😭😭😭😭😭😭

## 通用设置

### 配置导入及导出

#### 配置导出

点击`导出配置`按钮，会导出一个JSON文件

#### 配置导入

点击`导入配置`按钮，选择JSON文件，即可导入

### 不使用公共XML代理

如果选择此选项 代表您不使用公共XML服务器

备注：如果您已经输入XML订阅代理 程序自动无视此选项

### 更新时间排序与发布时间排序

字面意思 可以修改排序方法

### XML订阅代理

获取RSS/Feed文件时 会根据此Proxy获取 原URL加在Proxy后

例如 `https://proxy.test.example.com/原URL`

### 图片获取代理

获取图片文件时 会根据此Proxy获取 原URL加在Proxy后

例如 `https://proxy.test.example.com/原URL`

## 订阅管理

### 添加订阅

 1. 添加订阅 请清楚网站RSS地址
 2. 填写站点名，以及RSS/Atom链接（网站RSS地址）
### 删除订阅

找到对应的站点名 右边会有一个`垃圾桶内有×`的标识

点击标识即可完成删除操作