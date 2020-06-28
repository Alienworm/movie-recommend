<template>
  <div class="base-input" @focusin="input(true)" @focusout="input(false)">
    <slot></slot>
  </div>
</template>

<script>
  import TimelineLite from "gsap";

  export default {
    name: "BaseInput",
    methods: {
      input(flag) {
        let span = this.$el.getElementsByTagName('span')[0];
        let input = this.$el.getElementsByTagName('input')[0];
        if (flag || input.value !== '') {
          TimelineLite.to(span, {duration: 0.2, fontSize: '10px', height: '20px', top: '5px'});
          TimelineLite.to(input, {duration: 0.2, fontSize: '18px', height: '30px', bottom: '0px'});
        }
        else {
          TimelineLite.to(span, {duration: 0.2, fontSize: '18px', height: '100%', top: '0'});
          TimelineLite.to(input, {duration: 0.2, fontSize: '18px', height: '100%', bottom: '0px'});
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .base-input {
    height: 50px;
    background-color: $card-primary-text;
    border-radius: 10px;
    box-shadow: $card-box-shadow-around;
    span {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 20px;
      right: 50px;
      height: 100%;
      font: bold 18px Roboto;
      color: $card-background;
      display: flex;
      justify-content: right;
      align-items: center;
      cursor: text;
    }
    input,
    select {
      z-index: 1;
      text-decoration: none;
      border: none;
      outline: none;
      position: absolute;
      bottom: 0;
      left: 20px;
      width: calc(100% - 70px);
      font: bold 18px Roboto;
      color: $card-background;
      background-color: $card-primary-text;
    }
    svg {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 20px;
      height: 20px;
      font-size: 18px;
      path {
        color: $card-background;
      }
    }
  }
</style>
