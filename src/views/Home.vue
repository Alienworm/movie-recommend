<template>
  <div class="home">
    <Header></Header>
    <button class="side-bar-switch base-button" @click="sideBarSwitch">
      <font-awesome-icon prefix="fas" icon="ellipsis-v"></font-awesome-icon>
    </button>
    <SideBar :side-bar-image-url="require('../assets/images/movie-night.gif')">
      <i v-for="(menu, index) in menuList" :key="index" @click="goToPage(index)">
        <font-awesome-icon :prefix="menu.icon.prefix" :icon="menu.icon.name"></font-awesome-icon> {{menu.title}}
      </i>
    </SideBar>
    <router-view class="home-container"></router-view>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import SideBar from "../components/SideBar";
  import TimelineLite from "gsap";

  export default {
    name: "Home",
    components: {SideBar, Header},
    data() {
      return {
        hideSiderBar: true,
        menuList: [
          {title: '首 页', icon: {prefix: 'fas', name: 'home'}, url: '/home/index'},
          {title: '电 影 搜 索', icon: {prefix: 'fas', name: 'search'}, url: '/home/search'},
          {title: '推 荐 结 果', icon: {prefix: 'fas', name: 'poll-h'}, url: '/home/result'},
          {title: '推 荐 分 析', icon: {prefix: 'fas', name: 'chart-pie'}, url: '/home/analysis'},
          {title: '个 人 简 报', icon: {prefix: 'fas', name: 'address-card'}, url: '/home/analysis'},
        ]
      }
    },
    mounted() {
      this.initMovieList();
    },
    methods: {
      initMovieList() {
        localStorage.setItem('ratinedMovieList', '[]');
      },
      sideBarSwitch() {
        this.hideSiderBar = !this.hideSiderBar;
        if (this.hideSiderBar) {
          TimelineLite.to('.side-bar', {duration: 0.5, left: -200});
          TimelineLite.to('.side-bar-switch', {duration: 0.5, left: 0});
        } else {
          TimelineLite.to('.side-bar', {duration: 0.5, left: 0});
          TimelineLite.to('.side-bar-switch', {duration: 0.5, left: 200});
        }
      },
      goToPage(index) {
        this.sideBarSwitch();
        let itemList = document.getElementsByClassName('side-bar')[0].getElementsByTagName('i');
        for (let i = 0; i < itemList.length; i++)
          itemList[i].classList.remove('i-selected');
        itemList[index].classList.add('i-selected');
        this.$router.push(this.menuList[index].url)
      },
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
    .side-bar-switch {
      position: fixed;
      top: calc((100% - 40px) / 2);
      left: 0;
      width: 30px;
      height: 40px;
      border-radius: 0 5px 5px 0;
      z-index: 6;
      transition: unset;
    }
    .side-bar {
      position: fixed;
      top: 0;
      left: -200px;
      height: 100%;
      width: 200px;
      overflow: hidden;
      background-color: $card-background;
      z-index: 5;
    }
    .home-container {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      min-height: calc(100vh - 60px);
      opacity: 0;
      background-color: $background;
    }
  }
</style>
