// webpack.config.js  
const path = require('path');

module.exports = {    
    mode: 'development',    
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }, 
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
        compress: true,
        port: 8000,
    },
    module: {  
        rules: [  
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {  
                test: /\.js$/,  
                exclude: /node_modules/,  
                use: {  
                    loader: 'babel-loader',  
                    options: {  
                        presets: ['@babel/preset-env']  
                    }  
                }  
            },
            {
                test: /\.(png|svg|jpg|jpeg|)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'icons/[hash][ext][query]'
                }
            }
        ]  
    } 
};