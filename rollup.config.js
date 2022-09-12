/**
 * @type {import('rollup').RollupOptions}
 */
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'

const config = [{
  plugins: [
    typescript(),
    postcss({
      extensions: ['.css']
    })
  ],
  input: 'src/background.ts',
  output: {
    dir: 'dist/',
    format: 'cjs'
  }
}, {
  plugins: [typescript()],
  input: 'src/options.ts',
  output: {
    dir: 'dist/',
    format: 'cjs'
  }
}, {
  plugins: [typescript()],
  input: 'src/popup.ts',
  output: {
    dir: 'dist/',
    format: 'cjs'
  }
}]
export default config
