<template>
  <div class="body-type__container">
    <label
      class="body-type__label"
      :class="{ 'body-type__label--selected': wider === inputValue }"
    >
      <i class="body-type__low-trapezoid"></i>
      <p>Mi pecho es más ancho que mi cintura.</p>
      <input
        class="body-type__radio"
        type="radio"
        :value="wider"
        v-model="inputValue"
      />
    </label>
    <label
      class="body-type__label"
      :class="{ 'body-type__label--selected': same === inputValue }"
    >
      <i class="body-type__square"></i>
      <p>Mi pecho tiene aproximadamente el mismo ancho que mi cintura.</p>
      <input
        class="body-type__radio"
        type="radio"
        :value="same"
        v-model="inputValue"
      />
    </label>
    <label
      class="body-type__label"
      :class="{ 'body-type__label--selected': narrower === inputValue }"
    >
      <i class="body-type__high-trapezoid"></i>
      <p>Mi pecho es más estrecho que mi cintura.</p>
      <input
        class="body-type__radio"
        type="radio"
        :value="narrower"
        v-model="inputValue"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { BodyTypeEnum } from "../types";

export default defineComponent({
  name: "BodyType",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const narrower = BodyTypeEnum.NARROWER;
    const same = BodyTypeEnum.SAME;
    const wider = BodyTypeEnum.WIDER;
    const instance = getCurrentInstance();
    const inputValue = ref(props.modelValue);
    watch(inputValue, (newValue: number | string) => {
      instance?.emit(
        "update:modelValue",
        typeof newValue === "string" ? parseInt(newValue) : newValue
      );
    });
    return {
      props,
      inputValue,
      narrower,
      same,
      wider,
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
  fifth: #999999,
);
$assets: (
  low-trapezoid: var(--assets-low-trapezoid),
  square: var(--assets-square),
  high-trapezoid: var(--assets-high-trapezoid),
);
$font-weight: (
  semi-bold: var(--font-weight-semi-bold),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 25px;
  width: 25px;
}
.body-type {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__label {
    display: grid;
    grid-template-columns: 30% 70%;
    place-items: center;
    width: 100%;
    height: 140px;
    border: 2px solid map-get($map: $color-palette, $key: fifth);
    border-radius: 16px;
    padding: 2em;
    gap: 10px;
    text-align: center;
    font-size: 1.2em;

    &:hover,
    &:active {
      cursor: pointer;
      border: 2px solid map-get($map: $color-palette, $key: third);
    }

    &--selected {
      border: 3px solid map-get($map: $color-palette, $key: second);
      font-weight: map-get($map: $font-weight, $key: semi-bold);

      &:hover,
      &:active {
        cursor: pointer;
        border: 3px solid map-get($map: $color-palette, $key: second);
      }
    }
  }

  &__radio {
    display: none;
  }

  &__low-trapezoid {
    @include icon();
    background-image: map-get($map: $assets, $key: low-trapezoid);
    height: 4em;
    width: 4em;
  }

  &__square {
    @include icon();
    background-image: map-get($map: $assets, $key: square);
    height: 4em;
    width: 4em;
  }

  &__high-trapezoid {
    @include icon();
    background-image: map-get($map: $assets, $key: high-trapezoid);
    height: 4em;
    width: 4em;
  }
}
</style>
