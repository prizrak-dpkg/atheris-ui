<template>
  <div class="footer__grid">
    <div class="footer__section footer__section--center">
      <router-link
        :to="{ name: routes.faqs }"
        class="footer__link"
        @dragstart.prevent=""
        :replace="true"
        >FAQs</router-link
      >
      <router-link
        :to="{ name: routes.about }"
        class="footer__link"
        @dragstart.prevent=""
        :replace="true"
        >Acerca de nosotros</router-link
      >
      <router-link
        :to="{ name: routes.terms }"
        class="footer__link"
        @dragstart.prevent=""
        :replace="true"
        >Términos y condiciones</router-link
      >
      <router-link
        :to="{ name: routes.policy }"
        class="footer__link"
        @dragstart.prevent=""
        :replace="true"
        >Política de privacidad</router-link
      >
    </div>
    <div class="footer__section footer__section--center">
      <i class="footer__logo"></i>
      <p class="footer__text">
        Tenemos una amplia variedad de ropa y ofertas especiales, nuestros
        productos son de alta calidad y durabilidad.
      </p>
      <div class="footer__info">
        <span class="footer__desc">@2023 Atheris clothes</span>
        <span class="footer__desc">Todos los derechos reservados</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import routes from "@/routes";

export default defineComponent({
  name: "HomeFooter",
  setup() {
    return {
      routes,
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  first: var(--colors-first),
  second: var(--colors-second),
);
$assets: (
  atheris: var(--assets-atheris),
  atheris-hover: var(--assets-atheris-hover),
  atheris-min: var(--assets-atheris-min),
  atheris-min-hover: var(--assets-atheris-min-hover),
);
$font-weight: (
  extra-light: var(--font-weight-extra-light),
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
.footer {
  &__grid {
    @include grid(10px 50px, row, min-content, 500px, 1fr, center, center);
  }

  &__section {
    font-size: 12px;
    padding: 25px;

    &--center {
      display: grid;
      place-items: center;
      gap: 15px;
    }
  }

  &__logo {
    @include icon();
    background-image: map-get($map: $assets, $key: atheris);
    height: 25px;
    width: 215px;

    @media (max-width: 576px) {
      background-image: map-get($map: $assets, $key: atheris-min);
      height: 30px;
      width: 35px;

      &-toggle:hover,
      &-toggle:active {
        background-image: map-get($map: $assets, $key: atheris-min-hover);
      }
    }
  }

  &__link {
    color: map-get($map: $color-palette, $key: first);
    margin: auto;
    text-align: center;
    text-decoration: underline;
    user-select: none;

    &:hover,
    &:active {
      color: map-get($map: $color-palette, $key: second);
    }
  }

  &__info {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  &__desc {
    color: map-get($map: $color-palette, $key: second);
    font-size: 1.2em;
    font-style: italic;
    font-weight: map-get($map: $font-weight, $key: extra-light);
    user-select: none;
  }

  &__text {
    font-size: 1.2em;
    text-align: center;
    user-select: none;
  }
}
</style>
