const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const pages = [
  { pageName: 'color-and-type', pageType: 'ui-kit' },
  { pageName: 'form-elements', pageType: 'ui-kit' },
  { pageName: 'cards', pageType: 'ui-kit' },
  { pageName: 'header-and-footer', pageType: 'ui-kit' },
  { pageName: 'main-sign-in', pageType: 'web' },
  { pageName: 'registration', pageType: 'web' },
  { pageName: 'room-details', pageType: 'web' },
  { pageName: 'search-room', pageType: 'web' },
];

const pluginsOptions = [];

pluginsOptions.push(new HtmlWebpackPlugin({
  inject: false,
  hash: true,
  template: './src/pages/index/index.pug',
  filename: 'index.html'
}));

pages.forEach((e) => {
  pluginsOptions.push(
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: `./src/pages/${e.pageType}/${e.pageName}/${e.pageName}.pug`,
      filename: `${e.pageName}.html`,
    }),
  );
});


pluginsOptions.push(new MiniCssExtractPlugin({
  filename: "style.css",
}));

pluginsOptions.push(new CopyWebpackPlugin([
  {
    from: './src/fonts',
    to: './fonts',
  },
  {
    from: './src/img',
    to: './img'
  },
  {
    context: './src/components/',
    from:  '**/*.svg',
    to: path.resolve(__dirname, 'docs/images/[name].[ext]')
  },
  {
    context: './src/components/',
    from:  '**/*.png',
    to: path.resolve(__dirname, 'docs/images/[name].[ext]')
  },
  {
    from: './src/pages/index/images/',
    to: './images'
  },
  {
    from: './src/pages/web/room-details/images/',
    to: './images'
  },
  {
    from: './src/pages/web/room-details/images/',
    to: './images'
  },
  {
    from: './src/pages/web/search-room/images/',
    to: './images'
  },

]));

pluginsOptions.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
}));

pluginsOptions.push(new CleanWebpackPlugin());

module.exports = {
  entry: {
    index: './src/pages/index/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  },

  plugins: pluginsOptions,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { url: false, sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
        loader: 'file-loader',
      },
    ]
  },
  devServer: {
    stats: 'errors-only'
  },
};
