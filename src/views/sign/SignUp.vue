<template>
  <div class="sign-up">
    <button class="switch-button base-button" @click="showSignIn">
      <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon>
    </button>
    <!-- 侧边栏 -->
    <div class="sign-sidebar sign-up-sidebar">
      <!-- 侧边栏LOGO -->
      <Logo color="#61afef" height="60px" font-size="24px"></Logo>
      <!-- 侧边栏主体 -->
      <div class="sign-sidebar-container">
        <div class="sign-sidebar-container-item" v-for="(menu, index) in menuList" :key="index" @click="goToPage(index)">{{menu}}</div>
      </div>
      <!-- 侧边栏底部图片 -->
      <div class="sign-sidebar-image">
        <img src="../../assets/images/sign-up.gif" width="100%" alt="side-bar-image"/>
      </div>
    </div>
    <!-- 表单部分 -->
    <div class="sign-form-container sign-up-form-container">
      <!-- 表单标题 -->
      <div class="sign-form-container-title">
        <h1>第 一 步</h1>
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
        <label class="sign-form-container-text-input">
          确 认 密 码
          <input type="password"  v-model="userInfo.confirmPassword" />
        </label>
        <div class="sign-form-container-page-button">
          <div class="sign-form-container-page-prev-button disable-button base-button">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="sign-form-container-page-next-button base-button" @click="nextPage()">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </div>
        </div>
      </form>
    </div>
    <div class="sign-form-container sign-up-form-container sign-up-form-container-hide">
      <!-- 表单标题 -->
      <div class="sign-form-container-title">
        <h1>第 二 步</h1>
      </div>
      <!-- 表单主体 -->
      <form action="">
        <div class="movie-type-list">
          <div class="movie-type base-button" v-for="(movieType, index) in movieTypeList" :key="index" @click="selectMovieType(index, movieType)">{{movieType}}</div>
        </div>
        <div class="sign-form-container-page-button">
          <div class="sign-form-container-page-prev-button base-button" @click="prevPage()">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="sign-form-container-page-next-button base-button" @click="nextPage()">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </div>
        </div>
      </form>
    </div>
    <div class="sign-form-container sign-up-form-container sign-up-form-container-hide">
      <!-- 表单标题 -->
      <div class="sign-form-container-title">
        <h1>第 三 步</h1>
      </div>
      <!-- 表单主体 -->
      <form action="">
        <label class="sign-form-container-text-input">
          年 龄
          <input type="text"  v-model="userInfo.age" />
        </label>
        <label class="sign-form-container-text-input">
          地 区
          <select v-model="userInfo.zone">
            <option v-for="(value, index) in movieZoneList" :key="index" :value="value">{{value}}</option>
          </select>
        </label>
        <button class="sign-up-button base-button" @click="signUp()">注 册</button>
        <div class="sign-form-container-page-button">
          <div class="sign-form-container-page-prev-button base-button" @click="prevPage()">
            <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="sign-form-container-page-next-button base-button disable-button">
            <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import TimelineLite from 'gsap';
  import Logo from "../../components/Logo";
  export default {
    name: "SignUp",
    components: {Logo},
    data() {
      return {
        userInfo: {
          username: '',
          password: '',
          confirmPassword: '',
          selectedMovieTypeList: [],
          age: '',
          zone: ''
        },
        menuList: [
          '① 完善账号密码',
          '② 选择电影类型',
          '③ 完善个人信息'
        ],
        movieTypeList: [
          '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑',
          '惊悚', '恐怖', '犯罪', '音乐', '歌舞', '传记', '历史',
          '战争', '西部', '奇幻', '冒险', '灾难', '武侠'
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
      // 加载动画
      initAnimation() {
        TimelineLite.to('.sign-up', {time: 0.5, height: '60vh', opacity: 1});
      },
      signUp() {
        this.$router.push('/home/index');
      },
      prevPage() {
        if (this.currentPage !== 0) this.goToPage(this.currentPage - 1);
      },
      nextPage() {
        if (this.currentPage !== 2) this.goToPage(this.currentPage + 1);
      },
      goToPage(index) {
        this.currentPage = index;
        let itemList = document.getElementsByClassName('sign-sidebar-container-item');
        let pageList = document.getElementsByClassName('sign-up-form-container');
        for (let i = 0; i < itemList.length; i++) {
          itemList[i].classList.remove('sign-sidebar-container-item-seleted');
          pageList[i].classList.add('sign-up-form-container-hide');
        }
        itemList[index].classList.add('sign-sidebar-container-item-seleted');
        pageList[index].classList.remove('sign-up-form-container-hide');
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
      showSignIn() {
        this.$router.push('/sign-in');
      }
    }
  }
</script>

<style lang="scss">
  .sign-up {
    .sign-up-sidebar {
      .sign-sidebar-container {
        .sign-sidebar-container-item {
          width: 100%;
          height: 40px;
          margin: 0 0 20px 0;
          font: 22px Roboto;
          cursor: pointer;
          transition: all .3s;
          &:hover {
            color: $primary;
          }
        }
        .sign-sidebar-container-item-seleted {
          color: $primary;
        }
      }
    }
    .sign-up-form-container {
      form {
        .sign-form-container-page-button {
          width: 100%;
          height: 40px;
          margin: 0 0 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .sign-form-container-page-prev-button,
          .sign-form-container-page-next-button {
            width: 120px;
            height: 40px;
            border-radius: 5px;
            svg {
              font: bold 22px Roboto;
              path {
                color: $background-w;
              }
            }
          }
        }
        .movie-type-list {
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin: 20px 0 20px 0;
          .movie-type {
            position: relative;
            width: 70px;
            height: 40px;
            border-radius: 5px;
          }
          .movie-type-selected {
            background-color: $success !important;
            &:hover {
              background-color: rgba($success, 0.8) !important;
            }
          }
        }
      }
    }
    .sign-up-form-container-hide {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>
