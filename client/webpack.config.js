const path = require('path');
const webpack = require('webpack');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const tsConfig = require('./tsconfig.json');
const tsConfigPaths = tsConfig.compilerOptions.paths;

/**
 * Returns the full alias definition.
 */
function getAlias() {
    const alias = {};
    // simple replace to make paths defined in tsconfig.compilerOptions.paths usable for Webpack
    // example: "client/*": ["src/components/*"]
    // becomes: "client": path.resolve(dirname, "src/components/")
    Object.keys(tsConfigPaths).forEach(function(pathAlias) {
        alias[pathAlias.replace('/*', '')] = path.resolve(__dirname, tsConfigPaths[pathAlias][0].replace('*', ''));
    });
    // alias['css'] = path.resolve(__dirname, "src/css/");

    return alias;
}


const root = path.resolve('./');
module.exports = {
  devtool: 'source-map',
  watch: false,
  context: __dirname + "/",
  entry: [ __dirname + `/src/app.tsx` ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loaders: ['ts-loader'],
        exclude: /node_modules/,
        include: root
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'typings-for-css-modules-loader',
                    query: {
                        sourceMap: true,
                        modules: true,
                        importLoaders: true,
                        namedExport: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                },
                'postcss-loader',
                {
                  loader: "sass-loader",
                  options: {
                      includePaths: [path.resolve(__dirname, 'src/css/')]
                  }
                }
            ]
        })
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'postcss-loader' ]
        })
      },
    ]
  },
  output: {
    path:             __dirname + '/build',
    filename:         'bundle.min.js',
    publicPath:       'build/',
    library:          'cascade-signup-client',
    libraryTarget:    'umd'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: true,
      sourceMap: true
    }),
    new UnminifiedWebpackPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    modules: [ 'src', 'node_modules'],
    extensions: [ '.js', '.ts', '.tsx' ],
    alias: getAlias()
  }
};
