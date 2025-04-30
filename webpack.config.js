const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Import CleanWebpackPlugin

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader for transpiling
        },
      },
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Match image files
        type: 'asset/resource', // Handle images as assets
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new HtmlWebpackPlugin({
      template: './src/index.html', // Specify the HTML template
      filename: 'index.html', // Output HTML file name
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve content from the dist directory
    // compress: true, // Enable gzip compression
    port: 3000, // Port for the dev server
    open: true, // Open the browser automatically
  },
  mode: 'development', // Set mode to development
};
