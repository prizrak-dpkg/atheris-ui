<template>
  <slot name="header"></slot>
  <div class="page">
    <template v-if="trackStatus.status === 0">
      <HomeColumn :banner="require('@/assets/images/not_found.svg')">
        <h1 class="page__title">¡Hola!</h1>
        <div class="page__content">
          <p>
            ¡Oops! Parece que el código de pedido que ingresaste no existe en
            nuestro sistema. Lamentamos las molestias que esto pueda causarte.
            Por favor, verifica el código ingresado e intenta nuevamente. Si
            necesitas ayuda adicional o tienes alguna pregunta, no dudes en
            contactarnos. Estaremos encantados de asistirte y brindarte la
            información que necesitas. ¡Gracias por tu comprensión!
          </p>
        </div>
        <div class="page__footer">
          <button
            class="page__button"
            @click="$router.replace({ name: routes.track })"
          >
            Regresar
          </button>
        </div>
      </HomeColumn>
    </template>
    <template v-if="trackStatus.status === 1">
      <HomeColumn :banner="require('@/assets/images/in_production.svg')">
        <h1 class="page__title">¡Hola!</h1>
        <div class="page__content">
          <p>
            ¡Estamos emocionados de anunciarte que tu pedido se encuentra
            actualmente en producción! Estamos trabajando arduamente para
            asegurarnos de que cumpla con los más altos estándares de calidad.
            ¡Pronto podrás disfrutar de él!
          </p>
          <br />
          <p>
            <strong
              >Completados {{ trackStatus.ready }} de
              {{ trackStatus.total }}</strong
            >
          </p>
        </div>
        <div class="page__footer">
          <button
            class="page__button"
            @click="$router.replace({ name: routes.track })"
          >
            Regresar
          </button>
        </div>
      </HomeColumn>
    </template>
    <template v-if="trackStatus.status === 2">
      <HomeColumn :banner="require('@/assets/images/on_the_way.svg')">
        <h1 class="page__title">¡Hola!</h1>
        <div class="page__content">
          <p>
            ¡Buenas noticias! Tu producto está en camino hacia ti. Nuestro
            equipo logístico se asegura de que sea entregado de manera segura y
            oportuna. Prepárate para recibirlo pronto y disfrutar de tu nueva
            adquisición.
          </p>
        </div>
        <div class="page__footer">
          <button
            class="page__button"
            @click="$router.replace({ name: routes.track })"
          >
            Regresar
          </button>
        </div>
      </HomeColumn>
    </template>
    <template v-if="trackStatus.status === 3">
      <HomeColumn :banner="require('@/assets/images/delivered.svg')">
        <h1 class="page__title">¡Hola!</h1>
        <div class="page__content">
          <p>
            ¡Felicidades! Tu producto ha sido entregado con éxito. Esperamos que
            lo disfrutes al máximo. Si tienes alguna pregunta o necesitas
            asistencia adicional, no dudes en contactarnos. Estamos aquí para
            ayudarte en todo lo que necesites.
          </p>
          <br />
          <template v-if="!hideRatingForm">
            <p>
              ¡Nos encantaría conocer tu experiencia! Ayúdanos a brindarte un
              mejor servicio compartiendo tus comentarios. Tu comentario será
              completamente anónimo y aparecerá al inicio de nuestra página,
              permitiendo que otros conozcan tus experiencias y se beneficien de
              ellas.
            </p>
          </template>
          <template v-else>
            <p>¡Gracias por compartir tu experiencia!</p>
          </template>
          <br />
        </div>
        <template v-if="!hideRatingForm">
          <ConfigInput
            :label="'Opinión'"
            :input-id="'comment'"
            :info="'<h3>¿Por qué te pedimos tu opinión?</h3>Valoramos tu opinión porque tu satisfacción y experiencia son nuestra prioridad. Tu retroalimentación nos ayuda a mejorar nuestros productos y servicios, así como a entender mejor tus necesidades y preferencias.'"
            :type="'text'"
            :alert-info="commentInfo"
            v-model="comment"
          ></ConfigInput>
          <ConfigRange
            label="Calificación"
            measurement-unit="estrellas"
            input-id="rating"
            v-model="rating"
            info="<h3>¿Por qué te pedimos tu calificación?</h3>Solicitamos tu calificación (de 1 a 5) porque tu opinión es extremadamente valiosa para nosotros. Nos ayuda a evaluar y medir cómo estamos cumpliendo con tus expectativas. Tu calificación nos permite identificar áreas en las que podemos mejorar y seguir brindándote un mejor servicio en el futuro."
            :min="1"
            :max="5"
          ></ConfigRange>
        </template>
        <div class="page__footer">
          <button
            class="page__button"
            @click="$router.replace({ name: routes.track })"
          >
            Regresar
          </button>
          <button v-if="!hideRatingForm" class="page__button" @click="onRating">
            Calificar
          </button>
        </div>
      </HomeColumn>
    </template>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import HomeColumn from "../components/Column.vue";
import ConfigRange from "@/modules/shared/components/Range.vue";
import ConfigInput from "@/modules/shared/components/Input.vue";
import { useRoute } from "vue-router";
import useTrack from "../composables/useTrack";
import routes from "@/routes";
import useSetRating, { RegistrationStatus } from "../composables/useSetRating";

export default defineComponent({
  name: "TrackItem",
  components: {
    HomeColumn,
    ConfigRange,
    ConfigInput,
  },
  setup() {
    const route = useRoute();
    const hideRatingForm = ref(false);
    const { trackStatus, loadData } = useTrack();
    const { setRatingAsync } = useSetRating();
    const trackId = computed(() => {
      return route.params.trackId as string;
    });
    const comment = ref("");
    const commentInfo = ref("");
    const rating = ref(5);
    loadData(trackId.value);
    watch(trackStatus, (newValue) => {
      hideRatingForm.value = newValue.rating;
    });
    return {
      routes,
      rating,
      comment,
      commentInfo,
      trackStatus,
      hideRatingForm,
      onRating: async () => {
        commentInfo.value = "";
        const [resp, status] = await setRatingAsync({
          comment: comment.value,
          qualification: rating.value,
          owner: trackId.value,
        });
        if (status === RegistrationStatus.Created) {
          hideRatingForm.value = true;
        } else if (status === RegistrationStatus.NotCreated) {
          const { detail } = resp;
          detail.forEach((error) => {
            commentInfo.value = error.msg;
          });
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
.page {
  height: calc(100vh - 80px);
  overflow-y: scroll;
  padding: 32px 120px 120px 120px;

  @media (max-width: 576px) {
    padding: 32px 48px 48px 48px;
  }

  &__title {
    font-size: 2.5em;

    &--sub {
      color: map-get($map: $color-palette, $key: second);
      font-size: 2em;
      width: fit-content;
    }
  }

  &__content {
    font-size: 1.5em;

    &--justify {
      text-align: justify;
    }
  }

  &__footer {
    @include grid(24px, row, min-content, 200px, 1fr, center, center);
    margin-top: 50px;
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

    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
</style>
