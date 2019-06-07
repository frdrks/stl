const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'stl.umd.js',
    library: 'stl',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  }
}