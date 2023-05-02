<template>
  <div class="star">
    <i
      v-for="(value, index) in ratingComputed.value"
      :class="value"
      :key="index"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, getCurrentInstance } from "vue";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "HomeStar",
  emits: ["changeRating"],
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const instance = getCurrentInstance();
    const ratingComputed = computed(() => {
      const computedRatings = ref([] as string[]);
      const number = props.rating > 5 ? 5 : props.rating < 1 ? 1 : props.rating;
      const wholeNumberPart = Math.floor(number);
      const decimalPart = number % 1;
      for (let i = 0; i < wholeNumberPart; i++) {
        computedRatings.value.push("star__fill");
      }
      if (wholeNumberPart < 5) {
        if (decimalPart >= 0.5) {
          computedRatings.value.push("star__half");
        } else {
          computedRatings.value.push("star__empty");
        }
      }
      for (let i = computedRatings.value.length; i < 5; i++) {
        computedRatings.value.push("star__empty");
      }
      return computedRatings;
    });
    watch(ratingComputed, (newValue) => {
      instance?.emit("changeRating", newValue.value);
    });
    return {
      props,
      ratingComputed,
    };
  },
});
</script>

<style lang="scss" scoped>
$assets: (
  star: var(--assets-star),
  star-fill: var(--assets-star-fill),
  star-half: var(--assets-star-half),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 25px;
  width: 25px;
}
.star {
  column-gap: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 25px));
  min-width: 170px;
  place-items: center;

  &__empty {
    @include icon();
    background-image: map-get($map: $assets, $key: star);
    height: 20px;
    width: 20px;
  }

  &__fill {
    @include icon();
    background-image: map-get($map: $assets, $key: star-fill);
    height: 20px;
    width: 20px;
  }

  &__half {
    @include icon();
    background-image: map-get($map: $assets, $key: star-half);
    height: 20px;
    width: 20px;
  }
}
</style>
