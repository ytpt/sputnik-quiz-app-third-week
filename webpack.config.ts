const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 3001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.bundle\.ts$/,
                use: {
                    loader: 'bundle-loader',
                    options: {
                        name: '[name]'
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|png|gif|jpg)$/,
                exclude: /fonts/,
                loader: 'file-loader'
            },
            {
                test: /\.(ttf|eot|woff|svg|woff2)$/,
                loader: "file-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            favicon: "./src/assets/favicon.ico"
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};