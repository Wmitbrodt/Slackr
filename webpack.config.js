var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    'eventsource-polyfill',
    './src/index',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    rules: [
      { test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.css?$/,
        loader: ['css-loader'],
      },
      { test: /\.scss?$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(jpg|gif|png|svg)$/,
        // loader: 'url?name=[path][name].[ext]&limit=10000',
        loader: 'file-loader',
      },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
    ]
  },

  devServer: {
    // allow cross origin requests
    headers: { "Access-Control-Allow-Origin": "*" },
    host: 'localhost',
    port: 5000,
    public:'localhost:5000',
    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
};
