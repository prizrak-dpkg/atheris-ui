<template>
  <div>
    <WiderTShirt :offset="offset" v-if="props.bodyType === wider"></WiderTShirt>
    <SameTShirt :offset="offset" v-if="props.bodyType === same"></SameTShirt>
    <NarrowerTShirt
      :offset="offset"
      v-if="props.bodyType === narrower"
    ></NarrowerTShirt>
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
import ConfigRange from "@/modules/shared/components/Range.vue";
import WiderTShirt from "./WiderTShirt.vue";
import SameTShirt from "./SameTShirt.vue";
import NarrowerTShirt from "./NarrowerTShirt.vue";
import routes from "@/routes";
import { useStore } from "vuex";
import { BodyTypeEnum } from "../types";

export default defineComponent({
  name: "DesignTShirt",
  components: {
    ConfigRange,
    WiderTShirt,
    SameTShirt,
    NarrowerTShirt,
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
