<template>
  <div class="sign-up hide">
    <button class="switch-button base-button" @click="showSignIn">
      <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon>
    </button>
    <div class="side-bar">
      <div class="side-bar-logo">
        <span
        ><font-awesome-icon prefix="fax" icon="film"></font-awesome-icon>
          ZZZWT</span
        >
      </div>
      <div class="side-bar-info">
        <div class="step selected" @click="gotoPage(0)">
          <font-awesome-icon prefix="fax" icon="bullseye"></font-awesome-icon>
          第 一 步
        </div>
        <div class="step" @click="gotoPage(1)">
          <font-awesome-icon prefix="fax" icon="bullseye"></font-awesome-icon>
          第 二 步
        </div>
        <div class="step" @click="gotoPage(2)">
          <font-awesome-icon prefix="fax" icon="bullseye"></font-awesome-icon>
          第 三 步
        </div>
      </div>
      <div class="side-bar-image">
        <img
                src="../../assets/images/sign-up.gif"
                width="100%"
                alt="side-bar-image"
        />
      </div>
    </div>
    <div class="page">
      <div class="page-content-title"><h1>第 一 步</h1></div>
      <div class="page-content-form">
        <TextInput title="账 号" type="text" class-name="sign-up-username" />
        <TextInput title="密 码" type="password" class-name="sign-up-password" />
        <TextInput title="重 新 输 入 密 码" type="password" class-name="sign-up-confirm-password" />
        <div class="page-content-form-item">
          <button class="prev-page-button base-button disable-button" @click="prevPage()">上 一 步</button>
          <button class="next-page-button base-button" @click="nextPage()">下 一 步</button>
        </div>
      </div>
    </div>
    <div class="page hide">
      <div class="page-content-title"><h1>第 二 步</h1></div>
      <div class="page-content-form">
        <div class="page-content-form-item">请选择你喜欢的电影类型（可以选择多个）</div>
        <div class="movie-type-list">
          <div class="movie-type base-button" v-for="(movieType, index) in movieTypeList" :key="index" @click="selectMovieType(index, movieType)">{{movieType}}</div>
        </div>
        <div class="page-content-form-item">
          <button class="prev-page-button base-button" @click="prevPage()">上 一 步</button>
          <button class="next-page-button base-button" @click="nextPage()">下 一 步</button>
        </div>
      </div>
    </div>
    <div class="page hide">
      <div class="page-content-title"><h1>第 三 步</h1></div>
      <div class="page-content-form">
        <div class="page-content-form-item">请确认所有信息填写正确</div>
        <TextInput type="text" class-name="sign-up-age" title="年 龄"></TextInput>
        <SelectInput class-name="sign-up-country" :option-list="movieZoneList" title="地区"></SelectInput>
        <div class="page-content-form-item">
          <button class="sign-up-button base-button" @click="signUp()">注 册</button>
        </div>
        <div class="page-content-form-item">
          <button class="prev-page-button base-button" @click="prevPage()">上 一 步</button>
          <button class="next-page-button base-button disable-button" @click="nextPage()">下 一 步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
