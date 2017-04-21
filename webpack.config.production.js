var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    rules: [
      { test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/ },
      { test: /\.css?$/,
        loader: 'style-loader!css-loader!',
        include: path.join(__dirname, 'src', 'styles', 'css') },
      { test: /\.scss?$/,
        loader: 'style-loader!css-loader!sass-loader',
        include: path.join(__dirname, 'src', 'styles', 'scss') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
  // {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: 'babel'},
  // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
  // {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
  // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
  // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
}
