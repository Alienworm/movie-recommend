module.exports = {
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/_variable.scss";`
      }
    }
  },
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
}
