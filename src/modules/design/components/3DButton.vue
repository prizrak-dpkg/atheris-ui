<template>
  <button
    class="td-button"
    ref="modelRef"
    :style="{ height: `${modelWidth}px` }"
    @click="onClick"
  >
    <i class="td-button__icon"></i>
  </button>
</template>

<script lang="ts">
import {
  Ref,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
} from "vue";

export default defineComponent({
  name: "3DButton",
  emits: ["onClick", "onResize"],
  setup() {
    const instance = getCurrentInstance();
    const modelRef: Ref<HTMLDivElement | undefined> = ref();
    const modelWidth = ref(0);
    const handleModelResize = () => {
      if (modelRef.value) {
        const style = getComputedStyle(modelRef.value);
        const padding =
          parseInt(style.getPropertyValue("padding-left")) +
          parseInt(style.getPropertyValue("padding-right"));
        modelWidth.value = modelRef.value.clientWidth - padding;
        instance?.emit("onResize", modelWidth.value);
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleModelResize);
      handleModelResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleModelResize);
    });
    return {
      modelRef,
      modelWidth,
      onClick: () => {
        instance?.emit("onClick");
      },
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  primary: #f4f4f4,
);
$assets: (
  td-blue: var(--assets-3d-blue),
  td-green: var(--assets-3d-green),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 25px;
  width: 25px;
}
.td-button {
  align-items: center;
  background: map-get($map: $color-palette, $key: primary);
  border-radius: 20px;
  border: none;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  &:hover,
  &:active {
    cursor: pointer;
  }

  &:hover > &__icon,
  &:active > &__icon {
    background-image: map-get($map: $assets, $key: td-blue);
  }

  &__icon {
    @include icon();
    background-image: map-get($map: $assets, $key: td-green);
    height: 10em;
    width: 10em;
  }
}
</style>
