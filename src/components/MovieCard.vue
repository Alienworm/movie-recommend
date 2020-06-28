<template>
  <div class="movie-card" :style="{width: cardWidth, height: cardHeight}">
    <BaseCard class="movie-card-image"
              :style="{height: rating ? 'calc(100% - 30px)' : '100%', backgroundImage: 'url(http://127.0.0.1:5000/handle_image/?image_url=' + movie.image + ')'}"
              @mouseover.native="showMovieName(true)"
              @mouseleave.native="showMovieName(false)"
              @click.native="showMovieDetail">
      <div class="movie-card-moviename" :style="{height: nameHeight, lineHeight: nameHeight, fontSize: nameFontSize}">
        <span>{{movie.moviename}}</span>
      </div>
    </BaseCard>
    <div class="movie-card-averating">{{movie.averating}}</div>
    <div class="movie-card-star" v-if="rating" :style="{width: '100%', height: starHeight}">
      <font-awesome-icon prefix="fas" icon="star" v-for="index in 10" :key="index"
                         @mouseover="mouseoverStar('mouseover', index)"
                         @mouseleave="mouseoverStar('mouseleave', index)"
                         @click="mouseoverStar('click', index)"
                         :style="{height: starWidth, width: starWidth}"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
  import BaseCard from "./BaseCard";
  import TimelineLite from "gsap";
  export default {
    name: "MovieCard",
    props: {
      cardWidth: String,
      cardHeight: String,
      nameHeight: String,
      nameFontSize: String,
      rating: Boolean,
      starHeight: String,
      starWidth: String,
      movie: {
        averating: Number,
        comments: String,
        date_published: String,
        description: String,
        directors: String,
        image: String,
        language: String,
        leadactors: String,
        movieid: Number,
        movielink: String,
        moviename: String,
        ratingnum: Number,
        region: String,
        types: String,
      }
    },
    components: {BaseCard},
    data() {
      return {
        userinfo: JSON.parse(localStorage.getItem('userinfo'))
      }
    },
    mounted() {
      this.drawStar();
    },
    methods: {
      showMovieName(flag) {
        TimelineLite.to(this.$el.getElementsByClassName('movie-card-moviename')[0], {duration: 0.5, opacity: flag === true ? 1 : 0});
      },
      showMovieDetail() {
        this.$EventBus.$emit("updateMovieInfo", this.movie);
        TimelineLite.to('.movie-detail', {duration: 0.3, width: '100vw', height: '100vh', top: 0, left: 0, opacity: 1, pointerEvents: 'auto'});
        TimelineLite.to('.movie-detail-card', {duration: 0.3, opacity: 1, delay: 0.3, pointerEvents: 'auto'});
      },
      async saveRating() {
        let data = {
          'userid': this.userinfo.userid,
          'movieid': this.movie.movieid,
          'rating': this.movie.rating
        };
        await this.$axios.post('/api/movie/save_user_rating', data);
      },
      mouseoverStar(flag, index) {
        let star = this.$el.getElementsByClassName('movie-card-star')[0].getElementsByTagName('path');
        for (let i = 0; i < 10; i++)
          star[i].style.color = '#909399';
        if (flag !== 'mouseleave') {
          for (let i = 0; i < index; i++)
            star[i].style.color = '#FBAF00';
        }
        if (flag === 'click') {
          this.movie.rating = index;
          this.saveRating();
        }
        this.drawStar();
      },
      drawStar() {
        let star = this.$el.getElementsByClassName('movie-card-star')[0].getElementsByTagName('path');
        for (let i = 0; i < this.movie.rating; i++)
          star[i].style.color = '#FBAF00';
      }
    }
  }
</script>

<style scoped lang="scss">
  .movie-card {
    .movie-card-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: all .3s;
      background: center no-repeat;
      background-size: cover;
      cursor: pointer;
      overflow: hidden;
      .movie-card-moviename {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 0 10px 0 10px;
        background-color: rgba(0, 0, 0, 0.7);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        border-radius: 0 0 10px 10px;
        font-weight: bold;
        font-family: Roboto, serif;
        opacity: 0;
      }
    }
    .movie-card-averating {
      position: absolute;
      top: 20px;
      right: 0;
      width: 50px;
      height: 30px;
      border-radius: 30px 0 0 30px;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      font: bold 18px Roboto;
      z-index: 2;
      color: $highlight;
    }
    .movie-card-star {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg > path {
        transition: all 0.3s;
        cursor: pointer;
        color: #909399;
      }
    }
  }
</style>
