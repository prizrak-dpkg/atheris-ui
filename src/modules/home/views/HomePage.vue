<template>
  <slot name="header"></slot>
  <div class="page">
    <HomeColumn :banner="require('@/assets/images/shop.png')">
      <h1 class="page__title">¡Diseña tu ropa a medida!</h1>
      <p class="page__content">
        Elige entre nuestra amplia variedad de estilos y crea tu look único con
        nuestro servicio de diseño personalizado.
      </p>
      <div class="page__footer">
        <button class="page__button" @click="scrollToExplore">Explorar</button>
      </div>
    </HomeColumn>
    <HomeCarousel :slides="slides" id="explore"></HomeCarousel>
    <HomeColumn :banner="require('@/assets/images/customer.png')">
      <div class="page__desc">
        <div class="page__duo">
          <i class="atheris__icon atheris__icon--mailbox"></i>
          <h1 class="page__title page__title--sub">¿Qué opinan de nosotros?</h1>
        </div>
        <p class="page__content page__content--justify">
          Lo que dicen nuestros clientes de nuestros productos, aquí puedes leer
          lo que opinan:
        </p>
        <div class="page__info">
          <span class="page__info-value">{{ average.toFixed(1) }}</span>
          <HomeStar :rating="average"></HomeStar>
          <span class="page__info-desc">{{ total }} calificaciones</span>
        </div>
      </div>
      <HomeRating @changeAverage="changeRatingHeaderInfo"></HomeRating>
    </HomeColumn>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useSlides from "../composables/useSlides";
import HomeCarousel from "../components/Carousel.vue";
import HomeColumn from "@/modules/shared/components/Column.vue";
import HomeStar from "../components/Star.vue";
import HomeRating from "../components/Rating.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    HomeCarousel,
    HomeColumn,
    HomeStar,
    HomeRating,
  },
  setup() {
    const { slides, loadData } = useSlides();
    const average = ref(0);
    const total = ref(0);
    loadData();
    return {
      average,
      total,
      slides,
      scrollToExplore: () => {
        const explore = document.querySelector("#explore");
        if (explore) {
          explore.scrollIntoView({ behavior: "smooth" });
        }
      },
      changeRatingHeaderInfo: (info: { average: number; total: number }) => {
        average.value = info.average;
        total.value = info.total;
      },
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
  extra-light: var(--font-weight-extra-light),
  medium: var(--font-weight-medium),
  bold: var(--font-weight-bold),
);
$assets: (
  play: var(--assets-play),
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
.page {
  height: calc(100vh - 80px);
  overflow-y: scroll;
  padding: 32px 120px 120px 120px;

  @media (max-width: 576px) {
    padding: 32px 48px 48px 48px;
  }

  &__desc {
    display: grid;
    place-items: center;
  }

  &__duo {
    @include grid(10px, row, min-content, 200px, 1fr, center, center);
  }

  &__title {
    font-size: 2.5em;

    &--sub {
      color: map-get($map: $color-palette, $key: second);
      font-size: 2em;
      width: fit-content;
    }
  }

  &__content {
    font-size: 1.5em;

    &--justify {
      text-align: justify;
    }
  }

  &__footer {
    @include grid(24px, row, min-content, 200px, 1fr, center, center);
    margin-top: 50px;
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

  &__video {
    @include grid(5px, row, min-content, 50px, 80px, center, center);
    justify-content: center;
    user-select: none;
    width: 100%;
    .video__text:hover,
    .video__text:active,
    .page__play:hover + .video__text,
    .page__play:active + .video__text {
      color: map-get($map: $color-palette, $key: second);
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__play {
    @include icon();
    background-image: map-get($map: $assets, $key: play);
    height: 43px;
    width: 50px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__info {
    align-items: center;
    display: flex;
    flex-direction: column;

    &-value {
      -webkit-text-stroke: 2px map-get($map: $color-palette, $key: first);
      color: map-get($map: $color-palette, $key: second);
      font-size: 54px;
      font-weight: map-get($map: $font-weight, $key: bold);
    }

    &-desc {
      color: map-get($map: $color-palette, $key: second);
      font-size: 1.2em;
      font-style: italic;
      font-weight: map-get($map: $font-weight, $key: extra-light);
      user-select: none;
    }
  }
}
</style>
