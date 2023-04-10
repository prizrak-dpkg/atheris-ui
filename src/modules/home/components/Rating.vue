<template>
  <div class="rating">
    <i class="rating__chat"></i>
    <div class="rating__container">
      <p class="rating__comment">
        {{ opinion.comment }}
      </p>
      <div class="rating__footer">
        <HomeStart :rating="opinion.qual" @changeRating="getAverage" />
        <div class="rating__nav">
          <i @click="prev" class="rating__left-circle"></i>
          <i @click="next" class="rating__right-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from "vue";
import "vue3-carousel/dist/carousel.css";
import HomeStart from "./Star.vue";
import useRatings from "../composables/useRatings";

export interface RatingInterface {
  total: number;
  average: number;
  consecutive: number;
  comment: string;
  qual: number;
}

export default defineComponent({
  name: "ColumnSection",
  components: {
    HomeStart,
  },
  setup() {
    const instance = getCurrentInstance();
    const { loadData, rating } = useRatings();
    const total = computed(() => rating.value.total);
    const average = computed(() => rating.value.average);
    const current = computed(() => rating.value.consecutive);
    const opinion = computed(() => ({
      comment: rating.value.comment,
      qual: rating.value.qual,
    }));
    loadData();
    return {
      rating,
      opinion,
      next: async () => {
        if (total.value > 0) {
          if (current.value < total.value) {
            loadData(current.value + 1);
          } else if (current.value === total.value) {
            loadData();
          }
        }
      },
      prev: async () => {
        if (total.value > 0) {
          if (current.value > 1) {
            loadData(current.value - 1);
          } else if (current.value === 1) {
            loadData(total.value);
          }
        }
      },
      getAverage() {
        instance?.emit("changeAverage", {
          average: average.value,
          total: total.value,
        });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  fifth: var(--colors-fifth),
);
$assets: (
  chat: var(--assets-chat),
  left-circle: var(--assets-left-circle),
  right-circle: var(--assets-right-circle),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 25px;
  width: 25px;
}
@mixin grid(
  $gap,
  $autoflow,
  $autorows,
  $mincolumns,
  $maxcolumns,
  $aling,
  $justify
) {
  display: grid;
  gap: $gap;
  grid-auto-flow: $autoflow;
  grid-auto-rows: $autorows;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, $mincolumns), $maxcolumns)
  );
  place-items: $aling $justify;
}
.rating {
  margin-top: 32px;
  position: relative;
  width: 100%;

  &__chat {
    @include icon();
    position: absolute;
    right: 24px;
    top: 0px;
    background-image: map-get($map: $assets, $key: chat);
    height: 48px;
    width: 48px;
  }

  &__left-circle {
    @include icon();
    background-image: map-get($map: $assets, $key: left-circle);
    height: 32px;
    width: 32px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__right-circle {
    @include icon();
    background-image: map-get($map: $assets, $key: right-circle);
    height: 32px;
    width: 32px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__container {
    background: map-get($map: $color-palette, $key: fifth);
    border-radius: 16px;
    font-size: 18px;
    margin-top: 24px;
    padding: 24px;
  }

  &__comment {
    font-size: 0.8em;
    height: 80px;
    overflow-y: scroll;
  }

  &__footer {
    @include grid(12px, row, min-content, 195px, 1fr, center, center);
    margin-top: 12px;
  }

  &__nav {
    column-gap: 24px;
    display: grid;
    grid-template-columns: 48px 48px;
  }
}
</style>
