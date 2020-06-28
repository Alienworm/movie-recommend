<template>
  <div class="home">
    <Header></Header>
    <SideBar></SideBar>
    <router-view class="home-container"></router-view>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import SideBar from "../components/SideBar";
  import Header from "../components/Header";
  export default {
    name: "Home",
    components: {Header, SideBar},
    mounted() {
      this.initAnimation();
    },
    methods: {
      // 加载动画
      initAnimation() {
        TimelineLite.to('.side-bar', {time: 0.2, width: '200px', left: '-200px', opacity: 1});
        TimelineLite.to('.header', {time: 0.2, height: '60px', opacity: 1, delay: 0.5});
      },
    }
  }
</script>

<style lang="scss">
  .home {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $primary-b;
    .home-container {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      min-height: calc(100vh - 60px);
      opacity: 0;
    }
  }
</style>
