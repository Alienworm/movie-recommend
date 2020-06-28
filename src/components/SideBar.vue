<template>
  <div class="side-bar">
    <Logo color="#61afef" font-size="30px" height="60px"></Logo>
    <div class="side-bar-container">
      <div class="side-bar-container-item" v-for="(menu, index) in menuList" :key="index" @click="goToPageTmp(index, menu.url)">
        <font-awesome-icon :prefix="menu.icon.prefix" :icon="menu.icon.icon"></font-awesome-icon> {{menu.title}}
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from "./Logo";
  export default {
    name: "SideBar",
    components: {Logo},
    data() {
      return {
        menuList: [
          {title: '首 页', icon: {prefix: 'fas', icon: 'home'}, url: '/home/index'},
          {title: '电 影 搜 索', icon: {prefix: 'fas', icon: 'search'}, url: '/home/search'},
          {title: '推 荐 结 果', icon: {prefix: 'fas', icon: 'poll-h'}, url: '/home/result'},
          {title: '推 荐 分 析', icon: {prefix: 'fas', icon: 'chart-pie'}, url: '/home/analysis'},
          {title: '个 人 简 报', icon: {prefix: 'fas', icon: 'address-card'}, url: '/home/analysis'},
        ]
      }
    },
    methods: {
      goToPageTmp(index, url) {
        this.goToPage(index);
        this.$router.push(url);
      },
    }
  }
</script>

<style lang="scss">
  .side-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 35%;
    height: 100%;
    box-shadow: 5px 0 5px rgba(0, 0, 0, 0.3);
    z-index: 5;
    background-color: #1a202c;
    opacity: 0;
    overflow: hidden;
    .side-bar-container {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      height: auto;
      padding: 0 20px 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      .side-bar-container-item {
        width: 100%;
        height: 40px;;
        font: bold 18px Roboto;
        line-height: 40px;
        cursor: pointer;
        transition: all .3s;
        margin-bottom: 10px;
        &:hover {
          color: $primary;
          svg > path {
            color: $primary;
          }
        }
      }
      .side-bar-container-item-seleted {
        padding-left: 10px;
        border-left: 10px solid $primary;
        color: $primary;
        svg > path {
          color: $primary;
        }
      }
    }
  }
</style>
