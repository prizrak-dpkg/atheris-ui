<template>
  <div class="loading" ref="loadingRef">
    <div class="loading-container">
      <div
        class="loading-container__spinner loading-container__spinner--first"
      ></div>
      <div
        class="loading-container__spinner loading-container__spinner--second"
      ></div>
      <div
        class="loading-container__spinner loading-container__spinner--third"
      ></div>
      <div
        class="loading-container__spinner loading-container__spinner--fourth"
      ></div>
    </div>
    <div class="loading-container__text">Cargando 3D</div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, computed, defineComponent, watch, onMounted } from "vue";

export default defineComponent({
  name: "ModelLoading",
  props: {
    radio: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const box = computed(() => props.radio);
    const loadingRef: Ref<HTMLDivElement | undefined> = ref();
    const resizeBox = (radio: number) => {
      if (loadingRef.value) {
        loadingRef.value.style.height = `${radio}px`;
        loadingRef.value.style.width = `${radio}px`;
        loadingRef.value.style.borderRadius = "20px";
        loadingRef.value.style.background = "#f4f4f4";
      }
    };
    watch(box, (newValue) => {
      resizeBox(newValue);
    });
    onMounted(() => {
      resizeBox(box.value);
    });
    return {
      loadingRef,
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  primary: #5bc3f0,
);
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  height: 100%;

  &-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 8rem;
    height: 8rem;

    &__spinner {
      width: 1.6rem;
      height: 1.6rem;
      background-color: map-get($map: $color-palette, $key: primary);
      border-radius: 100%;
      animation: loading 1.2s linear infinite;

      &--first {
        animation-delay: 0s;
      }
      &--second {
        animation-delay: -0.3s;
      }
      &--third {
        animation-delay: -0.6s;
      }
      &--fourth {
        animation-delay: -0.9s;
      }
    }

    &__text {
      color: map-get($map: $color-palette, $key: primary);
      font-weight: 600;
    }
  }
}

@keyframes loading {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
