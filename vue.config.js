const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

const isProduction = process.env.NODE_ENV === "production";
const publicPath = isProduction ? "/" : "/";

module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    sourceMap: false
  },
  chainWebpack: config => {
    // 设置目录快捷方式
    config.resolve.alias
      .set("@", resolve("src"))
      .set("com", resolve("src/components"))
      .set("styles", resolve("src/styles"))
      .set("views", resolve("src/views"))
      .set("libs", resolve("src/libs"))
      .set("api", resolve("src/api"))
      .set("mixins", resolve("src/mixins"));

    // 运行npm run analyze 显示性能分析
    if (process.env.analyze) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
  configureWebpack: {
    devtool:
      process.env.NODE_ENV === "production" ? "none" : "cheap-source-map",
    module: {
      rules: [
        {
          test: "/.vue$/",
          use: [
            {
              loader: "vue-loader",
              options: {}
            },
            {
              loader: "iview-loader",
              options: {
                prefix: false
              }
            }
          ]
        }
      ]
    }
  }
};
