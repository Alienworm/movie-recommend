<template>
  <div class="sign-in">
    <button class="switch-button base-button" @click="showSignUp()">
      <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon>
    </button>
    <!-- 侧边栏 -->
    <div class="sign-sidebar sign-in-sidebar">
      <!-- 侧边栏LOGO -->
      <Logo color="#61afef" height="60px" font-size="24px"></Logo>
      <!-- 侧边栏主体 -->
      <div class="sign-sidebar-container">
        <span>Movies</span>
        <p>
          Movies move us like nothing else can, whether they’re scary, funny,
          dramatic, romantic or anywhere in-between. So many titles, so much to
          experience.
        </p>
      </div>
      <!-- 侧边栏底部图片 -->
      <div class="sign-sidebar-image">
        <img src="../../assets/images/sign-in.gif" width="100%" alt="side-bar-image"/>
      </div>
    </div>
    <!-- 表单部分 -->
    <div class="sign-form-container sign-in-form-container">
      <!-- 表单标题 -->
      <div class="sign-form-container-title">
        <h1>登 录</h1>
      </div>
      <!-- 表单主体 -->
      <form action="">
        <label class="sign-form-container-text-input">
          账 号
          <input type="text"  v-model="userInfo.username" />
        </label>
        <label class="sign-form-container-text-input">
          密 码
          <input type="password"  v-model="userInfo.password" />
        </label>
        <button class="sign-in-button base-button" @click="signIn()">登 录</button>
        <label class="sign-form-container-checkbox">
          <input type="checkbox" @click="rememberMe()"/> 记 住 密 码
        </label>
      </form>
    </div>
  </div>
</template>

<script>
  import TimelineLite from 'gsap';
  import Logo from "../../components/Logo";
  export default {
    name: "SignIn",
    components: {Logo},
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
      // 加载动画
      initAnimation() {
        TimelineLite.to('.sign-in', {time: 0.5, height: '60vh', opacity: 1});
      },
      // 登录
      signIn() {
        this.$router.push('/home/index');
      },
      // 记住密码
      rememberMe() {
        if (localStorage.getItem("username") === null) {
          localStorage.setItem("username", this.userInfo.username);
          localStorage.setItem("password", this.userInfo.password);
        } else localStorage.clear();
      },
      showSignUp() {
        this.$router.push('/sign-up');
      }
    }
  }
</script>

<style lang="scss">
  .sign-in {
    .sign-in-form-container {
      form {
        .sign-form-container-checkbox {
          width: 100%;
          height: 40px;
          font: 20px Roboto;
          margin: 20px 0 20px 0;
          display: flex;
          justify-content: left;
          align-items: center;
          input[type="checkbox"] {
            margin-right: 10px;
            -webkit-appearance: none;
            vertical-align: middle;
            margin-top: 0;
            background: $border-light;
            border-radius: 5px;
            min-height: 20px;
            min-width: 20px;
            outline: none;
            border: none;
            transition: all 0.3s;
            cursor: pointer;
            box-shadow: set-shadow(0.1);
          }
          input[type="checkbox"]:checked {
            background: $success;
          }
        }
      }
    }
  }
</style>
