---
title: 'First Blog Post'
date: '2023-01-01'
---

这是vue3的学习记录过程

# 源码下载
源码地址：https://github.com/lgd8981289/vue-next-3.2.37
```sh
git clone git@github.com:lgd8981289/vue-next-3.2.37.git
```
克隆到本地之后，安装依赖包，vue3的包管理器是pnpm，这里我们也安装pnpm，安装多少版本呢？
我们可以看到在项目的`package.json`里面：
```sh
"packageManager": "pnpm@7.1.0"
```
那我们也安装这个版本
```sh
npm i -g pnpm@7.1.0
```
`注意`：这里需要我们的node版本 `>=16.11.0`，版本不一致请自行更换

安装完成之后，需要安装相关依赖，执行`pnpm i`，等待执行结果：
```sh
pnpm i
```
依赖安装完成之后，我们需要进行打包
```sh
npm run build
```
但是我们是需要进行源码阅读，肯定需要代码调试我们才能更好的理解源码，也就需要把源码暴露出来，需要用到sourceMap，怎么使用呢，我们看源码，在`package.json`里面：
```sh
    ...
  "scripts": {
    "dev": "node scripts/dev.js",
    "build": "node scripts/build.js",
    ...
```
我们可以看到`build`命令实际运行的是`node/scripts/build.js`文件，我们打开这个文件看下代码
```javascript
// 只展示了关键代码
...
const args = require('minimist')(process.argv.slice(2))
...
const sourceMap = args.sourcemap || args.s
...
await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `COMMIT:${commit}`,
        `NODE_ENV:${env}`,
        `TARGET:${target}`,
        formats ? `FORMATS:${formats}` : ``,
        buildTypes ? `TYPES:true` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
```
我们可以看到首先获取到我们执行命令时的参数，然后判断参数是否存在，存在的话就在打包的时候执行`SOURCE_MAP:true`，我们可以看到参数来自`const sourceMap = args.sourcemap || args.s`，所以我们传`sourcemap`以及`s`都是ok的，所以最后需要修改`package.json`里面：
```sh
    ...
  "scripts": {
<!-- more -->

    "dev": "node scripts/dev.js",
    "build": "node scripts/build.js -s", // 开启sourcemap  -sourcemap 也是ok的
    ...
```
最后打包完成之后，会在`packages/vue`目录下生成`dist`目录，里面就包含了各个所需版本的vue.js

