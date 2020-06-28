<template>
  <div class="base-loader">
    <div class="loader-inner pacman">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseLoader"
  }
</script>

<style scoped lang="scss">
  .base-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($background, 0.8);
    opacity: 0;
    pointer-events: none;
    @keyframes rotate_pacman_half_up {
      0% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
      }

      50% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }

      100% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
      }
    }
    @keyframes rotate_pacman_half_down {
      0% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }

      50% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }
    }
    @keyframes pacman-balls {
      75% {
        opacity: 0.7;
      }

      100% {
        -webkit-transform: translate(-100px, -6.25px);
        transform: translate(-100px, -6.25px);
      }
    }
    .pacman {
      position: relative;
    }

    .pacman>div:nth-child(2) {
      -webkit-animation: pacman-balls 1s 0s infinite linear;
      animation: pacman-balls 1s 0s infinite linear;
    }

    .pacman>div:nth-child(3) {
      -webkit-animation: pacman-balls 1s 0.33s infinite linear;
      animation: pacman-balls 1s 0.33s infinite linear;
    }

    .pacman>div:nth-child(4) {
      -webkit-animation: pacman-balls 1s 0.66s infinite linear;
      animation: pacman-balls 1s 0.66s infinite linear;
    }

    .pacman>div:nth-child(5) {
      -webkit-animation: pacman-balls 1s 0.99s infinite linear;
      animation: pacman-balls 1s 0.99s infinite linear;
    }

    .pacman>div:first-of-type {
      width: 0;
      height: 0;
      border-right: $pacman-size solid transparent;
      border-top: $pacman-size solid $highlight;
      border-left: $pacman-size solid $highlight;
      border-bottom: $pacman-size solid $highlight;
      border-radius: $pacman-size;
      -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
      animation: rotate_pacman_half_up 0.5s 0s infinite;
      z-index: 2;
    }

    .pacman>div:nth-child(2) {
      width: 0;
      height: 0;
      border-right: $pacman-size solid transparent;
      border-top: $pacman-size solid $highlight;
      border-left: $pacman-size solid $highlight;
      border-bottom: $pacman-size solid $highlight;
      border-radius: $pacman-size;
      -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
      animation: rotate_pacman_half_down 0.5s 0s infinite;
      margin-top: $pacman-size * -2;
      z-index: 2;
    }

    .pacman>div:nth-child(3),
    .pacman>div:nth-child(4),
    .pacman>div:nth-child(5),
    .pacman>div:nth-child(6) {
      background-color: $highlight;
      width: 15px;
      height: 15px;
      border-radius: 100%;
      margin: 2px;
      position: absolute;
      -webkit-transform: translate(0, -6.25px);
      -ms-transform: translate(0, -6.25px);
      transform: translate(0, -6.25px);
      top: $pacman-size;
      left: 150px;
      box-shadow: $card-box-shadow-around;
      z-index: 1;
    }
  }
</style>
