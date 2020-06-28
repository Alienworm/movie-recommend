<template>
  <div class="sign">
    <router-view class="sign-container"></router-view>
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
    .sign-container {
      position: relative;
      width: 60vw;
      height: 0;
      overflow: hidden;
      .switch-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        border-radius: 0 10px 0 50px;
        svg {
          width: 25px;
          height: 25px;
          position: absolute;
          top: 8px;
          right: 8px;
          path {
            color: $card-primary-text;
          }
        }
        z-index: 3;
      }
      .base-sidebar {
        position: absolute;
        top: 0;
        left: 0;
        width: 35%;
        height: 100%;
        border-radius: 10px 0 0 10px;
      }
    }
  }
</style>
