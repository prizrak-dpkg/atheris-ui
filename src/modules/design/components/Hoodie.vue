<template>
  <div>
    <WiderHoodie :offset="offset" v-if="props.bodyType === wider"></WiderHoodie>
    <SameHoodie :offset="offset" v-if="props.bodyType === same"></SameHoodie>
    <NarrowerHoodie
      :offset="offset"
      v-if="props.bodyType === narrower"
    ></NarrowerHoodie>
    <ConfigRange
      label="Equilibrar medidas"
      input-id="offset"
      v-model="offset"
      info="<h3>¡Ya falta poco!</h3>Puedes deslizar el control de ajuste para adaptar las medidas del producto a sus necesidades."
      :min="-2"
      :max="2"
    ></ConfigRange>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import "vue3-carousel/dist/carousel.css";
import ConfigRange from "./Range.vue";
import WiderHoodie from "./WiderHoodie.vue";
import SameHoodie from "./SameHoodie.vue";
import NarrowerHoodie from "./NarrowerHoodie.vue";
import routes from "@/routes";
import { useStore } from "vuex";
import { BodyTypeEnum } from "../types";

export default defineComponent({
  name: "DesignHoodie",
  components: {
    ConfigRange,
    WiderHoodie,
    SameHoodie,
    NarrowerHoodie,
  },
  props: {
    bodyType: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const offset = ref(0);
    const wider = BodyTypeEnum.WIDER;
    const same = BodyTypeEnum.SAME;
    const narrower = BodyTypeEnum.NARROWER;
    watch(offset, (newValue) => {
      store.commit("design/setProductMeasures", newValue);
    });
    return {
      props,
      routes,
      offset,
      wider,
      same,
      narrower,
    };
  },
});
</script>
