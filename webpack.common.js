const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['**/heros/**'],
          },
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'Restopedia Indonesia',
      short_name: 'Restopedia',
      description: 'Situs Informasi Restoran Indonesia Terlengkap',
      background_color: '#ffffff',
      theme_color: '#019b4b',
      crossorigin: 'anonymous',
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve('src/public/icons/icons8-restaurant-100.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('icons', 'android'),
        },
        {
          src: path.resolve('src/public/icons/icons8-restaurant-100.jpg'),
          sizes: 192,
          destination: path.join('icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve('src/public/icons/icons8-restaurant-100.png'),
          sizes: '1024x1024',
          purpose: 'maskable',
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/scripts/sw.js'),
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50,
          },
        },
      ],
      overrideExtension: true,
    }),
  ],
};