export default {
  name: "SignUp",
  components: {SelectInput, TextInput},
  data() {
    return {
      currentPage: 0,
      username: "",
      password: "",
      confirmPassword: "",
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
      selectedMovieTypeList: []
    };
  },
  methods: {
    showSignIn() {
      let signInDiv = document.getElementsByClassName("sign-in")[0];
      let signUpDiv = document.getElementsByClassName("sign-up")[0];
      signUpDiv.classList.add("hide");
      signInDiv.classList.remove("hide");
    },
    signUp() {
      let signUpDiv = document.getElementsByClassName("sign-up")[0];
      signUpDiv.classList.add("big");
      signUpDiv.addEventListener("transitionend", () => {
        let sideBar = document.getElementsByClassName("side-bar")[1];
        sideBar.classList.add("small");
      });
    },
    prevPage() {
      if (this.currentPage !== 0) this.gotoPage(this.currentPage - 1);
    },
    nextPage() {
      if (this.currentPage !== 2) this.gotoPage(this.currentPage + 1);
    },
    gotoPage(index) {
      this.currentPage = index;
      this.username = document.getElementsByClassName(
        "sign-up-username"
      )[0].value;
      this.password = document.getElementsByClassName(
        "sign-up-password"
      )[0].value;
      this.confirmPassword = document.getElementsByClassName(
        "sign-up-confirm-password"
      )[0].value;
      console.log(this.username, this.password, this.confirmPassword);
      let stepDivList = document.getElementsByClassName("step");
      let pageDivList = document.getElementsByClassName("page");
      for (let i = 0; i < stepDivList.length; i++) {
        stepDivList[i].classList.remove("selected");
        pageDivList[i].classList.add("hide");
      }
      stepDivList[index].classList.add("selected");
      pageDivList[index].classList.remove("hide");
      if (this.password !== this.confirmPassword)
        stepDivList[0].classList.add("errored");
      else stepDivList[0].classList.remove("errored");
    },
    selectMovieType(index, movieType) {
      if (this.selectedMovieTypeList.indexOf(movieType) === -1) {
        this.selectedMovieTypeList.push(movieType);
        document.getElementsByClassName("movie-type")[index].classList.add("selected-button");
        console.log(document.getElementsByClassName("movie-type")[index]);
      } else {
        this.selectedMovieTypeList.splice(
          this.selectedMovieTypeList.indexOf(movieType),
          1
        );
        document.getElementsByClassName("movie-type")[index].classList.remove("selected-button");
        console.log(document.getElementsByClassName("movie-type")[index]);
      }
      console.log(this.selectedMovieTypeList);
    }
  }
};
</script>

<style lang="scss">
.sign-up {
  .side-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 35%;
    background-color: $background-w;
    border-radius: 5px 0 0 5px;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    .side-bar-logo {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      padding: 10px 20px 10px 20px;
      display: flex;
      justify-content: left;
      align-items: center;
      span {
        font: bolder 22px Roboto;
        color: $primary;
        svg > path {
          color: $primary;
        }
      }
    }
    .side-bar-info {
      position: absolute;
      left: 0;
      width: 100%;
      padding: 10px 20px 10px 20px;
      top: 60px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      .step {
        width: 100%;
        height: 60px;
        font: bold 20px Roboto;
        color: $primary-text;
        cursor: pointer;
        transition: all 0.3s;
        svg > path {
          color: $primary-text;
        }
      }
      .selected {
        color: $primary;
        svg > path {
          color: $primary;
        }
      }
      .errored {
        color: $danger;
        svg > path {
          color: $danger;
        }
      }
    }
    .side-bar-image {
      position: absolute;
      left: 0;
      width: 100%;
      padding: 10px 20px 10px 20px;
      top: unset;
      height: unset;
      bottom: 0;
    }
  }
  .page {
    position: absolute;
    top: 0;
    left: 35%;
    height: 100%;
    width: 65%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    padding: 50px 0 50px 0;
    .page-content-title {
      position: relative;
      width: 60%;
      height: 60px;
      h1 {
        font: bolder 40px Roboto;
      }
    }
    .page-content-form {
      position: relative;
      width: 60%;
      height: 350px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      .movie-type-list {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .movie-type {
          position: relative;
          width: 70px;
          height: 40px;
          border-radius: 5px;
        }
        .selected-button {
          background-color: $success !important;
          &:hover {
            background-color: rgba($success, 0.8) !important;
          }
        }
      }
      .page-content-form-item {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        align-items: center;
        .sign-up-button {
          width: 100%;
          height: 50px;
          border-radius: 5px;
          font: bold 20px Roboto;
        }
        .prev-page-button,
        .next-page-button {
          width: 120px;
          height: 50px;
          border-radius: 5px;
          font: bold 16px Roboto;
        }
        .disable-button {
          pointer-events: none;
          opacity: 0;
        }
      }
    }
  }
}
</style>
