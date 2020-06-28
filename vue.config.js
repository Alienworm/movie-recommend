module.exports = {
  css: {
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
        //target: "http://127.0.0.1:5000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}
