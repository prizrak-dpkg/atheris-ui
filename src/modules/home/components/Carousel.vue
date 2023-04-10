<template>
  <Carousel :wrap-around="true">
    <Slide v-for="slide in slides" :key="slide.title">
      <div class="carousel__item">
        <HomeSlide
          :title="slide.title"
          :desc="slide.desc"
          :banner="slide.banner"
          :link-desc="slide.link.desc"
          :link-to="slide.link.to"
          :info-class-icon="slide.slideInfo.classIcon"
          :info-title="slide.slideInfo.title"
          :info-desc="slide.slideInfo.desc"
          :specifications="slide.slideInfo.specifications"
        />
      </div>
    </Slide>
    <template #addons>
      <Pagination class="carousel__top-pagination" />
    </template>
  </Carousel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import HomeSlide, { SlideInterface } from "@/modules/home/components/Slide.vue";

export default defineComponent({
  name: "HomeCarousel",
  components: {
    Carousel,
    Slide,
    Pagination,
    HomeSlide,
  },
  props: {
    slides: {
      type: Object as () => SlideInterface[],
      required: true,
    },
  },
});
</script>

<style lang="scss">
$color-palette: (
  first: var(--colors-first),
  second: var(--colors-second),
  third: var(--colors-third),
  fourth: var(--colors-fourth),
  sixth: var(--colors-sixth),
);
.carousel {
  user-select: none;

  &__item {
    background-color: map-get($map: $color-palette, $key: sixth);
    border-radius: 8px;
    font-size: 20px;
    margin: 0px auto;
    min-height: 200px;
    width: 100%;
  }

  &__top-pagination {
    left: 50%;
    position: absolute;
    top: -25px;
    transform: translateX(-50%);
  }

  &__slide {
    align-items: flex-start;
    padding: 10px;
  }

  &__prev,
  &__next {
    border: 5px solid white;
    box-sizing: content-box;
  }

  &__pagination-button {
    &::after {
      background-color: map-get($map: $color-palette, $key: first);
      border-radius: 50%;
      height: 10px;
      width: 10px;
    }

    &:hover::after {
      background-color: map-get($map: $color-palette, $key: third);
    }
  }

  &__pagination-button--active::after {
    background-color: map-get($map: $color-palette, $key: second);
  }
}
</style>
