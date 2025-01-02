import path, { format } from "node:path"
import { fileURLToPath } from "node:url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import HtmlWebpackPlugin from 'html-webpack-plugin';

import * as webpack from 'webpack';
const { ModuleFederationPlugin } = webpack.default.container

export default {
  entry: {
    remote: './src/remote/remote-calc.ts'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
    },{
      test: /\.css$/,
      use: 'css-loader'
    }]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'elicxh',
      filename: 'remoteEntry.js',
      exposes: {
        ".": "./src/remote/remote-calc.ts",
        './calc': './src/remote/remote-calc.ts'
      }
    })
  ],
  output: {
    clean: true,
    path: path.resolve(__dirname, '..', 'dist1'),
  }
}
