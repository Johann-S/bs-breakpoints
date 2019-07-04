const path = require('path')
const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')

const pkg = require(path.resolve(__dirname, 'package.json'))
const year = new Date().getFullYear()

const buildProd = process.env.PROD === 'true'
const buildDev = process.env.DEV === 'true'

const conf = {
  input: './src/index.js',
  output: {
    banner:
`/*!
 * bsBreakpoints v${pkg.version} (${pkg.homepage})
 * Copyright 2018 - ${year} ${pkg.author}
 * Licensed under MIT (https://github.com/Johann-S/bs-breakpoints/blob/master/LICENSE)
 */`,
    file: './dist/bs-breakpoints.js',
    format: 'umd',
    name: 'bsBreakpoints',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

if (buildDev) {
  conf.output.file = './tests/dist/bs-breakpoints.js'
  conf.watch = {
    include: 'src/**.js'
  }
}

if (buildProd) {
  conf.output.file = './dist/bs-breakpoints.min.js'
  conf.plugins.push(uglify({
    compress: {
      typeofs: false
    },
    mangle: true,
    output: {
      comments: /^!/
    }
  }))
}

module.exports = conf
