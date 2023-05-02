<template>
  <slot name="header"></slot>
  <div class="page">
    <div class="page__content">
      <h1 class="page__title">Verifica el estado de tu pedido</h1>
      <ConfigInput
        :label="'Código'"
        :inputId="'hash'"
        :info="'<h3>¿Qué código?</h3>El código que recibiste al completar el pago de tu pedido, este se mostró en la pantalla una vez pagaste tu pedido, también puedes buscarlo en la bandeja de entrada del correo electrónico registrado. Te diremos si tu pedido está en producción, esta en camino o ya fue entregado.'"
        :type="'text'"
        v-model="trackHash"
      ></ConfigInput>
      <button class="page__button">Consultar</button>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ConfigInput from "@/modules/shared/components/Input.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    ConfigInput,
  },
  setup() {
    const trackHash = ref("");
    return {
      trackHash,
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
.page {
  height: calc(100vh - 80px);
  overflow-y: scroll;
  padding: 32px 120px 120px 120px;
  font-size: 12px;

  &__title {
    font-size: 2em;
    text-align: center;
  }

  &__content {
    font-size: 1.2em;
    height: 450px;
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;

    &--justify {
      text-align: center;
    }
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
