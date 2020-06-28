<template>
  <div class="movie-detail-card">
    <div class="movie-detail-card-container card" :style="bg_left + movie.movieImage + bg_right">
      <div class="movie-detail-card-container-tmp"></div>
      <div class="movie-detail-card-close-button base-button" @click="close">
        <font-awesome-icon prefix="fab" icon="times"></font-awesome-icon>
      </div>
      <div class="movie-detail-card-movie-name">{{movie.movieName}}</div>
      <div class="movie-basic-info">
        <MovieStar class="movie-basic-info-item" size="normal">
          <div class="movie-rating">{{movie.movieAverating}}</div>
        </MovieStar>
        <div class="movie-basic-info-item">
          <span><font-awesome-icon prefix="far" icon="calendar"></font-awesome-icon> {{movie.movieReleaseDate}}</span>
          <span><font-awesome-icon prefix="fas" icon="clock"></font-awesome-icon> {{movie.movieDuration}}</span>
          <span><font-awesome-icon prefix="fas" icon="globe-asia"></font-awesome-icon> {{movie.movieZone}}</span>
          <span><font-awesome-icon prefix="fas" icon="language"></font-awesome-icon> {{movie.movieLanguage}}</span>
        </div>
        <div class="movie-basic-info-item">
          <span><font-awesome-icon prefix="fas" icon="user"></font-awesome-icon> {{movie.movieDirectors}}</span>
        </div>
        <div class="movie-basic-info-item">
          <span><font-awesome-icon prefix="fas" icon="users"></font-awesome-icon>
            <span v-for="(actor, index) in movie.movieLeadactors" :key="index">
              {{actor}}<span v-if="index <= movie.movieLeadactors.length - 2"> / </span>
            </span>
          </span>
        </div>
        <div class="movie-basic-info-item">
          <span><font-awesome-icon prefix="fas" icon="tags"></font-awesome-icon>
            <span v-for="(type, index) in movie.movieTypes" :key="index">
              {{type}}<span v-if="index <= movie.movieTypes.length - 2"> / </span>
            </span>
          </span>
        </div>
        <div class="movie-basic-info-item">
          <span><font-awesome-icon prefix="fas" icon="info-circle"></font-awesome-icon> {{movie.movieDescription}}</span>
        </div>
      </div>
      <div class="movie-comment-list">
        <div class="movie-comment-list-item" v-for="(comment, index) in movie.movieComments" :key="index">
          <font-awesome-icon prefix="fas" icon="comment-dots"></font-awesome-icon> {{comment}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import MovieStar from "./MovieStar";

  export default {
    name: "MovieDetailCard",
    components: {MovieStar},
    data() {
      return {
        bg_left: 'background-image: url("',
        bg_right: '")',
        movie: {}
      }
    },
    mounted() {
      this.updateMovieInfo();
    },
    methods: {
      updateMovieInfo() {
        this.$EventBus.$on("updateMovieInfo", (movie) => {
          this.movie = movie;
          let tmpMovieRating = String(movie.movieAverating)
          tmpMovieRating.split('.');
          let width = Number(tmpMovieRating.split('.')[0]) * 30 + 10 + 20 * Number('0.' + tmpMovieRating.split('.')[1]);
          document.getElementsByClassName('movie-star-container-1')[0]
                  .style.clipPath = 'inset(0 '+(300 - width)+'px 0 0)';
        });
      },
      close() {
        TimelineLite.to('.movie-detail-card-container', {duration: 0.5, opacity: 0, pointerEvents: 'none'});
        TimelineLite.to('.movie-detail-card', {duration: 0.5, width: 0, height: 0, top: '50vh', left: '50vw', opacity: 0, delay: 0.5, pointerEvents: 'none'});
      }
    }
  }
</script>

<style scoped lang="scss">
  .movie-detail-card {
    position: fixed;
    top: 50vh;
    left: 50vw;
    width: 0;
    height: 0;
    background-color: rgba($background, 0.8);
    opacity: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    .movie-detail-card-container {
      position: relative;
      width: 70%;
      height: 70%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      z-index: 1;
      opacity: 0;
      .movie-detail-card-container-tmp {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($card-background, 0.8);
        border-radius: 5px;
        z-index: 2;
      }
      .movie-detail-card-close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        z-index: 4;
      }
      .movie-detail-card-movie-name {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 150px;
        padding: 20px 40px 20px 40px;
        display: flex;
        justify-content: left;
        align-items: center;
        font: bold 60px Roboto;
        color: $card-primary-text;
        z-index: 3;
      }
      .movie-basic-info {
        position: absolute;
        top: 150px;
        bottom: 0;
        left: 0;
        right: 50%;
        z-index: 3;
        padding: 0 20px 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        .movie-basic-info-item {
          position: relative;
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: space-between;
          font: bold 16px Roboto;
          align-items: center;
          svg {
            width: 20px;
            margin-right: 10px;
          }
          line-height: 30px;
        }
        .movie-basic-info-item:first-child {
          display: unset;
        }
        .movie-basic-info-item:nth-child(4) {
          height: 60px;
        }
        .movie-basic-info-item:nth-child(6) {
          height: calc(100% - 230px);
          align-items: unset;
        }
        .movie-star {
          .movie-rating {
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 30px;
            font: bold 16px Roboto;
            border: 2px solid $card-primary-text;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .movie-comment-list {
        position: absolute;
        top: 150px;
        bottom: 0;
        left: 50%;
        right: 0;
        z-index: 3;
        padding: 0 40px 20px 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        .movie-comment-list-item {
          margin-bottom: 20px;
          position: relative;
          width: 100%;
          height: auto;
          font: bold 16px Roboto;
          svg {
            width: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
