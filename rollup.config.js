import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import istanbul from 'rollup-plugin-istanbul'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)

let plugins = [
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  babel(babelrc())
]

if (process.env.BUILD !== 'production') {
  plugins.push(
    istanbul({
      exclude: ['test/**/*', 'node_modules/**/*']
    })
  )
}

export default {
  entry: 'lib/die.js',
  plugins: plugins,
  external: external,
  globals: {
    'mersenne-twister': 'MersenneTwister'
  },
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'die',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
}
