<template>
  <li class="movie-card">
    <div class="movie-card-image card"
         :style="{backgroundImage: 'url(' + movie.movieImage + ')', height: ratinged ? '405px' : '370px'}"
         @click="showMovieDetailCard()"
         @mouseover="showMovieName(true)"
         @mouseleave="showMovieName(false)">
      <div class="movie-card-movie-name">
        <span>{{movie.movieName}}</span>
      </div>
    </div>
    <div class="movie-card-rating">{{movie.movieAverating}}</div>
    <div class="movie-card-star" v-if="!ratinged">
      <font-awesome-icon prefix="fas" icon="star" v-for="index in 10" :key="index"
                         @mouseover="mouseoverStar('mouseover', index)"
                         @mouseleave="mouseoverStar('mouseleave', index)"
                         @click="mouseoverStar('click', index)"></font-awesome-icon>
    </div>
  </li>
</template>

<script>
  import TimelineLite from "gsap";
  import MovieStar from "./MovieStar";

  export default {
    name: "MovieCard",
    components: {MovieStar},
    props: {
      movie: {},
      ratinged: Boolean
    },
    data() {
      return {
        bg_left: 'background-image: url("',
        bg_right: '")',
      }
    },
    mounted() {

    },
    methods: {
      showMovieDetailCard() {
        this.$EventBus.$emit("updateMovieInfo", this.movie);
        TimelineLite.to('.movie-detail-card', {duration: 0.5, width: '100vw', height: '100vh', top: 0, left: 0, opacity: 1, pointerEvents: 'auto'});
        TimelineLite.to('.movie-detail-card-container', {duration: 0.5, opacity: 1, delay: 0.5, pointerEvents: 'auto'});
      },
      showMovieName(flag) {
        TimelineLite.to(this.$el.getElementsByClassName('movie-card-movie-name')[0], {duration: 0.5, opacity: flag === true ? 1 : 0});
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
          this.movie.movieRating = index;
          this.$EventBus.$emit('addRatingedMovie', this.movie);
        }
        this.drawStar();
      },
      drawStar() {
        let star = this.$el.getElementsByClassName('movie-card-star')[0].getElementsByTagName('path');
        for (let i = 0; i < this.movie.movieRating; i++)
          star[i].style.color = '#FBAF00';
      }
    }
  }
</script>

<style scoped lang="scss">
 .movie-card {
   position: relative;
   width: 260px;
   height: 405px;
   margin-right: 40px;
   flex: none;
   .movie-card-image {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 370px;
     transition: all .3s;
     background-repeat: no-repeat;
     background-position: center;
     background-size: cover;
     cursor: pointer;
     .movie-card-movie-name {
       position: absolute;
       left: 0;
       right: 0;
       bottom: 0;
       height: 40px;
       display: flex;
       justify-content: right;
       align-items: center;
       font: bold 20px Roboto;
       padding: 0 10px 0 10px;
       opacity: 0;
       border-radius: 0 0 5px 5px;
       &::after {
         position: absolute;
         content: "";
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         background-color: rgba(0, 0, 0, 0.7);
         z-index: 1;
         border-radius: 0 0 5px 5px;
       }
       span {
         z-index: 2;
       }
     }
   }
   .movie-card-rating {
     position: absolute;
     top: 20px;
     right: 0;
     width: 60px;
     height: 40px;
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
     top: 375px;
     left: 0;
     width: 260px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     svg {
       width: 20px;
       height: 20px;
       cursor: pointer;
       path {
         transition: all 0.3s;
         color: $card-sub-text;
       }
     }
   }
   .movie-star-small {
     position: absolute;
     top: 375px;
     width: 260px;
   }
 }
</style>
