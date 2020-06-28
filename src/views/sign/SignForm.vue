<template>
  <div class="sign-form">
    <h1 class="sign-form-title">{{title}}</h1>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "SignForm",
    props: {
      title: String
    },
  }
</script>

<style scoped lang="scss">
  .sign-form {
    position: absolute;
    top: 0;
    left: 35%;
    width: 65%;
    height: 100%;
    padding: 70px 140px 70px 140px;
    transition: all .3s;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .sign-form-title {
      position: relative;
      width: 100%;
      height: 60px;
      font: bolder 40px Roboto;
    }
    form {
      position: relative;
      width: 100%;
      height: calc(100% - 60px);
      .item {
        width: 100%;
        height: 40px;
        margin: 40px 0 40px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button {
        width: 100%;
        height: 40px;
        margin: 40px 0 40px 0;
      }
      .text-input {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        font: 20px Roboto;
        margin: 20px 0 20px 0;
        input,
        select {
          outline: none;
          border: none;
          text-decoration: none;
          width: 100%;
          height: 40px;
          padding: 0 20px 0 20px;
          font: bold 18px Roboto;
          border-radius: 5px;
          background-color: $card-primary-text;
          transition: all 0.3s;
          color: $card-background;
        }
      }
      input[type="checkbox"] {
        margin-right: 10px;
        -webkit-appearance: none;
        vertical-align: middle;
        margin-top: 0;
        background: $card-primary-text;
        border-radius: 5px;
        min-height: 20px;
        min-width: 20px;
        outline: none;
        border: none;
        transition: all 0.3s;
        cursor: pointer;
      }
      input[type="checkbox"]:checked {
        background: $highlight;
      }
    }
  }

</style>
