<template>
  <div class="image-slider" :style="{top: top, left: left, right: right, height: height}">
    <div class="image-slider-container image-slider-container-1 card"></div>
    <div class="image-slider-container image-slider-container-2 card"></div>
    <div class="image-slider-container image-slider-container-3 card"></div>
    <div class="image-slider-container image-slider-container-4 card"></div>
    <div class="image-slider-container image-slider-container-5 card"></div>
    <div class="image-slider-prev-button" @click="prevImage()">
      <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
    </div>
    <div class="image-slider-next-button" @click="nextImage">
      <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImageSlider",
    props: {
      top: String,
      left: String,
      right: String,
      height: String
    },
    data() {
      return {
        imageList: [
          'url(' + require('../assets/images/poster-1.jpeg') + ')',
          'url(' + require('../assets/images/poster-2.jpeg') + ')',
          'url(' + require('../assets/images/poster-3.jpeg') + ')',
          'url(' + require('../assets/images/poster-4.jpeg') + ')',
          'url(' + require('../assets/images/poster-5.jpeg') + ')'
        ],
        currentImage: 2
      }
    },
    methods: {
      nextImage() {
        this.currentImage += 1;
        if (this.currentImage === this.imageList.length)
          this.currentImage = 0;
        this.slideImage();
      },
      prevImage() {
        this.currentImage -= 1;
        if (this.currentImage === -1)
          this.currentImage = this.imageList.length - 1;
        this.slideImage();
      },
      slideImage() {
        let imageSliderDiv = document.getElementsByClassName('image-slider-container');
        if (this.currentImage - 2 < 0)
          imageSliderDiv[0].style.backgroundImage = this.imageList[this.currentImage + 5 - 2];
        else
          imageSliderDiv[0].style.backgroundImage = this.imageList[this.currentImage - 2];
        if (this.currentImage - 1 < 0)
          imageSliderDiv[1].style.backgroundImage = this.imageList[this.currentImage + 5 - 1];
        else
          imageSliderDiv[1].style.backgroundImage = this.imageList[this.currentImage - 1];
        imageSliderDiv[2].style.backgroundImage = this.imageList[this.currentImage];
        if (this.currentImage + 1 > 4)
          imageSliderDiv[3].style.backgroundImage = this.imageList[this.currentImage - 4];
        else
          imageSliderDiv[3].style.backgroundImage = this.imageList[this.currentImage + 1];
        if (this.currentImage + 2 > 4)
          imageSliderDiv[4].style.backgroundImage = this.imageList[this.currentImage - 4 + 1];
        else
          imageSliderDiv[4].style.backgroundImage = this.imageList[this.currentImage + 2];
      }
    }
  }
</script>

<style lang="scss">
  .image-slider {
    position: absolute;
    .image-slider-prev-button,
    .image-slider-next-button {
      position: absolute;
      top: calc((100% - 30px) / 2);
      left: 5%;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 4;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      svg > path {
        color: $background-w;
      }
    }
    .image-slider-next-button {
      left: unset;
      right: 5%;
    }
    .image-slider-container {
      position: absolute;
      transition: all .3s;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    .image-slider-container-1,
    .image-slider-container-5 {
      top: 20%;
      bottom: 20%;
      width: 36%;
      left: 0;
      z-index: 1;
      background-image: url("../assets/images/poster-1.jpeg");
    }
    .image-slider-container-2,
    .image-slider-container-4 {
      top: 10%;
      bottom: 10%;
      width: 48%;
      left: 10%;
      z-index: 2;
      background-image: url("../assets/images/poster-2.jpeg");
    }
    .image-slider-container-3 {
      top: 0;
      bottom: 0;
      width: 60%;
      left: 20%;
      z-index: 3;
      background-image: url("../assets/images/poster-3.jpeg");
    }
    .image-slider-container-4 {
      left: unset;
      right: 10%;
      background-image: url("../assets/images/poster-4.jpeg");
    }
    .image-slider-container-5 {
      left: unset;
      right: 0;
      background-image: url("../assets/images/poster-5.jpeg");
    }
  }
</style>
