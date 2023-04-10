<template>
  <slot name="header"></slot>
  <div class="design">
    <h1 class="design__header">¡Escoge tu producto!</h1>
    <div class="design__navigation">
      <div
        class="design__item design__t-shirt"
        @click="$router.replace({ name: routes.designTShirt })"
      >
        <p class="design__title">Camisetas</p>
        <span class="design__desc">Comodidad y durabilidad</span>
        <p class="design__item__msg">
          ¿Qué esperas?, ¡crea tu diseño ahora mismo!<span class>→</span>
        </p>
      </div>
      <div
        class="design__item design__hoddie"
        @click="$router.replace({ name: routes.designHoddie })"
      >
        <p class="design__title">Hoodies</p>
        <span class="design__desc">Estilo y versatilidad</span>
        <p class="design__item__msg">
          ¿Qué esperas?, ¡crea tu diseño ahora mismo!<span class>→</span>
        </p>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import routes from "@/routes";

export default defineComponent({
  name: "DesignPage",
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
  fourth: var(--colors-fourth),
);
$font-weight: (
  bold: var(--font-weight-bold),
);
.design {
  height: calc(100vh - 80px);
  overflow-y: scroll;
  padding: 32px 120px 120px 120px;
  display: grid;
  place-items: center;

  @media (max-width: 576px) {
    padding: 32px 48px 48px 48px;
  }

  &__header {
    font-size: 2.5em;
    margin-bottom: 24px;
  }

  &__navigation {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
    width: 100%;
  }

  &__item {
    border-radius: 25px;
    color: map-get($map: $color-palette, $key: fourth);
    font-size: 16px;
    letter-spacing: -0.05px;
    padding: 30px;
    text-align: right;
    user-select: none;
    width: 80%;
    overflow: hidden;

    &:hover,
    &:active {
      cursor: pointer;
    }

    &:hover > &__msg,
    &:active > &__msg {
      transform: translateX(0px);
    }

    &__msg {
      background-color: map-get($map: $color-palette, $key: fourth);
      border-radius: 0.8em;
      color: map-get($map: $color-palette, $key: first);
      display: flex;
      font-size: 0.8em;
      gap: 10px;
      margin-right: 0;
      margin-top: 3.2em;
      padding: 1.2rem 1em;
      transform: translateX(-100vw);
      transition: transform 0.25s ease-in-out;
    }
  }

  &__t-shirt {
    background: linear-gradient(268.7deg, #303030e4 0.41%, #5bc3f0e4 100.18%),
      url("@/assets/images/t-shirt-banner.png") no-repeat center center;
    background-size: cover;

    &:hover,
    &:active {
      background: linear-gradient(268.7deg, #303030e4 0.41%, #52f8d0e4 100.18%),
        url("@/assets/images/t-shirt-banner.png") no-repeat center center;
      background-size: cover;
    }
  }

  &__hoddie {
    background: linear-gradient(268.7deg, #303030e4 0.41%, #5bc3f0e4 100.18%),
      url("@/assets/images/hoddie-banner.png") no-repeat center center;
    background-size: cover;

    &:hover,
    &:active {
      background: linear-gradient(268.7deg, #303030e4 0.41%, #52f8d0e4 100.18%),
        url("@/assets/images/hoddie-banner.png") no-repeat center center;
      background-size: cover;
    }
  }

  &__title {
    font-size: 1.5em;
    font-weight: map-get($map: $font-weight, $key: bold);
  }

  &__desc {
    font-size: 1em;
  }
}
</style>
