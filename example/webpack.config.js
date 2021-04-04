module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: '@mole-inc/sqip-loader',
            options: {
              // numberOfPrimitives: 20,
              // mode: 0,
              // blur: 12,
              // skipPreviewIfBase64: false
            },
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
            },
          },
        ],
      },
    ],
  },
}
