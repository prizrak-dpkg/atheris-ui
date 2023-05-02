<template>
  <div class="input__container">
    <div class="input__header">
      <div class="input__label">
        <label
          v-if="props.label"
          class="input__container-label"
          :for="props.inputId"
        >
          {{ props.label }}
        </label>
        <i
          class="input__question"
          ref="questionButtonRef"
          @click="() => (showInfo = !showInfo)"
        ></i>
      </div>
      <div
        v-html="props.info"
        class="input__answer"
        ref="answerRef"
        v-if="showInfo && props.info"
      ></div>
    </div>
    <p>{{ props.alertInfo }}</p>
    <input
      class="input__input"
      :class="alertClass"
      :id="props.inputId"
      :type="props.type"
      v-model="inputValue"
    />
  </div>
</template>

<script lang="ts">
import useClickOutside from "@/modules/shared/composables/useClickOutside";
import { computed } from "vue";
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
  name: "ConfigInput",
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
    alertInfo: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
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
    const alertClass = computed(() => ({
      "input__input--alert": props.alertInfo.length > 0,
    }));
    watch(inputValue, (newValue: number | string) => {
      instance?.emit("update:modelValue", newValue);
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
      alertClass,
      questionButtonRef,
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  first: var(--colors-first),
  second: var(--colors-second),
  third: #52f8d150,
  fourth: var(--colors-fourth),
  fifth: #f8525250,
  sixth: #bbbbbb,
  seventh: #f85252,
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
.input {
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
    border: solid 1px map-get($map: $color-palette, $key: second);
    border-radius: 5px;
    background: map-get($map: $color-palette, $key: fourth);
    outline: none;
    transition: opacity 0.2s;
    margin-bottom: 32px;
    padding: 12px;

    &--alert {
      border: solid 1px map-get($map: $color-palette, $key: seventh);
      background: map-get($map: $color-palette, $key: fifth);
    }

    &:hover,
    &:active {
      background: map-get($map: $color-palette, $key: third);
      cursor: pointer;
    }
  }
}
</style>
