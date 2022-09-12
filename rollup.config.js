/**
 * @type {import('rollup').RollupOptions}
 */
import typescript from '@rollup/plugin-typescript';

const config = {
  plugins: [typescript()],
  input: 'src/**.ts',
  output: {
    dir: 'dist'
  }
};
export default config;