<template>
  <slot name="header"></slot>
  <div class="design">
    <DesignConfig :mode="props.mode">{{ props.mode }}</DesignConfig>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DesignConfig from "../components/Config.vue";

export default defineComponent({
  name: "DesignPage",
  components: {
    DesignConfig,
  },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.design {
  height: calc(100vh - 80px);
  overflow-y: scroll;
  padding: 32px 120px 120px 120px;
  display: grid;
  place-items: center;

  @media (max-width: 576px) {
    padding: 32px 48px 48px 48px;
  }
}
</style>
