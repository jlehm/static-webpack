var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

module.exports = {
    entry: "./app.js", //relative to root of the application
    output: {
        path: path.join(__dirname, "./dist/"),
        filename: "./dist/app.bundle.js" //relative to root of the application
    },
    watch:true,
    devServer: {
      contentBase: path.join(__dirname, "./dist/")
    },
    module:{
      rules:[
        {
          test:/\.(s*)css$/,
          use:['style-loader','css-loader','sass-loader']
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8000, // images < 8kb converted to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              }
          }]
        }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: '',
            myPageHeader: '',
            template: './app/html/index.html',
            path: path.join(__dirname, "../dist/"),
            //filename: './dist/index.html' //relative to root of the application
        }),
        new CopyWebpackPlugin([{
            from:'app/images',
            to:'images'
        }])
   ]
}
