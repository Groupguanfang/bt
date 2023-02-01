<div align="center">

# BaoTa

一个基于宝塔面板API的宝塔面板前端重构
</div>

<hr />

按道理来说，除了插件安装功能，其他都能做。慢等，不急☕️

目前仍然处于开发阶段，快速迭代中。

> 现在比较难做的，是xterm.js终端。我至今没全面搞懂这玩意，欢迎牛逼的大佬给我PR🤝

有个问题就是，宝塔面板的API请求是不支持跨域的，所以请自己搭建反向代理。

## 特性 ✨
* 🏥 监控：面板最基础基础功能
* 🌍 i8n支持English/中文
* 🕷️ 编辑网站的功能正在不断上新中
* 🚙 查看服务器本地/远程数据库列表
* 📺 查看与编辑计划任务
* ☎️ 软件商店做了基础支持 等待宝塔开放其API
* 📱 对移动端友好 响应式布局
* 📃 文件管理功能（复制粘贴正在开发中
* ✍️ Ace Editor，Codemirror 6和微软的Monaco编辑器全上了，编辑器大合集，给我们这群学生党在手机上摸鱼写代码极大的方便。
* 👀 其他功能正在火速上新中...

做这个，最主要的原因是因为宝塔面板的手机端实在是太垃了，所以我重心放在了手机端。上几张图吧...

<div align="center">

![文件编辑](https://github.com/Groupguanfang/bt/blob/master/screenshots/pc-editing.png?raw=true)
![面板](https://github.com/Groupguanfang/bt/blob/master/screenshots/mobile-dash.png?raw=true)
![手机文件管理](https://github.com/Groupguanfang/bt/blob/master/screenshots/pc-file.png?raw=true)
![文件管理](https://github.com/Groupguanfang/bt/blob/master/screenshots/mobile-file.png?raw=true)

</div>

## 安装

```sh
pnpm install
```

### 开发模式

```sh
pnpm dev
```

### 类型检查

```sh
pnpm build
```

### ESLint

```sh
pnpm lint
```
