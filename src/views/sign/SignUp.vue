<template>
  <BaseCard class="sign-up">
    <BaseButton class="switch-button" @click.native="showSignIn">
      <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon>
    </BaseButton>
    <BaseSidebar :base-sidebar-image-url="require('../../assets/images/sign-up.gif')">
      <i v-for="(menu, index) in menuList" :key="index" @click="goToPage(index)">
        <font-awesome-icon :prefix="menu.icon.prefix" :icon="menu.icon.name"></font-awesome-icon> {{menu.title}}
      </i>
    </BaseSidebar>
    <SignForm title="第 一 步" class="sign-form-hide">
      <form>
        <BaseInput>
          <label>
            <input type="text" v-model="user.username" @focusout="checkUsername"/>
            <span>账 号</span>
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
        <BaseInput>
          <label>
            <label class="text-input">
              <input type="password" v-model="user.confirmPassword" @focusout="checkPassword"/>
              <span>确 认 密 码</span>
            </label>
            <font-awesome-icon prefix="fax" icon="key"></font-awesome-icon>
          </label>
        </BaseInput>
        <div class="item">
          <BaseButton class="prev-button disable-button">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </BaseButton>
          <BaseButton class="next-button" @click.native="nextPage">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </BaseButton>
        </div>
      </form>
    </SignForm>
    <SignForm title="第 二 步" class="sign-form-hide">
      <form>
        <ul class="movie-type-list">
          <BaseButton class="movie-type" v-for="(type, index) in movieTypeList" :key="index" @click.native="selectMovieType(index, type)">{{type}}</BaseButton>
        </ul>
        <div class="item">
          <BaseButton class="prev-button" @click.native="prevPage">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </BaseButton>
          <BaseButton class="next-button" @click.native="nextPage">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </BaseButton>
        </div>
      </form>
    </SignForm>
    <SignForm title="第 三 步" class="sign-form-hide">
      <form>
        <BaseInput>
          <label>
            <input type="text" v-model="user.age" />
            <span>年 龄</span>
            <font-awesome-icon prefix="fas" icon="user"></font-awesome-icon>
          </label>
        </BaseInput>
        <BaseInput>
          <label class="text-input">
            <input type="text" v-model="user.region" />
            <span>地 区</span>
            <font-awesome-icon prefix="fas" icon="map-marker-alt"></font-awesome-icon>
          </label>
        </BaseInput>
        <BaseButton @click.native="signUp">注 册</BaseButton>
        <div class="item">
          <BaseButton class="prev-button" @click.native="prevPage">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </BaseButton>
          <BaseButton class="next-button disable-button">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </BaseButton>
        </div>
      </form>
    </SignForm>
  </BaseCard>
</template>

<script>
  import BaseCard from "../../components/BaseCard";
  import BaseSidebar from "../../components/BaseSidebar";
  import TimelineLite from "gsap";
  import BaseButton from "../../components/BaseButton";
  import SignForm from "./SignForm";
  import BaseInput from "../../components/BaseInput";
  export default {
    name: "SignUp",
    components: {BaseInput, SignForm, BaseButton, BaseSidebar, BaseCard},
    data() {
      return {
        signUpFlag: false,
        menuList: [
          {title: '填写账号密码', icon: {prefix: 'far', name: 'dot-circle'}},
          {title: '喜欢的电影类型', icon: {prefix: 'far', name: 'dot-circle'}},
          {title: '完善个人信息', icon: {prefix: 'far', name: 'dot-circle'}},
        ],
        user: {
          username: '',
          password: '',
          confirmPassword: '',
          selectedMovieTypeList: [],
          age: '',
          region: ''
        },
        movieTypeList: [
          '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑',
          '惊悚', '恐怖', '犯罪', '音乐', '歌舞', '传记', '历史',
          '战争', '西部', '奇幻', '冒险', '灾难', '武侠'
        ],
        currentPage: 0
      }
    },
    mounted() {
      this.initAnimation();
      this.goToPage(0);
      localStorage.clear();
    },
    methods: {
      startLoading(flag) {
        TimelineLite.to('.base-loader', {duration: 0.3, pointerEvents: flag ? 'auto' : 'none', opacity: flag ? 1 : 0});
      },
      initAnimation() {
        TimelineLite.to('.sign-up', {duration: 0.3, height: '60vh', opacity: 1});
      },
      showSignIn() {
        this.$router.push('/sign-in');
      },
      prevPage() {
        if (this.currentPage !== 0) this.goToPage(this.currentPage - 1);
      },
      nextPage() {
        if (this.signUpFlag === false || this.user.username === '' || this.user.password === '' || this.user.confirmPassword === '')
          this.$EventBus.$emit('alertMessage', {type: 'error', message: '输入的信息有误'});
        else if (this.currentPage !== 2) this.goToPage(this.currentPage + 1);
      },
      goToPage(index) {
        if (this.currentPage === 0 && index !== 0 && this.signUpFlag === false) {
          this.$EventBus.$emit('alertMessage', {type: 'error', message: '输入的信息有误'});
          return;
        }
        this.currentPage = index;
        let itemList = document.getElementsByClassName('base-sidebar')[0].getElementsByTagName('i');
        let signForm = document.getElementsByClassName('sign-form');
        for (let i = 0; i < itemList.length; i++) {
          itemList[i].classList.remove('i-selected');
          signForm[i].classList.add('sign-form-hide');
        }
        itemList[index].classList.add('i-selected');
        signForm[index].classList.remove('sign-form-hide');
      },
      selectMovieType(index, movieType) {
        if (this.user.selectedMovieTypeList.indexOf(movieType) === -1) {
          this.user.selectedMovieTypeList.push(movieType);
          document.getElementsByClassName('movie-type')[index].classList.add('movie-type-selected');
        } else {
          this.user.selectedMovieTypeList.splice(this.user.selectedMovieTypeList.indexOf(movieType), 1);
          document.getElementsByClassName('movie-type')[index].classList.remove('movie-type-selected');
        }
      },
      async checkUsername() {
        const result = await this.$axios.post('/api/user/check_username', this.user);
        this.signUpFlag = result.data.code === 200;
        this.inputError(0);
      },
      checkPassword() {
        this.signUpFlag = this.user.password === this.user.confirmPassword;
        this.inputError(2);
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
      async signUp() {
        this.user['favortype'] = this.user.selectedMovieTypeList.join('@_@');
        this.startLoading(true);
        const result = await this.$axios.post('/api/user/sign_up', this.user);
        this.startLoading(false);
        if (result.data.code === 200) {
          this.$EventBus.$emit('alertMessage', {type: 'success', message: '注册成功'});
          localStorage.setItem('userinfo', JSON.stringify(result.data.user));
          this.$router.push('/home/index');
        } else {
          this.$EventBus.$emit('alertMessage', {type: 'error', message: '注册失败'});
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .prev-button,
  .next-button {
    position: relative;
    width: 120px !important;
    height: 50px;
  }
  .disable-button {
    background-color: $card-sub-text;
    &:hover {
      background-color: $card-sub-text;
    }
    cursor: not-allowed;
  }
  .movie-type-list {
    width: 100%;
    height: auto;
    margin: 40px 0 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .movie-type {
      position: relative;
      width: 60px;
      height: 40px;
      box-sizing: content-box;
      margin: 5px;
      background-color: $card-sub-text;
      &:hover {
        background-color: rgba($card-sub-text, 0.8);
      }
    }
    .movie-type-selected {
      background-color: $highlight;
      &:hover {
        background-color: $highlight-dark;
      }
    }
  }
</style>
