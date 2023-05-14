<template>
  <slot name="header"></slot>
  <div class="page">
    <HomeColumn :banner="require('@/assets/images/not_implemented.svg')">
      <h1 class="page__title">¡Hola!</h1>
      <div class="page__content">
        <p>
          Gracias por visitar nuestra página. Lamentablemente, el recurso que
          estás buscando aún no se encuentra disponible. Pero no te preocupes,
          ¡estamos trabajando arduamente para tenerlo listo lo más pronto
          posible!
        </p>
        <br />
        <p>
          ¡Sigue atento(a) a nuestras actualizaciones! Estamos comprometidos en
          proporcionarte una experiencia excepcional.
        </p>
        <br />
        <p>
          Si tienes alguna pregunta o necesitas asistencia adicional, no dudes
          en contactarnos. Estamos aquí para ayudarte en todo lo que podamos.
        </p>
        <br />
        <p>
          Puedes enviarnos un correo electrónico a
          <a href="mailto:servicio@atherisclothes.com" target="_blank"
            >servicio@atherisclothes.com</a
          >
          o escribirnos a través de WhatsApp al número
          <a href="https://wa.me/+573045223273" target="_blank">+573045223273</a
          >. Estaremos encantados de ayudarte en lo que necesites.
        </p>
        <br />
        <p>Gracias por tu comprensión y por ser parte de nuestra comunidad.</p>
        <br />
        <p>Saludos cordiales,<br />El equipo de Atheris Clothes</p>
      </div>
      <div class="page__footer">
        <button
          class="page__button"
          @click="$router.replace({ name: routes.home })"
        >
          Regresar
        </button>
      </div>
    </HomeColumn>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeColumn from "../components/Column.vue";
import routes from "@/routes";

export default defineComponent({
  name: "HomePage",
  components: {
    HomeColumn,
  },
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
  third: var(--colors-third),
  fourth: var(--colors-fourth),
);
$font-weight: (
  extra-light: var(--font-weight-extra-light),
  medium: var(--font-weight-medium),
  bold: var(--font-weight-bold),
);
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
}
</style>
