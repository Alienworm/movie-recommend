<template>
  <div class="sign-up">
    <button class="switch-button base-button" @click="showSignIn">
      <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon>
    </button>
    <SideBar :side-bar-image-url="require('../../assets/images/sign-up-red.gif')">
      <i v-for="(menu, index) in menuList" :key="index" @click="goToPage(index)">
        <font-awesome-icon :prefix="menu.icon.prefix" :icon="menu.icon.name"></font-awesome-icon> {{menu.title}}
      </i>
    </SideBar>
    <SignForm title="第 一 步">
      <form>
        <label class="text-input">
          账 号<input type="text" v-model="userInfo.username" />
        </label>
        <label class="text-input">
          密 码<input type="password" v-model="userInfo.password" />
        </label>
        <label class="text-input">
          确 认 密 码<input type="password" v-model="userInfo.confirmPassword" />
        </label>
        <div class="item">
          <div class="prev-button base-button disable-button">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="next-button base-button" @click="nextPage">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </div>
        </div>
      </form>
    </SignForm>
    <SignForm title="第 二 步">
      <form>
        <ul class="movie-type-list">
          <li class="movie-type base-button" v-for="(type, index) in movieTypeList" :key="index" @click="selectMovieType(index, type)">{{type}}</li>
        </ul>
        <div class="item">
          <div class="prev-button base-button" @click="prevPage">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="next-button base-button" @click="nextPage">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </div>
        </div>
      </form>
    </SignForm>
    <SignForm title="第 三 步">
      <form>
        <label class="text-input">
          年 龄<input type="text" v-model="userInfo.age" />
        </label>
        <label class="text-input">
          地 区
          <select v-model="userInfo.zone">
            <option v-for="(value, index) in movieZoneList" :key="index" :value="value">{{value}}</option>
          </select>
        </label>
        <button class="base-button" @click="signUp()">注 册</button>
        <div class="item">
          <div class="prev-button base-button" @click="prevPage()">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="next-button base-button disable-button">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </div>
        </div>
      </form>
    </SignForm>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import SideBar from "../../components/SideBar";
  import SignForm from "./SignForm";

  export default {
    name: "SignUp",
    components: {SignForm, SideBar},
    data() {
      return {
        menuList: [
          {title: '填写账号密码', icon: {prefix: 'far', name: 'dot-circle'}},
          {title: '喜欢的电影类型', icon: {prefix: 'far', name: 'dot-circle'}},
          {title: '完善个人信息', icon: {prefix: 'far', name: 'dot-circle'}},
        ],
        userInfo: {
          username: '',
          password: '',
          confirmPassword: '',
          selectedMovieTypeList: [],
          age: '',
          zone: ''
        },
        movieTypeList: [
          '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑',
          '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记',
          '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠'
        ],
        movieZoneList: [
          '中国大陆', '美国', '香港', '台湾', '日本',
          '韩国', '英国', '法国', '德国', '意大利',
          '西班牙', '印度', '泰国', '俄罗斯', '伊朗',
          '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'
        ],
        currentPage: 0
      }
    },
    mounted() {
      this.initAnimation();
      this.goToPage(0);
    },
    methods: {
      initAnimation() {
        TimelineLite.to('.sign-up', {duration: 0.3, height: '60vh', opacity: 1});
      },
      prevPage() {
        if (this.currentPage !== 0) this.goToPage(this.currentPage - 1);
      },
      nextPage() {
        if (this.currentPage !== 2) this.goToPage(this.currentPage + 1);
      },
      goToPage(index) {
        this.currentPage = index;
        let itemList = document.getElementsByTagName('i');
        let signForm = document.getElementsByClassName('sign-form');
        for (let i = 0; i < itemList.length; i++) {
          itemList[i].classList.remove('i-selected');
          signForm[i].classList.add('sign-form-hide');
        }
        itemList[index].classList.add('i-selected');
        signForm[index].classList.remove('sign-form-hide');
      },
      selectMovieType(index, movieType) {
        if (this.userInfo.selectedMovieTypeList.indexOf(movieType) === -1) {
          this.userInfo.selectedMovieTypeList.push(movieType);
          document.getElementsByClassName('movie-type')[index].classList.add('movie-type-selected');
        } else {
          this.userInfo.selectedMovieTypeList.splice(
            this.userInfo.selectedMovieTypeList.indexOf(movieType),
            1
          );
          document.getElementsByClassName('movie-type')[index].classList.remove('movie-type-selected');
        }
      },
      signUp() {
        this.$router.push('/home/index');
      },
      showSignIn() {
        this.$router.push('/sign-in');
      }
    }
  }
</script>

<style scoped lang="scss">
  .prev-button,
  .next-button {
    position: relative;
    width: 120px;
    height: 40px;
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
      width: 70px;
      height: 40px;
      border-radius: 5px;
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
