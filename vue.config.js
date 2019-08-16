const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

const publicPath = process.env.NODE_ENV === "production" ? "/" : "/";

module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  css: {
	sourceMap: false,
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
  },
  configureWebpack: {
    devtool:
      process.env.NODE_ENV === "production" ? "check-source-map" : "none",
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
