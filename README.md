# seajs-cli
- 基于[seajs](https://github.com/nuysoft/Mock) 的模块管理，热重载，模块打包的脚手架

### 快速开始

克隆项目文件:

```
git clone git@github.com:zuiidea/seajs-cli.git
```

进入目录安装依赖:

```
npm i
```

开发：

```bash
gulp

先编译一次，再监听，打开 http://localhost:3000

gulp dev

无编译，直接监听
```

清理：

```bash
gulp clean

将会清理dist目录
```

构建：

```bash
gulp build

先清理dist目录，再打包压缩生成dist目录
```
