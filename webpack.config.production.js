var path = require('path');

module.exports = [
  {
    entry: [
      'eventsource-polyfill',
      './client/index'
    ],
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel-loader']},
        {test: /(\.css)$/, include: path.join(__dirname, 'client/style'), loaders: ['css-loader']},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
      ]
    }
  },
  {
   entry: [
     'eventsource-polyfill',
     './server/index'
   ],
   output: {
     path: __dirname + '/dist',
     publicPath: '/',
     filename: 'server.js'
   },
   node: {
     console:'empty',
     fs: 'empty',
     net: 'empty',
     tls: 'empty',
   },
   module: {
     loaders: [
       {test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel-loader']},
     ]
   }
 }
]
