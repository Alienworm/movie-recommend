<template>
  <div class="sign-form">
    <h1 class="sign-form-title">{{title}}</h1>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "SignForm",
    props: {
      title: String
    },
  }
</script>

<style scoped lang="scss">
  .sign-form {
    position: absolute;
    top: 0;
    left: 35%;
    width: 65%;
    height: 100%;
    padding: 70px 140px 70px 140px;
    transition: all .3s;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .sign-form-title {
      position: relative;
      width: 100%;
      height: 60px;
      font: bolder 40px Roboto;
    }
    form {
      position: relative;
      width: 100%;
      height: calc(100% - 60px);
      .item {
        width: 100%;
        height: 40px;
        margin: 40px 0 40px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button {
        width: 100%;
        height: 50px;
        margin: 40px 0 40px 0;
      }
      .base-input {
        position: relative;
        width: 100%;
        margin: 40px 0 40px 0;
      }
    }
  }
  .sign-form-hide {
    opacity: 0;
    pointer-events: none;
  }
</style>
