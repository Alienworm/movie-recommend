<template>
  <div class="header">
    <div class="side-bar-switch" @click="sideBarSwitch()">
      <font-awesome-icon prefix="fas" icon="bars"></font-awesome-icon>
    </div>
    <div class="header-start-recommend base-button">
      开 始
    </div>
    <div class="header-user-avatar">
      <img src="../assets/images/alien.png" width="90%" alt="alien" />
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";

  export default {
    name: "Header",
    data() {
      return {
        hideSiderBar: true
      }
    },
    methods: {
      sideBarSwitch() {
        this.hideSiderBar = !this.hideSiderBar;
        if (this.hideSiderBar) {
          TimelineLite.to('.side-bar', {time: 0.3, left: '-200px', pointerEvents: 'none'});
          TimelineLite.to('.header', {time: 0.3, left: 0});
        }
        else {
          TimelineLite.to('.side-bar', {time: 0.3, left: '0', pointerEvents: 'auto'});
          TimelineLite.to('.header', {time: 0.3, left: '200px'});
        }
      }
    }
  }
</script>

<style lang="scss">
  .header {
    position: fixed;
    left: 0;
    right: 0;
    height: 0;
    opacity: 0;
    z-index: 3;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
    background-color: #1a202c;
    overflow: hidden;
    .side-bar-switch {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      cursor: pointer;
    }
    .header-start-recommend {
      position: absolute;
      top: 10px;
      bottom: 10px;
      right: 60px;
      width: 100px;
      border-radius: 20px;
      font: bold 16px Roboto;
    }
    .header-user-avatar {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: $background-w;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
