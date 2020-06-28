<template>
  <div class="movie-star" :style="{width: width, height: height, paddingRight: 'calc(' + starMarginLeft + '/2)'}">
    <div class="movie-star-container movie-star-container-1" :style="{lineHeight: height}">
      <font-awesome-icon prefix="fas"
                         icon="star"
                         v-for="index in 10"
                         :key="index"
                         :style="{height: starWidth, width: starWidth, marginLeft: starMarginLeft}"></font-awesome-icon>
    </div>
    <div class="movie-star-container movie-star-container-2" :style="{lineHeight: height}">
      <font-awesome-icon prefix="fas"
                         icon="star"
                         v-for="index in 10"
                         :key="index"
                         :style="{height: starWidth, width: starWidth, marginLeft: starMarginLeft}"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MovieStar",
    props: {
      width: String,
      height: String,
      starWidth: String,
      starMarginLeft: String
    }
  }
</script>

<style scoped lang="scss">
  .movie-star {
    display: flex;
    justify-content: center;
    align-items: center;
    .movie-star-container {
      position: absolute;
      width: auto;
      height: 100%;
      svg {
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
    .movie-star-container-1 {
      z-index: 2;
      svg > path {
        color: $warning;
      }
    }
    .movie-star-container-2 {
      z-index: 1;
      svg > path {
        color: #bdbcbc;
      }
    }
  }
</style>
