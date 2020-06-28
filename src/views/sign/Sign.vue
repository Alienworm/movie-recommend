<template>
  <div class="sign">
    <router-view class="sign-container card">
    </router-view>
  </div>
</template>

<script>
  export default {
    name: "Sign"
  }
</script>

<style lang="scss">
.sign {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // 登录注册主体
  .sign-container {
    position: relative;
    width: 60vw;
    height: 0;
    opacity: 0;
    overflow: hidden;
    background-color: $background-b;
    .switch-button {
      position: absolute;
      top: 0;
      right: 0;
      width: 50px;
      height: 50px;
      border-radius: 0 5px 0 50px;
      svg {
        position: absolute;
        top: 10px;
        right: 10px;
        path {
          color: $primary-text-w;
        }
      }
      z-index: 3;
      font: bolder 22px Roboto;
    }
  }
}

.sign-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 35%;
  height: 100%;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.3);
  .sign-sidebar-container {
    position: absolute;
    top: 60px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: left;
    flex-direction: column;
    padding: 10px 20px 10px 20px;
    span {
      font: bolder 40px Roboto;
      color: $primary;
    }
    p {
      font: 16px Roboto;
      color: $info;
    }
  }
  .sign-sidebar-image {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    padding: 10px 20px 10px 20px;
  }
}

.sign-form-container {
  position: absolute;
  top: 0;
  left: 35%;
  width: 65%;
  height: 100%;
  padding: 70px 140px 70px 140px;
  transition: all .3s;
  .sign-form-container-title {
    position: relative;
    width: 100%;
    height: 60px;
    h1 {
      font: bolder 40px Roboto;
    }
  }
  form {
    .sign-in-button,
    .sign-up-button {
      width: 100%;
      height: 40px;
      font: 20px Roboto;
      margin: 20px 0 20px 0;
      border-radius: 5px;
    }
    .sign-form-container-text-input {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      font: 20px Roboto;
      margin: 20px 0 20px 0;
      input,
      select {
        outline: none;
        border: none;
        text-decoration: none;
        width: 100%;
        height: 40px;
        padding: 0 20px 0 20px;
        font: bold 18px Roboto;
        border-radius: 5px;
        background-color: $background-w;
        transition: all 0.3s;
        color: $background-b;
      }
    }
  }
}
</style>
