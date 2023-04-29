<template>
  <div class="config__grid">
    <div class="config__section">
      <TDButton
        v-if="!showModel"
        @on-click="() => (showModel = true)"
        @on-resize="handleBoxResize"
      ></TDButton>
      <TDModel
        :radio="modelWidth"
        :mode="props.mode"
        :primary-color="primaryColor"
        :second-color="secondColor"
        v-if="showModel"
      ></TDModel>
    </div>
    <div class="config__section">
      <form @submit.prevent="onSubmit">
        <div v-if="step === 1">
          <h1>DISEÑO</h1>
          <p class="config__text">Ajusta tu diseño</p>
          <h2 class="config__text config__text--title">
            Camiseta atheris / Lana merino
          </h2>
          <p class="config__text config__text--paragraph">
            Esta camiseta tiene una textura sutil y brillo que le da vida al
            color y añade un toque elegante. La lana merino es naturalmente
            termorreguladora, lo que significa que te mantiene fresco cuando
            hace calor y caliente cuando hace frío.
          </p>
          <h3 class="config__text config__text--subtitle">Color primario</h3>
          <Color v-model="primaryColor"></Color>
          <h3 class="config__text config__text--subtitle">Color scundario</h3>
          <Color v-model="secondColor"></Color>
        </div>
        <div v-if="step === 2">
          <h1>PERFIL</h1>
          <p class="config__text">Ayúdanos a configurar tu perfil</p>
          <ConfigRange
            label="Estatura"
            measurement-unit="cm"
            input-id="height"
            v-model="height"
            info="<h3>¿Por qué te pedimos tu estatura?</h3>Tu estatura nos ayuda a determinar la longitud de tu prenda y sus mangas."
            :min="150"
            :max="220"
          ></ConfigRange>
          <ConfigRange
            label="Peso"
            measurement-unit="kg"
            input-id="weight"
            v-model="weight"
            info="<h3>¿Por qué te pedimos tu peso?</h3>Tu peso, junto con tu tipo de cuerpo, nos ayuda a crear un patrón con el tamaño de tu pecho y cintura."
            :min="42"
            :max="145"
          ></ConfigRange>
          <ConfigRange
            label="Edad"
            measurement-unit="años"
            input-id="age"
            v-model="age"
            info="<h3>¿Por qué te pedimos tu edad?</h3>Aunque no lo percibas, tu edad también influye en las dimensiones de tu cuerpo; por ejemplo, la anchura de tus hombros tiende a cambiar a medida que envejeces."
            :min="20"
            :max="90"
          ></ConfigRange>
          <ConfigRange
            label="Talla de calzado"
            input-id="shoeSize"
            v-model="shoeSize"
            info="<h3>¿Por qué te pedimos tu talla de calzado?</h3>En realidad, tu pie tiene la misma longitud que tu antebrazo (¡compruébalo!). Dado que la mayoría de la gente ya conoce el número de calzado, esta es una forma sencilla de obtener otra medida de la parte superior del cuerpo."
            :min="30"
            :max="45"
          ></ConfigRange>
        </div>
        <div v-if="step === 3">
          <h1>TIPO DE CUERPO</h1>
          <p class="config__text">Elige tu tipo de cuerpo</p>
          <BodyType v-model="bodyType"></BodyType>
        </div>
        <div v-if="step === 4">
          <h1>MEDIDAS</h1>
          <p class="config__text">Ajusta tus medidas</p>
          <TShirt
            v-if="props.mode === tShirtMode"
            :body-type="bodyType"
          ></TShirt>
          <Hoodie
            v-if="props.mode === hoodieMode"
            :body-type="bodyType"
          ></Hoodie>
        </div>
        <div class="config__footer">
          <button class="config__button" type="button" @click="onBack">
            Atrás
          </button>
          <button class="config__button" type="submit">{{ nextText }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, Ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import ConfigRange from "./Range.vue";
import BodyType from "./BodyType.vue";
import TShirt from "./TShirt.vue";
import TDModel from "./3DModel.vue";
import TDButton from "./3DButton.vue";
import Color from "./Color.vue";
import Hoodie from "./Hoodie.vue";
import routes from "@/routes";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { DesignModeEnum } from "@/modules/shared/types";

export default defineComponent({
  name: "DesignConfig",
  components: {
    ConfigRange,
    BodyType,
    TShirt,
    TDModel,
    TDButton,
    Color,
    Hoodie,
  },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const step = ref(1);
    const nextText = ref("Siguiente");
    const showModel = ref(false);
    const modelRef: Ref<HTMLDivElement | undefined> = ref();
    const modelWidth = ref(0);
    const age = ref(store.getters["design/getAge"]);
    const height = ref(store.getters["design/getHeight"]);
    const weight = ref(store.getters["design/getWeight"]);
    const shoeSize = ref(store.getters["design/getShoeSize"]);
    const bodyType = ref(store.getters["design/getBodyType"]);
    const primaryColor = ref(store.getters["design/getPrimaryColor"]);
    const secondColor = ref(store.getters["design/getSecondColor"]);
    const tShirtMode = DesignModeEnum.TShirt;
    const hoodieMode = DesignModeEnum.Hoodie;
    const resetShowModel = () => (showModel.value = false);
    onMounted(() => {
      window.addEventListener("resize", resetShowModel);
      showModel.value = true;
    });
    onUnmounted(() => {
      window.removeEventListener("resize", resetShowModel);
    });
    return {
      routes,
      props,
      primaryColor,
      secondColor,
      height,
      weight,
      age,
      shoeSize,
      bodyType,
      step,
      tShirtMode,
      hoodieMode,
      nextText,
      modelRef,
      modelWidth,
      showModel,
      handleBoxResize: (width: number) => {
        showModel.value = false;
        modelWidth.value = width;
      },
      onBack: () => {
        nextText.value = "Siguiente";
        if (step.value === 1) {
          router.replace({ name: routes.design });
        }
        if (step.value > 1) step.value -= 1;
      },
      onSubmit: () => {
        if (step.value === 1) {
          store.commit("design/setColors", {
            primaryColor: primaryColor.value,
            secondColor: secondColor.value,
          });
        }
        if (step.value === 3) {
          store.commit("design/setMode", props.mode);
          store.commit("design/setCustomerProfile", {
            age: age.value,
            height: height.value,
            weight: weight.value,
            shoeSize: shoeSize.value,
            bodyType: bodyType.value,
          });
          store.commit("design/setProductMeasures", 0);
        }
        if (step.value < 4) step.value += 1;
        if (step.value === 4) {
          nextText.value = "Añadir";
        }
      },
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
  sixth: var(--colors-sixth),
);
$font-weight: (
  extra-light: var(--font-weight-extra-light),
  medium: var(--font-weight-medium),
  bold: var(--font-weight-bold),
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
.config {
  &__grid {
    @include grid(10px 50px, row, min-content, 500px, 1fr, center, center);
    width: 100%;
  }

  &__text {
    font-size: 1.5em;
    margin-bottom: 12px;

    &--title {
      font-weight: map-get($map: $font-weight, $key: bold);
    }

    &--subtitle {
      font-size: 1.3em;
      font-weight: map-get($map: $font-weight, $key: bold);
    }

    &--paragraph {
      font-size: 1.3em;
      text-align: justify;
    }
  }

  &__section {
    display: grid;
    font-size: 12px;
    padding: 25px;
    width: 100%;
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
    width: 100%;
    max-width: 150px;

    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__footer {
    @include grid(24px, row, min-content, 130px, 1fr, center, center);
    margin-top: 50px;
  }
}
</style>
