const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [

    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new CopyWebpackPlugin([{ from: "./src/demat.html", to: "demat.html" }]),
    new CopyWebpackPlugin([{ from: "./src/demat.js", to: "demat.js" }]),
    new CopyWebpackPlugin([{ from: "./src/kyc.html", to: "kyc.html" }]),
    new CopyWebpackPlugin([{ from: "./src/css/bootstrap.css", to: "css/bootstrap.css" }]),
    new CopyWebpackPlugin([{ from: "./src/css/style.css", to: "css/style.css" }]),
    new CopyWebpackPlugin([{ from: "./src/css/fontawesome-all.css", to: "css/fontawesome-all.css" }]),
    new CopyWebpackPlugin([{ from: "./src/css/all.css", to: "css/all.css" }]),
    new CopyWebpackPlugin([{ from: "./src/images/KYC_Screen-Logo_White.png", to: "images/KYC_Screen-Logo_White.png" }]),
    new CopyWebpackPlugin([{ from: "./src/images/KYC_Screen-Logo_White.webp", to: "images/KYC_Screen-Logo_White.webp" }]),
    new CopyWebpackPlugin([{ from: "./src/images/What-is-KYC-illustration.png", to: "images/What-is-KYC-illustration.png" }]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
