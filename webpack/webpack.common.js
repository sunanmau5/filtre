const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    popup: path.resolve('src/popup/index.tsx'),
    background: path.resolve('src/background/index.ts'),
    contentScript: path.resolve('src/content-script/index.ts')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
    alias: {
      '@components': path.resolve('src', 'components'),
      '@contexts': path.resolve('src', 'contexts')
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('static'),
          to: path.resolve('dist')
        }
      ]
    }),
    ...getHtmlPlugins(['popup'])
  ],
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'content-script' && chunk.name !== 'background'
      }
    }
  }
}

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: 'Filtre Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
      })
  )
}
