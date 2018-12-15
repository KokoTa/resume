const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash:8].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 60
              },
              pngquant: {
                quality: 60
              },
              gifsicle: {
                quality: 60
              },
              webp: {
                quality: 60
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  devServer: {
    open: true,
    hot: true
  },
  plugins: [
    // 这里使用 html-webpack-plugin 输出 HTML
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      // [name] 代表文件名称， [contenthash:8] 代表根据文件内容算出的8位 hash 值
      filename: `[name].bundle.css`,
      // 文件过大时会进行拆分
      chunkFilename: "[id].css"
    }),
    // 将静态图片复制到输出目录
    // 因为 entry 的 path 为 './'，output 的 path 为 './dist'，所以拼接路径如下
    new CopyWebpackPlugin([{ from: './src/image', to: './image'}]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};