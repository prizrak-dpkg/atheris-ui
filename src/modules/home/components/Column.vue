<template>
  <div class="column__grid">
    <div class="column__section">
      <slot></slot>
    </div>
    <div class="column__section">
      <img
        class="column__banner"
        :src="props.banner"
        alt=""
        @dragstart.prevent=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "HomeColumn",
  props: {
    banner: {
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
.column {
  &__grid {
    @include grid(10px 50px, row, min-content, 500px, 1fr, center, center);
  }

  &__section {
    display: grid;
    font-size: 12px;
    padding: 25px;
    width: 100%;
  }

  &__banner {
    margin: auto;
    height: auto;
    max-height: 520px;
    max-width: 100%;
    user-select: none;
  }
}
</style>
