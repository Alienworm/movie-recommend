<template>
  <div class="header">
    <Logo font-size="25px" height="60px"></Logo>
    <div class="header-button-list">
      <button class="header-sign-out base-button" @click="signOut">
        <font-awesome-icon prefix="fas" icon="sign-out-alt"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import Logo from "./Logo";

  export default {
    name: "Header",
    components: {Logo},
    data() {
      return {
        movieCount: 0,
      }
    },
    mounted() {
      this.initAnimation();
      this.$EventBus.$on('addRatingedMovie', (movie) => {
        let ratinedMovieList = JSON.parse(localStorage.getItem('ratinedMovieList'));
        ratinedMovieList = this.unique(ratinedMovieList, movie);
        this.movieCount = ratinedMovieList.length;
        localStorage.setItem('ratinedMovieList', JSON.stringify(ratinedMovieList));
      })
    },
    methods: {
      initAnimation() {
        TimelineLite.to('.header', {duration: 0.3, height: '60px', opacity: 1});
      },
      unique(ratinedMovieList, movie) {
        let tmp = [];
        let flag = true;
        for (let i = 0; i < ratinedMovieList.length; i++) {
          if (ratinedMovieList[i].movieId === movie.movieId) {
            tmp.push(movie);
            flag = false;
          }
          else tmp.push(ratinedMovieList[i]);
        }
        if (flag) tmp.push(movie);
        return tmp;
      },
      signOut() {
        localStorage.clear();
        this.$router.push('/sign-in');
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    opacity: 0;
    background-color: $card-background;
    box-shadow: $card-box-shadow-bottom;
    z-index: 5;
    .header-button-list {
      position: absolute;
      top: 0;
      right: 10px;
      height: 100%;
      display: flex;
      justify-content: right;
      align-items: center;
      button {
        position: relative;
        height: 40px;
        margin-left: 20px;
      }
    }
    .header-sign-out {
      width: 40px;
    }
  }
</style>
