'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

// helpers for writing path names
// e.g. join("web/static") => "/full/disk/path/to/hello/web/static"
function join(dest) { return path.resolve(__dirname, dest); }

function web(dest) { return join('web/static/' + dest); }

var config = module.exports = {

  devtool: 'source-map',

  // our application's entry points - for this example we'll use a single each for
  // css and js
  entry: {
    application: [
      web('css/app.scss'),
      web('js/app.js'),
    ],
  },

  // where webpack should output our files
  output: {
    path: join('priv/static'),
    filename: 'js/app.js',
  },

  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['node_modules'],
  },

  // more information on how our modules are structured, and
  //
  // in this case, we'll define our loaders for JavaScript and CSS.
  // we use regexes to tell Webpack what files require special treatment, and
  // what patterns to exclude.
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
    ],
  },

  // what plugins we'll be using - in this case, just our ExtractTextPlugin.
  // we'll also tell the plugin where the final CSS file should be generated
  // (relative to config.output.path)
  plugins: [
    new ExtractTextPlugin('css/app.css'),
  ],
};

// if running webpack in production mode, minify files with uglifyjs
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}
