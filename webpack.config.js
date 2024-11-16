module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'raw-loader',
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'editorjs-spoiler.bundle.js',
    library: 'Spoiler',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }
};
