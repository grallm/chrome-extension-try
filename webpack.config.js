/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const srcDir = path.join(__dirname, 'src')

module.exports = {
  entry: {
    popup: path.join(srcDir, 'popup/popup.ts'),
    options: path.join(srcDir, 'options/options.ts'),
    background: path.join(srcDir, 'background/background.ts')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        'public',
        { from: 'src/**/*.{html,css}', to: '[name][ext]' }
      ]
    })
  ],
  mode: 'production',
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
