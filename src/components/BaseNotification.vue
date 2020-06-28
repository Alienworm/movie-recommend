<template>
  <BaseCard class="base-notification">
    <BaseButton class="base-notification-close-button" @click.native="close">
      <font-awesome-icon prefix="fas" icon="times"></font-awesome-icon>
    </BaseButton>
    <span v-show="type === 'success'">
      <font-awesome-icon class="success-icon" prefix="fas" icon="check-circle"></font-awesome-icon> 成功
    </span>
    <span v-show="type === 'waring'">
      <font-awesome-icon class="waring-icon" prefix="fas" icon="info-circle"></font-awesome-icon> 警告
    </span>
    <span v-show="type === 'error'">
      <font-awesome-icon class="error-icon" prefix="fas" icon="times-circle"></font-awesome-icon> 错误
    </span>
    <div class="base-notification-info">
      {{message}}
    </div>
  </BaseCard>
</template>

<script>
  import BaseCard from "./BaseCard";
  import BaseButton from "./BaseButton";
  import TimelineLite from "gsap";
  export default {
    name: "BaseNotification",
    components: {BaseButton, BaseCard},
    data() {
      return {
        type: 'none',
        message: '',
        iconColor: {success: '#2A9D8F', waring: '#FBAF00', error: '#ee2b47'}
      }
    },
    mounted() {
      this.$EventBus.$on('alertMessage', (data) => {
        this.type = data.type;
        this.message = data.message;
        this.$el.getElementsByClassName(this.type + '-icon')[0]
          .getElementsByTagName('path')[0].style.color = this.iconColor[this.type];
        TimelineLite.to('.base-notification', {duration: 0.3, right: '10px', opacity: 1});
        TimelineLite.to('.base-notification', {duration: 0.3, right: '-300px', opacity: 0, delay: 3});
      })
    },
    methods: {
      close() {
        TimelineLite.to('.base-notification', {duration: 0.3, right: '-300px', opacity: 0});
      }
    }
  }
</script>

<style scoped lang="scss">
  .base-notification {
    position: fixed;
    top: 10px;
    right: -300px;
    width: 300px;
    min-height: 120px;
    opacity: 0;
    background-color: #f7f7f7;
    .base-notification-close-button {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      border-radius: 0 10px 0 40px;
      z-index: 2;
      svg {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 5px;
        right: 5px;
        path {
          color: $card-primary-text;
        }
      }
    }
    span {
      position: absolute;
      top: 0;
      left: 10px;
      right: 10px;
      height: 50px;
      color: #2c2c3c;
      font: bold 20px Roboto;
      display: flex;
      justify-content: right;
      align-items: center;
      svg {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }
    .base-notification-info {
      position: absolute;
      top: 50px;
      bottom: 10px;
      left: 50px;
      right: 10px;
      display: flex;
      justify-content: right;
      align-items: center;
      font: bold 20px Roboto;
      color: #2c2c3c;
    }
  }
</style>
