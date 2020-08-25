
const path = require('path');

module.exports = {
    mode:"development",
    entry: './js/app.ts',   
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [
                    path.resolve(__dirname, 'js')
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader',
                include: [
                    path.resolve(__dirname, 'js')
                ]
            }
        ]
    },
    output: {
        publicPath: 'public',
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
    }
} 