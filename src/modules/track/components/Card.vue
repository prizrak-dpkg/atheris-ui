<template>
  <div class="card__container">
    <h1 class="card__title">{{ props.title }}</h1>
    <p class="card__desc">{{ props.desc }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "HomeCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  second: var(--colors-second),
  fifth: var(--colors-fifth),
);
.card {
  &__container {
    position: relative;
    width: 100%;
  }

  &__title {
    color: map-get($map: $color-palette, $key: second);
    position: absolute;
    text-align: center;
    top: 5px;
    width: 100%;
  }

  &__desc {
    background: map-get($map: $color-palette, $key: fifth);
    border-radius: 16px;
    font-size: 1.2em;
    margin-top: 18px;
    padding: 16px;
    text-align: center;
    width: 100%;
  }
}
</style>
