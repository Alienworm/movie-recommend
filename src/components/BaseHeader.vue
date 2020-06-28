<template>
  <header class="base-header">
    <BaseLogo font-size="22px" height="60px" width="100%"></BaseLogo>
    <BaseButton class="base-header-exit" @click.native="signOut" v-if="isSignIn">
      退出登录 <font-awesome-icon prefix="fas" icon="sign-out-alt"></font-awesome-icon>
    </BaseButton>
    <BaseButton class="base-header-sign-up" @click.native="signOut" v-if="!isSignIn">
      登录/注册 <font-awesome-icon prefix="fas" icon="sign-out-alt"></font-awesome-icon>
    </BaseButton>
    <div class="base-header-title" v-if="isSignIn">
      Hi {{userinfo.username}}, Welcome to ZZZWT <span>Hub</span>.
    </div>
  </header>
</template>

<script>
  import BaseLogo from "./BaseLogo";
  import TimelineLite from "gsap";
  import BaseButton from "./BaseButton";
  export default {
    name: "BaseHeader",
    components: {BaseButton, BaseLogo},
    data() {
      return {
        isSignIn: false,
        userinfo: JSON.parse(localStorage.getItem('userinfo'))
      }
    },
    mounted() {
      this.initAnimation();
      if (localStorage.getItem('userinfo') !== null)
        this.isSignIn = true;
    },
    methods: {
      initAnimation() {
        TimelineLite.to('.base-header', {duration: 0.3, top: '0', opacity: 1});
      },
      signOut() {
        localStorage.clear();
        this.$router.push('/sign/sign-in')
      }
    }
  }
</script>

<style scoped lang="scss">
  .base-header {
    background-color: $card-background;
    box-shadow: $card-box-shadow-bottom;
    .base-logo {
      position: absolute;
      top: 0;
      left: 0;
      width: 50% !important;
    }
    .base-header-exit,
    .base-header-sign-up {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 140px;
      height: 40px;
      svg {
        margin-left: 10px;
      }
    }
    .base-header-title {
      position: absolute;
      top: 0;
      left: 200px;
      right: 200px;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font: bolder 20px Roboto;
      span {
        background-color: #ee2b47;
        padding: 0 5px 0 5px;
        border-radius: 5px;
      }
    }
  }
</style>
