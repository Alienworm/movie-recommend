<template>
  <div :class="size === 'small' ? 'movie-star-small' : 'movie-star'">
    <div class="movie-star-container movie-star-container-1">
      <font-awesome-icon prefix="fas" icon="star" v-for="index in 10" :key="index"></font-awesome-icon>
    </div>
    <div class="movie-star-container movie-star-container-2">
      <font-awesome-icon prefix="fas" icon="star" v-for="index in 10" :key="index"></font-awesome-icon>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "MovieStar",
    props: {
      size: String
    }
  }
</script>

<style scoped lang="scss">
  .movie-star,
  .movie-star-small {
    height: 30px;
    .movie-star-container {
      position: absolute;
      top: 0;
      left: 50px;
      width: 300px;
      height: 100%;
      line-height: 30px;
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
        color: $card-sub-text;
      }
    }
  }
  .movie-star-small {
    .movie-star-container {
      left: -3px;
      width: 100%;
      svg {
        margin-left: 6px;
      }
    }
  }
</style>
