<template>
  <div class="sign">
    <router-view class="sign-container card"></router-view>
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
      position: absolute;
      height: 0;
      width: 60vw;
      overflow: hidden;
      opacity: 0;
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
            color: $card-primary-text;
          }
        }
        z-index: 3;
        font: bolder 22px Roboto;
      }
      .side-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 35%;
      }
    }
  }
</style>
