<template>
  <div class="sign-in">
    <button class="switch-button base-button" @click="showSignUP">
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
        <span>Movies</span>
        <p>
          Movies move us like nothing else can, whether they’re scary, funny,
          dramatic, romantic or anywhere in-between. So many titles, so much to
          experience.
        </p>
      </div>
      <div class="side-bar-image">
        <img
                src="../../assets/images/sign-in.gif"
                width="100%"
                alt="side-bar-image"
        />
      </div>
    </div>
    <div class="sign-in-content">
      <div class="sign-in-content-title">
        <h1>登 录</h1>
      </div>
      <div class="sign-in-content-form">
        <TextInput title="账 号" type="text" class-name="sign-in-username" />
        <TextInput title="密 码" type="password" class-name="sign-in-password" />
        <div class="sign-in-content-form-item">
          <button class="sign-in-button base-button" @click="signIn()">登 录</button>
        </div>
        <div class="sign-in-content-form-item">
          <label>
            <input type="checkbox" class="remember" @click="rememberMe()"/> 记 住 密 码
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "../../components/TextInput";
export default {
  name: "SignIn",
  components: { TextInput },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    start_loading(flag) {
      let loading = document.getElementById('loading');
      if (flag) loading.classList.remove('hide-loading');
      else loading.classList.add('hide-loading');
    },
    signIn() {
      this.username = document.getElementsByClassName("sign-in-username")[0].value;
      this.password = document.getElementsByClassName("sign-in-password")[0].value;
      this.$router.push("/home/index");
    },
    rememberMe() {
      if (localStorage.getItem("username") === null) {
        localStorage.setItem("username", document.getElementsByClassName("sign-in-username")[0].value);
        localStorage.setItem("password", document.getElementsByClassName("sign-in-password")[0].value);
      } else localStorage.clear();
    },
    showSignUP() {
      let signInDiv = document.getElementsByClassName("sign-in")[0];
      let signUpDiv = document.getElementsByClassName("sign-up")[0];
      signInDiv.classList.add("hide");
      signUpDiv.classList.remove("hide");
    }
  }
};
</script>

<style lang="scss">
.sign-in {
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
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      padding: 10px 20px 10px 20px;
    }
    .side-bar-logo {
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
      top: 60px;
      height: unset;
      display: flex;
      justify-content: center;
      flex-direction: column;
      span {
        font: bolder 35px Roboto;
        color: $primary;
      }
      p {
        font: 16px Roboto;
        color: $info;
      }
    }
    .side-bar-image {
      top: unset;
      height: unset;
      bottom: 0;
    }
  }
  .sign-in-content {
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
    .sign-in-content-title {
      position: relative;
      width: 60%;
      height: 60px;
      h1 {
        font: bolder 40px Roboto;
      }
    }
    .sign-in-content-form {
      position: relative;
      width: 60%;
      height: 380px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      .sign-in-content-form-item {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .sign-in-button {
          width: 100%;
          height: 50px;
          border-radius: 5px;
          font: bold 20px Roboto;
        }
        label {
          font: 16px Roboto;
        }
        input[type="checkbox"] {
          -webkit-appearance: none;
          vertical-align: middle;
          margin-top: 0;
          background: $border-light;
          border-radius: 5px;
          min-height: 25px;
          min-width: 25px;
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
      .sign-in-content-form-item:last-child {
        display: block;
      }
    }
  }
}
</style>
