// 引入vite导出的build方法，用他来创建
const path = require('path')
const fs = require('fs')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')
//基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
//入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
//组件目录
const componentsDir = path.resolve(__dirname, '../src')
//输出目录
const outputDir = path.resolve(__dirname, '../build')
//rollup配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}
//执行创建

//全量构建

const createPackageJson = name => {
  const fileStr = `{
        "name": "${name ? name : 'sniper-ui'}",
        "version": "0.0.0",
        "main": "${name ? 'index.umd.js' : 'sniper-ui.umd.js'}",
        "module": "${name ? 'index.es.js' : 'sniper-ui.es.js'}",
        "author": "LQY",
        "github": "",
        "description": "阳阳的第一个ui库",
        "repository": {
          "type": "git",
          "url": "git+https://github.com/413281823/rust-ui.git"
        },
        "keywords": ["vue3", "组件库", "tsx", "UI"],
        "license": "ISC",
        "bugs": {
          "url": "https://github.com/413281823/rust-ui/issues"
        }
      }`

  if (name) {
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}
// 单组件按需构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )

  createPackageJson(name)
}
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'rush-ui',
          fileName: 'rush-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )

  // 创建package.json
  createPackageJson()
}
const buildLib = async () => {
  await buildAll()
  fs.readdirSync(componentsDir)
    .filter(name => {
      // 过滤组件目录：只要目录不要文件，且目录中包含index.ts
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}

buildLib()
