module.exports = {
  outputDir: "/dist",
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/_variable.scss";`
      }
    }
  },
  parallel: require("os").cpus().length > 1,
  devServer: {
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://203.195.139.146:5000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
