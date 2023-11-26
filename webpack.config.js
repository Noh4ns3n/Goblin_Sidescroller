const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log('__dirname :>> ', __dirname);
module.exports = {
  mode: 'development',
  entry: './script.ts',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    hot: true,
    port: 9001,
    watchFiles: ["./**/*"],
    static: {
      directory: path.join(__dirname, './'),
    },
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
}
};