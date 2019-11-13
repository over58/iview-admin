const path = require("path");
const chalk = require("chalk")
const resolve = dir => {
  return path.join(__dirname, dir);
};

const isProduction = process.env.NODE_ENV === "production";
console.log(chalk.white(`当前环境:${chalk.green(process.env.NODE_ENV)}`))

const publicPath = isProduction ? "/" : "/";

const cdn = [
  "https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.5.1/dist/g2.min.js",
  "https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.10.1/dist/data-set.min.js",
  "https://cdn.bootcss.com/echarts/4.4.0-rc.1/echarts-en.common.js",
  "http://cdn.highcharts.com.cn/highcharts/highcharts.js"
];
const externals = {
  // 属性名为npm中包名， value为全局暴露出来的名字
  "@antv/g2": "G2",
  "@antv/data-set": "DataSet",
  echarts: "echarts",
  highcharts: "Highcharts"
};

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

    // 处理生产环境下使用cdn，将部分依赖不打包进bundle
    if(isProduction) {
      //https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/app.js
      config
        .plugin("html")
        .tap(args => {
          // 往htmlWebpackPlugin.options上挂载变量
          args[0].cdn = cdn;
          return args;
        })
        .end()
        .externals(externals);
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
