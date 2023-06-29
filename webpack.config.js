const path = require('path');

module.exports = {
    mode: 'development', 
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },   
        port: 3000,  
        open: true,
        hot: true, 
        compress: true,
        historyApiFallback: true,    
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },    
        ],
      },
};