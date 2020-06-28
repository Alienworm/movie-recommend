<template>
  <div class="text-input">
    <span>{{ title }}</span>
    <label>
      <input :type="type" :class="className" />
    </label>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    title: String,
    type: String,
    className: String
  }
};
</script>

<style lang="scss">
.text-input {
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
  input {
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
