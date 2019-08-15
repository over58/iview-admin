const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

const publicPath = process.env.NODE_ENV === "production" ? "/" : "/";

module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  chainWebpack: config => {
    // 设置目录快捷方式
    config.resolve.alias
      .set("@", resolve("src"))
      .set("com", resolve("src/components"))
      .set("styles", resolve("src/styles"))
      .set("views", resolve("src/views"))
      .set("libs", resolve("src/libs"))
      .set("api", resolve("src/api"));
  },
  configureWebpack: {
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
