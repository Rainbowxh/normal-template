import path, { format } from "node:path"
import { fileURLToPath } from "node:url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import HtmlWebpackPlugin from 'html-webpack-plugin';

import * as webpack from 'webpack';
const { ModuleFederationPlugin } = webpack.default.container

export default {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
    },{
      test: /\.css$/,
      use: 'css-loader'
    }]
  },
  plugins: [new HtmlWebpackPlugin(),    
    new ModuleFederationPlugin({
      remotes: {
        remoteApp: 'elicxh@http://192.168.88.120:5500/remoteEntry.js',
      },
    })
  ],
  output: {
    clean: true,
    filename: 'index.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '..', 'dist'),
    globalObject: 'this'
  }
}
