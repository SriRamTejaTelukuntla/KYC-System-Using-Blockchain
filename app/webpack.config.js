const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [

    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/bank-kyc.html", to: "html/bank-kyc.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/bank-kyc-registered-users.html", to: "html/bank-kyc-registered-users.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/bank-kyc-pending-users.html", to: "html/bank-kyc-pending-users.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/bank-kyc-verified-users.html", to: "html/bank-kyc-verified-users.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/demat-kyc.html", to: "html/demat-kyc.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/demat-kyc-registered-users.html", to: "html/demat-kyc-registered-users.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/demat-kyc-pending-users.html", to: "html/demat-kyc-pending-users.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/demat-kyc-verified-users.html", to: "html/demat-kyc-verified-users.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/user-select-kyc.html", to: "html/user-select-kyc.html" }]),
    new CopyWebpackPlugin([{ from: "./src/html/admin-select-kyc.html", to: "html/admin-select-kyc.html" }]),
    new CopyWebpackPlugin([{ from: "./src/css/style.css", to: "css/style.css" }]),
    new CopyWebpackPlugin([{ from: "./src/css/bootstrap.css", to: "css/bootstrap.css" }]),
    new CopyWebpackPlugin([{ from: "./src/css/LineIcons.2.0.css", to: "css/LineIcons.2.0.css" }]),
    new CopyWebpackPlugin([{ from: "./src/css/animate.css", to: "css/animate.css" }]),
    new CopyWebpackPlugin([{ from: "./src/css/main.css", to: "css/main.css" }]),
    new CopyWebpackPlugin([{ from: "./src/images/favicon.png", to: "images/favicon.png" }]),
    new CopyWebpackPlugin([{ from: "./src/images/KYC_Screen-Logo_White.png", to: "images/KYC_Screen-Logo_White.png" }]),
    new CopyWebpackPlugin([{ from: "./src/images/KYC_Screen-Logo_White.webp", to: "images/KYC_Screen-Logo_White.webp" }]),
    new CopyWebpackPlugin([{ from: "./src/images/logo/KYC_Screen-Logo_White.png", to: "images/logo/KYC_Screen-Logo_White.png" }]),
    new CopyWebpackPlugin([{ from: "./src/images/logo/KYC_Screen-Logo_White.webp", to: "images/logo/KYC_Screen-Logo_White.webp" }]),
    new CopyWebpackPlugin([{ from: "./src/images/logo/footerlogo.svg", to: "images/logo/footerlogo.svg" }]),
    new CopyWebpackPlugin([{ from: "./src/images/hero/hero-bg.svg", to: "images/hero/hero-bg.svg" }]),
    new CopyWebpackPlugin([{ from: "./src/images/hero/hero-img.svg", to: "images/hero/hero-img.svg" }]),
    new CopyWebpackPlugin([{ from: "./src/fonts/LineIcons.eot", to: "fonts/LineIcons.eot" }]),
    new CopyWebpackPlugin([{ from: "./src/fonts/LineIcons.svg", to: "fonts/LineIcons.svg" }]),
    new CopyWebpackPlugin([{ from: "./src/fonts/LineIcons.ttf", to: "fonts/LineIcons.ttf" }]),
    new CopyWebpackPlugin([{ from: "./src/fonts/LineIcons.woff", to: "fonts/LineIcons.woff" }]),
    new CopyWebpackPlugin([{ from: "./src/fonts/LineIcons.woff2", to: "fonts/LineIcons.woff2" }]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
