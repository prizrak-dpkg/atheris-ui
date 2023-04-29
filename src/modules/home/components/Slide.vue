<template>
  <div class="slide__header">
    <p class="slide__content">{{ props.desc }}</p>
    <h2 class="slide__title slide__title--sub">{{ props.title }}</h2>
  </div>
  <div class="slide__grid">
    <div class="slide__section">
      <img
        class="slide__banner"
        :src="props.banner"
        alt=""
        @dragstart.prevent=""
      />
      <div class="slide__footer">
        <router-link
          class="slide__button"
          @dragstart.prevent=""
          :to="{ name: props.linkTo }"
          :replace="true"
        >
          {{ linkDesc }}
        </router-link>
      </div>
    </div>
    <div class="slide__section">
      <div>
        <div class="slide__duo">
          <i :class="props.infoClassIcon"></i>
          <h2 class="slide__title slide__title--sub">
            {{ props.infoTitle }}
          </h2>
        </div>
        <p class="slide__content slide__content--justify">
          {{ props.infoDesc }}
        </p>
        <div class="slide__spec">
          <template v-for="(card, index) in props.specifications" :key="index">
            <HomeCard :title="card.title" :desc="card.desc" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "vue3-carousel/dist/carousel.css";
import HomeCard from "./Card.vue";

export interface SlideInterface {
  title: string;
  desc: string;
  banner: string;
  link: {
    desc: string;
    to: string;
  };
  slideInfo: {
    classIcon: string[];
    title: string;
    desc: string;
    specifications: { title: string; desc: string }[];
  };
}

export default defineComponent({
  name: "HomeSlide",
  components: {
    HomeCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    linkDesc: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      required: true,
    },
    infoClassIcon: {
      type: Object as () => string[],
      required: true,
    },
    infoTitle: {
      type: String,
      required: true,
    },
    infoDesc: {
      type: String,
      required: true,
    },
    specifications: {
      type: Object as () => { title: string; desc: string }[],
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
  first: var(--colors-first),
  second: var(--colors-second),
  third: var(--colors-third),
  fourth: var(--colors-fourth),
);
$font-weight: (
  medium: var(--font-weight-medium),
);
$assets: (
  hoodie: var(--assets-hoodie),
  t-shirt: var(--assets-t-shirt),
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
.slide {
  &__header {
    font-size: 12px;
  }

  &__content {
    font-size: 1.5em;

    &--justify {
      text-align: justify;
    }
  }

  &__title {
    font-size: 2.5em;

    &--sub {
      color: map-get($map: $color-palette, $key: second);
      font-size: 2em;
    }
  }

  &__t-shirt {
    @include icon();
    background-image: map-get($map: $assets, $key: t-shirt);
    height: 40px;
    width: 44px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__hoodie {
    @include icon();
    background-image: map-get($map: $assets, $key: hoodie);
    height: 40px;
    width: 44px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__grid {
    @include grid(10px 50px, row, min-content, 500px, 1fr, center, center);
  }

  &__section {
    font-size: 12px;
    padding: 25px;
  }

  &__banner {
    height: auto;
    max-height: 520px;
    max-width: 100%;
    user-select: none;
  }

  &__footer {
    @include grid(24px, row, min-content, 200px, 1fr, center, center);
    margin-top: 50px;
  }

  &__duo {
    display: grid;
    gap: 10px;
    grid-template-columns: auto;
    margin-bottom: 10px;
    place-items: center;
  }

  &__ {
    font-size: 12px;
  }

  &__spec {
    @include grid(24px, row, min-content, 200px, 1fr, flex-start, center);
    margin-top: 24px;
  }

  &__button {
    border-radius: 16px;
    border: none;
    background: map-get($map: $color-palette, $key: third);
    color: map-get($map: $color-palette, $key: first);
    font-size: 16px;
    font-weight: map-get($map: $font-weight, $key: medium);
    padding: 12px 32px;
    user-select: none;

    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
</style>
