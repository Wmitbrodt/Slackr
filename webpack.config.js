var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',
    'eventsource-polyfill',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
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
      { test: /\.png$/,
        loader: 'file'
      },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 5000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
};
