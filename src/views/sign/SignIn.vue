<template>
  <div class="sign-in">
    <button class="switch-button base-button" @click="showSignUp()">
      <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon>
    </button>
    <SideBar :side-bar-image-url="require('../../assets/images/sign-in-red.gif')">
      <span>Movies</span>
      <p>
        Movies move us like nothing else can, whether they’re scary, funny,
        dramatic, romantic or anywhere in-between. So many titles, so much to
        experience.
      </p>
    </SideBar>
    <SignForm title="登 录" :hide="false">
      <form>
        <label class="text-input">
          账 号<input type="text" v-model="userInfo.username" />
        </label>
        <label class="text-input">
          密 码<input type="password" v-model="userInfo.password" />
        </label>
        <button class="base-button" @click="signIn()">登 录</button>
        <label class="input-checkbox">
          <input type="checkbox" @click="rememberMe()"/> 记 住 密 码
        </label>
      </form>
    </SignForm>
  </div>
</template>

<script>
  import SideBar from "../../components/SideBar";
  import SignForm from "./SignForm";
  import TimelineLite from "gsap";
  export default {
    name: "SignIn",
    components: {SignForm, SideBar},
    data() {
      return {
        userInfo: {
          username: '',
          password: ''
        }
      }
    },
    mounted() {
      this.initAnimation();
    },
    methods: {
      initAnimation() {
        TimelineLite.to('.sign-in', {duration: 0.3, height: '60vh', opacity: 1});
      },
      signIn() {
        this.$router.push('/home/index');
      },
      rememberMe() {
      },
      showSignUp() {
        this.$router.push('/sign-up');
      }
    }
  }
</script>

<style scoped lang="scss">
  .sign-in {}
</style>
