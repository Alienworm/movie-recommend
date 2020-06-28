<template>
  <div class="home">
    <BaseHeader></BaseHeader>
    <BaseButton class="side-bar-switch" @click.native="sideBarSwitch" v-if="isSignIn">
      <font-awesome-icon prefix="fas" icon="angle-left" v-if="!hideSiderBar"></font-awesome-icon>
      <font-awesome-icon prefix="fas" icon="angle-right" v-if="hideSiderBar"></font-awesome-icon>
    </BaseButton>
    <BaseSidebar :base-sidebar-image-url="require('../assets/images/movie-night.gif')">
      <i v-for="(menu, index) in menuList" :key="index" @click="goToPage(index)">
        <font-awesome-icon :prefix="menu.icon.prefix" :icon="menu.icon.name"></font-awesome-icon> {{menu.title}}
      </i>
    </BaseSidebar>
    <router-view class="home-container"></router-view>
  </div>
</template>

<script>
  import BaseHeader from "../components/BaseHeader";
  import BaseSidebar from "../components/BaseSidebar";
  import BaseButton from "../components/BaseButton";
  import TimelineLite from "gsap";
  export default {
    name: "Home",
    components: {BaseButton, BaseSidebar, BaseHeader},
    data() {
      return {
        hideSiderBar: false,
        menuList: [
          {title: '首 页', icon: {prefix: 'fas', name: 'home'}, url: '/home/index'},
          {title: '电 影 搜 索', icon: {prefix: 'fas', name: 'search'}, url: '/home/search'},
          {title: '电 影 推 荐', icon: {prefix: 'fas', name: 'poll-h'}, url: '/home/recommend'},
          {title: '推 荐 分 析', icon: {prefix: 'fas', name: 'chart-pie'}, url: '/home/analysis'},
          {title: '个 人 简 报', icon: {prefix: 'fas', name: 'address-card'}, url: '/home/analysis'},
        ],
        isSignIn: false
      }
    },
    mounted() {
      this.goToPage(0);
      if (localStorage.getItem('userinfo') !== null)
        this.isSignIn = true;
    },
    methods: {
      sideBarSwitch() {
        this.hideSiderBar = !this.hideSiderBar;
        if (this.hideSiderBar) {
          TimelineLite.to('.base-sidebar', {duration: 0.3, left: -210});
          TimelineLite.to('.side-bar-switch', {duration: 0.3, left: 0});
        } else {
          TimelineLite.to('.base-sidebar', {duration: 0.3, left: 0});
          TimelineLite.to('.side-bar-switch', {duration: 0.3, left: 200});
        }
      },
      goToPage(index) {
        this.sideBarSwitch();
        let itemList = document.getElementsByClassName('base-sidebar')[0].getElementsByTagName('i');
        for (let i = 0; i < itemList.length; i++)
          itemList[i].classList.remove('i-selected');
        itemList[index].classList.add('i-selected');
        this.$router.push(this.menuList[index].url);
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $background;
    .base-header {
      position: fixed;
      top: -60px;
      left: 0;
      width: 100%;
      height: 60px;
      z-index: 2;
    }
    .base-sidebar {
      position: fixed;
      top: 0;
      left: -200px;
      width: 200px;
      height: 100%;
      z-index: 3;
    }
    .home-container {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      min-height: calc(100vh - 60px);
      opacity: 0;
      background-color: $background;
      z-index: 1;
    }
    .side-bar-switch {
      position: fixed;
      top: calc((100% - 40px) / 2);
      left: 0;
      width: 30px;
      height: 40px;
      border-radius: 0 5px 5px 0;
      z-index: 3;
      transition: unset;
    }
  }
</style>
