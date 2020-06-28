<template>
  <div class="select-input">
    <span>{{ title }}</span>
    <label>
      <select :class="className">
        <option v-for="(value, index) in optionList" :key="index" :value="value">{{value}}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    title: String,
    className: String,
    optionList: Array
  }
};
</script>

<style lang="scss">
.select-input {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: left;
  flex-direction: column;
  span {
    font: 20px Roboto;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  select {
    outline: none;
    border: none;
    text-decoration: none;
    width: 100%;
    height: 40px;
    padding: 0 20px 0 20px;
    font: bold 18px Roboto;
    border-radius: 5px;
    background-color: $border-light;
    transition: all 0.3s;
    &:hover {
      background-color: $Placeholder;
    }
  }
}
</style>
