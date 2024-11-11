export default {
  entry: './src/index.js',
  mode: "development",
  output: {
    filename: './dist/result.js',
    libraryTarget: 'umd'
  },
  devtool: false
}
