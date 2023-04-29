<template>
  <div class="color__container">
    <label
      class="color__label color__label--black"
      :class="{ 'color__label--selected': black === inputValue }"
    >
      <input
        class="color__radio"
        type="radio"
        :value="black"
        v-model="inputValue"
      />
    </label>
    <label
      class="color__label color__label--navy-blue"
      :class="{ 'color__label--selected': navyBlue === inputValue }"
    >
      <input
        class="color__radio"
        type="radio"
        :value="navyBlue"
        v-model="inputValue"
      />
    </label>
    <label
      class="color__label color__label--red"
      :class="{ 'color__label--selected': red === inputValue }"
    >
      <input
        class="color__radio"
        type="radio"
        :value="red"
        v-model="inputValue"
      />
    </label>
    <label
      class="color__label color__label--gold"
      :class="{ 'color__label--selected': gold === inputValue }"
    >
      <input
        class="color__radio"
        type="radio"
        :value="gold"
        v-model="inputValue"
      />
    </label>
    <label
      class="color__label color__label--gray"
      :class="{ 'color__label--selected': gray === inputValue }"
    >
      <input
        class="color__radio"
        type="radio"
        :value="gray"
        v-model="inputValue"
      />
    </label>
    <label
      class="color__label color__label--white"
      :class="{ 'color__label--selected': white === inputValue }"
    >
      <input
        class="color__radio"
        type="radio"
        :value="white"
        v-model="inputValue"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { ColorsEnum } from "../types";

export default defineComponent({
  name: "ColorConfig",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const black = ColorsEnum.BLACK;
    const gold = ColorsEnum.GOLD;
    const gray = ColorsEnum.GRAY;
    const navyBlue = ColorsEnum.NAVY_BLUE;
    const red = ColorsEnum.RED;
    const white = ColorsEnum.WHITE;
    const instance = getCurrentInstance();
    const inputValue = ref(props.modelValue);
    watch(inputValue, (newValue: number | string) => {
      instance?.emit("update:modelValue", newValue);
    });
    return {
      props,
      inputValue,
      black,
      gold,
      gray,
      navyBlue,
      red,
      white,
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  black: #272729,
  white: #ffffff,
  gold: #dd9a29,
  gray: #b8b8b8,
  navy-blue: #282a5a,
  red: #a92030,
  second: var(--colors-second),
  third: var(--colors-third),
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
.color {
  &__container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 24px;
    max-width: 350px;
  }

  &__label {
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    text-align: center;
    box-shadow: inset 2px 0px 5px -2px rgba(0, 0, 0, 0.74);

    &:hover,
    &:active {
      cursor: pointer;
      border: 2px solid map-get($map: $color-palette, $key: third);
    }

    &--selected {
      border: 3px solid map-get($map: $color-palette, $key: second);

      &:hover,
      &:active {
        cursor: pointer;
        border: 3px solid map-get($map: $color-palette, $key: second);
      }
    }

    &--black {
      background: map-get($map: $color-palette, $key: black);
    }

    &--white {
      background: map-get($map: $color-palette, $key: white);
    }

    &--gold {
      background: map-get($map: $color-palette, $key: gold);
    }

    &--gray {
      background: map-get($map: $color-palette, $key: gray);
    }

    &--navy-blue {
      background: map-get($map: $color-palette, $key: navy-blue);
    }

    &--red {
      background: map-get($map: $color-palette, $key: red);
    }
  }

  &__radio {
    display: none;
  }
}
</style>
