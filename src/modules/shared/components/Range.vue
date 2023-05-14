<template>
  <div class="range__container">
    <div class="range__header">
      <div class="range__label">
        <label
          v-if="props.label"
          class="range__container-label"
          :for="props.inputId"
        >
          {{ props.label }}
        </label>
        <i
          class="range__question"
          ref="questionButtonRef"
          @click="() => (showInfo = !showInfo)"
        ></i>
      </div>
      <div
        v-html="props.info"
        class="range__answer"
        ref="answerRef"
        v-if="showInfo && props.info"
      ></div>
      <span>{{ `${inputValue} ${props.measurementUnit}` }}</span>
    </div>
    <input
      class="range__input"
      :id="props.inputId"
      type="range"
      :min="props.min"
      :max="props.max"
      v-model="inputValue"
    />
  </div>
</template>

<script lang="ts">
import useClickOutside from "@/modules/shared/composables/useClickOutside";
import {
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  Ref,
} from "vue";

export default defineComponent({
  name: "ConfigRange",
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
    },
    inputId: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      default: "",
    },
    measurementUnit: {
      type: String,
      default: "",
    },
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const instance = getCurrentInstance();
    let onClickOutsideAnswer = (event: Event) => {
      event;
    };
    const questionButtonRef: Ref<HTMLElement | undefined> = ref();
    const answerRef: Ref<HTMLElement | undefined> = ref();
    const showInfo = ref(false);
    const inputValue = ref(props.modelValue);
    watch(inputValue, (newValue: number | string) => {
      instance?.emit(
        "update:modelValue",
        typeof newValue === "string" ? parseInt(newValue) : newValue
      );
    });
    onMounted(() => {
      const { onClickOutside } = useClickOutside(questionButtonRef);
      const { onClickOutside: onClickOutsideAns } = useClickOutside(answerRef);
      onClickOutsideAnswer = (event: Event) => {
        if (onClickOutside(event) && onClickOutsideAns(event))
          showInfo.value = false;
      };
      document.addEventListener("mousedown", onClickOutsideAnswer);
    });
    onUnmounted(() => {
      document.removeEventListener("mousedown", onClickOutsideAnswer);
    });
    return {
      props,
      showInfo,
      inputValue,
      answerRef,
      questionButtonRef,
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
  sixth: #bbbbbb,
);
$font-weight: (
  extra-light: var(--font-weight-extra-light),
  bold: var(--font-weight-bold),
);
$assets: (
  question: var(--assets-question),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 25px;
  width: 25px;
}
.range {
  &__container {
    width: 100%;

    &-label {
      &:hover,
      &:active {
        color: map-get($map: $color-palette, $key: sixth);
      }
    }
  }

  &__header {
    position: relative;
    display: flex;
    font-size: 1.4em;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  &__label {
    align-items: center;
    display: flex;
    gap: 10px;
    user-select: none;
  }

  &__question {
    @include icon();
    background-image: map-get($map: $assets, $key: question);
    height: 18px;
    width: 18px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__answer {
    position: absolute;
    user-select: none;
    background: map-get($map: $color-palette, $key: sixth);
    width: fit-content;
    max-height: 80px;
    overflow-y: scroll;
    font-size: 0.7em;
    padding: 10px;
    border-radius: 4px;
    bottom: 100%;
  }

  &__input {
    appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: map-get($map: $color-palette, $key: first);
    outline: none;
    transition: opacity 0.2s;
    margin-bottom: 32px;

    &:hover,
    &:active {
      background: map-get($map: $color-palette, $key: sixth);
      cursor: pointer;

      &::-moz-range-thumb {
        background: map-get($map: $color-palette, $key: third);
      }
    }

    &::-moz-range-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: none;
      background: map-get($map: $color-palette, $key: second);
      cursor: pointer;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: none;
      background: map-get($map: $color-palette, $key: second);
      cursor: pointer;
    }
  }
}
</style>
