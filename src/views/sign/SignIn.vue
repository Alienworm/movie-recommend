<template>
  <BaseCard class="sign-in">
    <BaseButton class="switch-button" @click.native="showSignUp">
      <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon>
    </BaseButton>
    <BaseSidebar :base-sidebar-image-url="require('../../assets/images/sign-in.gif')">
      <span>Movies</span>
      <p>
        Movies move us like nothing else can, whether they’re scary, funny,
        dramatic, romantic or anywhere in-between. So many titles, so much to
        experience.
      </p>
    </BaseSidebar>
    <SignForm title="登 录">
      <form>
        <BaseInput>
          <label>
            <input type="text" v-model="user.username" />
            <span>用 户 名</span>
            <font-awesome-icon prefix="fax" icon="user"></font-awesome-icon>
          </label>
        </BaseInput>
        <BaseInput>
          <label>
            <input type="password" v-model="user.password" />
            <span>密 码</span>
            <font-awesome-icon prefix="fax" icon="key"></font-awesome-icon>
          </label>
        </BaseInput>
        <BaseButton @click.native="signIn">登 录</BaseButton>
      </form>
    </SignForm>
  </BaseCard>
</template>

<script>
  import BaseCard from "../../components/BaseCard";
  import BaseSidebar from "../../components/BaseSidebar";
  import SignForm from "./SignForm";
  import BaseInput from "../../components/BaseInput";
  import BaseButton from "../../components/BaseButton";
  import TimelineLite from "gsap";
  export default {
    name: "SignIn",
    components: {BaseButton, BaseInput, SignForm, BaseSidebar, BaseCard},
    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    mounted() {
      this.initAnimation();
      localStorage.clear();
    },
    methods: {
      startLoading(flag) {
        TimelineLite.to('.base-loader', {duration: 0.3, pointerEvents: flag ? 'auto' : 'none', opacity: flag ? 1 : 0});
      },
      initAnimation() {
        TimelineLite.to('.sign-in', {duration: 0.3, height: '60vh', opacity: 1});
      },
      async signIn() {
        this.startLoading(true);
        const result = await this.$axios.post('/api/user/sign_in', this.user);
        this.startLoading(false);
        if (result.data.code === 200) {
          this.$EventBus.$emit('alertMessage', {type: 'success', message: '登录成功'});
          localStorage.setItem('userinfo', JSON.stringify(result.data.user));
          this.$router.push('/home/index');
        } else {
          this.inputError(0);
          this.inputError(1);
          this.$EventBus.$emit('alertMessage', {type: 'error', message: '登录失败'});
        }
      },
      inputError(index) {
        let label = this.$el.getElementsByClassName('sign-form')[0].getElementsByTagName('label')[index];
        let span = label.getElementsByTagName('span')[0];
        let input = label.getElementsByTagName('input')[0];
        let svgPath = label.getElementsByTagName('svg')[0].getElementsByTagName('path')[0];
        span.style.color = this.signUpFlag ? '#2c2c3c' : '#ee2b47';
        input.style.color = this.signUpFlag ? '#2c2c3c' : '#ee2b47';
        svgPath.style.color = this.signUpFlag ? '#2c2c3c' : '#ee2b47';
      },
      showSignUp() {
        this.$router.push('/sign-up');
      }
    }
  }
</script>

<style scoped lang="scss">
  .sign-in {
  }
</style>
