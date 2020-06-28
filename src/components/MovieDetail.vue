<template>
  <div class="movie-detail">
    <BaseCard class="movie-detail-card"
              :style="{backgroundImage: 'url(http://127.0.0.1:5000/handle_image/?image_url=' + movie.image + ')'}">
      <div class="movie-detail-card-tmp"></div>
      <BaseButton class="movie-detail-card-close-button" @click.native="close">
        <font-awesome-icon prefix="fas" icon="times"></font-awesome-icon>
      </BaseButton>
      <div class="movie-detail-card-moviename">
        <span>{{movie.moviename}}</span>
      </div>
      <ul class="movie-detail-card-baseinfo">
        <li>
          <span>{{movie.averating}}</span>
          <MovieStar width="400px" height="30px" star-width="30px" star-margin-left="10px"></MovieStar>
        </li>
        <li>
          <span><font-awesome-icon prefix="far" icon="calendar"></font-awesome-icon>{{movie.date_published}}</span>
          <span><font-awesome-icon prefix="far" icon="globe-asia"></font-awesome-icon>
            <i v-for="(regin, index) in movie.region" :key="index">{{regin}}
              <i v-if="index <= movie.region.length - 2">/ </i>
            </i>
          </span>
          <span><font-awesome-icon prefix="far" icon="language"></font-awesome-icon>
            <i v-for="(language, index) in movie.language" :key="index">{{language}}
              <i v-if="index <= movie.language.length - 2">/ </i>
            </i>
          </span>
        </li>
        <li>
          <span><font-awesome-icon prefix="fas" icon="user"></font-awesome-icon>
            <i v-for="(director, index) in movie.directors" :key="index">{{director}}
              <i v-if="index <= movie.directors.length - 2">/ </i>
            </i>
          </span>
        </li>
        <li>
          <div><font-awesome-icon prefix="fas" icon="users"></font-awesome-icon>
            <i v-for="(leadactor, index) in movie.leadactors" :key="index">{{leadactor}}
              <i v-if="index <= movie.leadactors.length - 2">/ </i>
            </i>
          </div>
        </li>
        <li>
          <span><font-awesome-icon prefix="fas" icon="tags"></font-awesome-icon>
            <i v-for="(type, index) in movie.types" :key="index">{{type}}
              <i v-if="index <= movie.types.length - 2">/ </i>
            </i>
          </span>
        </li>
        <li>
          <span><font-awesome-icon prefix="fas" icon="info-circle"></font-awesome-icon>{{movie.description}}</span>
        </li>
      </ul>
      <ul class="movie-detail-card-moviecomments">
        <li v-for="(comment, index) in movie.comments" :key="index">
          <span><font-awesome-icon prefix="fas" icon="comment-dots"></font-awesome-icon>{{comment}}</span>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>

<script>
  import BaseCard from "./BaseCard";
  import BaseButton from "./BaseButton";
  import MovieStar from "./MovieStar";
  import TimelineLite from "gsap";
  export default {
    name: "MovieDetail",
    components: {MovieStar, BaseButton, BaseCard},
    data() {
      return {
        movie: {image: ''},
      }
    },
    mounted() {
      this.$EventBus.$on("updateMovieInfo", (movie) => {
        this.movie = movie;
        this.initMovie();
        this.calcStarWidth(400, 30, 10);
      });
    },
    methods: {
      initMovie() {
        try {
          this.movie.region = this.movie.region.split('@_@');
          this.movie.language = this.movie.language.split('@_@');
          this.movie.directors = this.movie.directors.split('@_@');
          this.movie.leadactors = this.movie.leadactors.split('@_@');
          this.movie.types = this.movie.types.split('@_@');
          this.movie.comments = this.movie.comments.split('@_@');
        } catch (e) {
          e;
        }
      },
      calcStarWidth(totalWidth, starWidth, starMargin) {
        let tmpMovieRating = String(this.movie.averating)
        let width = Number(tmpMovieRating.split('.')[0]) * (starWidth + starMargin) + starMargin + starWidth * Number('0.' + tmpMovieRating.split('.')[1]);
        this.$el.getElementsByClassName('movie-star-container-1')[0].style.clipPath = 'inset(0 '+(totalWidth - width)+'px 0 0)';
      },
      close() {
        TimelineLite.to('.movie-detail-card', {duration: 0.3, opacity: 0, pointerEvents: 'none'});
        TimelineLite.to('.movie-detail', {duration: 0.3, width: 0, height: 0, top: '50vh', left: '50vw', opacity: 0, delay: 0.3, pointerEvents: 'none'});
      }
    }
  }
</script>

<style scoped lang="scss">
  .movie-detail {
    position: fixed;
    top: 50vh;
    left: 50vw;
    width: 0;
    height: 0;
    opacity: 0;
    background-color: rgba($background, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    .movie-detail-card {
      position: relative;
      width: 70vw;
      height: 70vh;
      opacity: 0;
      pointer-events: none;
      background: center no-repeat;
      background-size: cover;
      .movie-detail-card-tmp {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($card-background, 0.8);
        border-radius: 10px;
      }
      .movie-detail-card-close-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        border-radius: 0 10px 0 50px;
        svg {
          width: 25px;
          height: 25px;
          position: absolute;
          top: 8px;
          right: 8px;
          path {
            color: $card-primary-text;
          }
        }
        z-index: 2;
      }
      .movie-detail-card-moviename {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100px;
        padding: 0 20px 0 20px;
        z-index: 1;
        display: flex;
        justify-content: right;
        align-items: center;
        span {
          line-height: 100px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          font: bold 60px Roboto;
        }
      }
      ul {
        position: absolute;
        top: 100px;
        bottom: 0;
        left: 0;
        width: 50%;
        padding: 0 10px 20px 20px;
        display: flex;
        flex-direction: column;
        li {
          position: relative;
          height: 40px;
          width: 100%;
          list-style: none;
          display: flex;
          justify-content: right;
          align-items: center;
          margin-bottom: 10px;
          font: 16px Roboto;
          span, div {
            line-height: 30px;
            margin-right: 10px;
            svg {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
            i {
              font-style: normal;
            }
          }
        }
      }
      .movie-detail-card-moviecomments {
        left: unset;
        right: 0;
        padding: 0 20px 20px 10px;
      }
    }
    .movie-detail-card-baseinfo {
      li:nth-child(1) {
        display: flex;
        justify-content: right;
        align-items: center;
        span {
          width: 70px;
          height: 40px;
          border-radius: 10px;
          border: 2px solid $card-primary-text;
          display: flex;
          justify-content: center;
          align-items: center;
          font: bolder 18px Roboto;
        }
        .movie-star {
          position: relative;
        }
      }
      li:nth-child(3),
      li:nth-child(4),
      li:nth-child(5) {
        height: 90px !important;
        div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      li:nth-child(3),
      li:nth-child(5) {
        height: 40px !important;
        div {
          -webkit-line-clamp: 1;
        }
      }
      li:nth-child(6) {
        height: 280px !important;
        span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 9;
          overflow: hidden;
        }
      }
    }
    .movie-detail-card-moviecomments {
      li {
        height: 90px !important;
        span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
</style>
