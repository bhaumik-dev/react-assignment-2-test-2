const path = require("path");

module.exports = {
  mode: "development", // or 'production'
  entry: "./employee/src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "employee", "dist"),
    filename: "bundle.js", // Output filename
    publicPath: "/employee/dist/", // Correct public path
  },
  module: {
    rules: [
      // JavaScript/JSX files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // CSS files
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve .js and .jsx extensions
  },
  devServer: {
    historyApiFallback: true, // Enable HTML5 History API fallback
    static: {
      directory: path.join(__dirname, "employee", "public"), // Serve files from the 'employee/public' directory
    },
    port: 9000, // Port to run the dev server on
    headers: {
      "Content-Security-Policy": "default-src 'self' http://localhost:9000;",
    },
  },
};
