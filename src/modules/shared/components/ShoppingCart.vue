<template>
  <div class="sc__drop-down" :class="open">
    <div class="sc__header">
      <h3>Carrito de compras</h3>
      <i class="sc__close" @click="closeShoppingCart"></i>
    </div>
    <div class="sc__content">
      <div v-if="step === 1">
        <template v-if="shoppingList.length > 0">
          <ProductItem
            v-for="item in shoppingList"
            :key="item.index"
            :index="item.index"
            :product="item.product"
            :color="item.color"
            :price="item.price"
          ></ProductItem>
        </template>
        <div class="sc__default" v-else>
          <p class="sc__ctext">
            Aún no has añadido productos a tu carrito de compras.
          </p>
          <i class="sc__shopping-cart-x"></i>
        </div>
      </div>
      <div v-if="step === 2">
        <h1>DETALLES DE TU ORDEN</h1>
        <div class="sc__product-count">
          <p class="sc__text sc__text--wo-margin">Cantidad de productos</p>
          <p class="sc__text sc__text--wo-margin">{{ shoppingListCount }}</p>
        </div>
        <div class="sc__product-count">
          <p class="sc__text sc__text--wo-margin">Costo de envío</p>
          <p class="sc__text sc__text--wo-margin">{{ sendPrice }}</p>
        </div>
        <div class="sc__product-total">
          <p class="sc__text sc__text--wo-margin">Total a pagar</p>
          <p class="sc__text sc__text--wo-margin">{{ shoppingListPrice }}</p>
        </div>
        <h1>FACTURACIÓN</h1>
        <p class="sc__text">Ayúdanos a completar tu información</p>
        <ConfigInput
          :label="'Cédula'"
          :input-id="'documentNumber'"
          :info="'<h3>¿Por qué te pedimos tu cédula?</h3>La DIAN nos exige tu número de cédula para cumplir con las regulaciones fiscales y contables.'"
          :type="'number'"
          :alert-info="infoValue.documentNumber"
          v-model="customer.documentNumber"
        ></ConfigInput>
        <ConfigInput
          :label="'Nombre completo'"
          :input-id="'names'"
          :info="'<h3>¿Por qué te pedimos tu nombre completo?</h3>La DIAN nos exige tu nombre completo para cumplir con las regulaciones fiscales y contables.'"
          :type="'text'"
          :alert-info="infoValue.names"
          v-model="customer.names"
        ></ConfigInput>
        <ConfigInput
          :label="'Número celular'"
          :input-id="'cellphoneNumber'"
          :info="'<h3>¿Por qué te pedimos tu número celular?</h3>Es la manera más rápida que tenemos para comunicarnos contigo.'"
          :type="'number'"
          :alert-info="infoValue.cellPhoneNumber"
          v-model="customer.cellPhoneNumber"
        ></ConfigInput>
        <ConfigInput
          :label="'Correo electrónico'"
          :input-id="'email'"
          :info="'<h3>¿Por qué te pedimos tu correo electrónico?</h3>Te enviaremos notificaciones sobre el estado de tu pedido.'"
          :type="'email'"
          :alert-info="infoValue.email"
          v-model="customer.email"
        ></ConfigInput>
        <ConfigInput
          :label="'Ciudad o Municipio'"
          :input-id="'city'"
          :info="'<h3>¿Por qué te pedimos tu Ciudad o Municipio?</h3>Es una forma que tenemos de clasificar los envíos a distintas partes del país.'"
          :type="'text'"
          :alert-info="infoValue.city"
          v-model="customer.city"
        ></ConfigInput>
        <ConfigInput
          :label="'Dirección de entrega'"
          :input-id="'address'"
          :info="'<h3>¿Por qué te pedimos tu dirección?</h3>Necesitamos saber la dirección de entrega, por favor especifique cualquier cosa que pueda ayudarnos a encontrar su ubicación fácilmente.'"
          :type="'text'"
          :alert-info="infoValue.address"
          v-model="customer.address"
        ></ConfigInput>
      </div>
      <div v-if="step === 3">
        <div class="sc__limit">
          <h1 class="sc__text--center">¡SU PEDIDO ESTARÁ LISTO PRONTO!</h1>
          <p class="sc__text sc__text--center">
            Su pedido se ha añadido correctamente a la cola, puede comprobar el
            estado de su pedido, en la sección "Seguimiento de su producto",
            utilizando el siguiente código:
          </p>
          <p class="sc__hash">{{ hash }}</p>
          <button class="sc__sc-button" @click="goTrack" type="button">
            <i class="sc__map"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="sc__footer">
      <button class="sc__button" type="button" @click="onBack" v-if="step == 2">
        Atrás
      </button>
      <button
        class="sc__button"
        type="submit"
        @click="onSubmit"
        v-if="shoppingList.length > 0"
      >
        {{ nextText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from "vue";
import { useStore } from "vuex";
import ProductItem from "@/modules/design/components/ProductItem.vue";
import ConfigInput from "@/modules/shared/components/Input.vue";
import routes from "@/routes";
import { useRouter } from "vue-router";
import useRegister, {
  RegistrationStatus,
} from "@/modules/design/composables/useRegister";
import {
  CustomerRegisterInfoInterface,
  CustomerRegisterInterface,
  ShoppingListItemInterface,
} from "../types";

export default defineComponent({
  name: "ShoppingCart",
  components: {
    ConfigInput,
    ProductItem,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { createCustomer } = useRegister();
    const nextText = ref("Siguiente");
    const step = ref(1);
    const hash = ref("");
    const shoppingList = computed(
      () =>
        store.getters["design/getShoppingList"] as ShoppingListItemInterface[]
    );
    const shoppingListCount = computed(() => {
      return store.getters["design/getShoppingListCount"];
    });
    const sendPrice = computed(() => {
      return store.getters["design/getSendPrice"];
    });
    const shoppingListPrice = computed(() => {
      return store.getters["design/getShoppingListPrice"];
    });
    const open = computed(() => ({
      "sc__drop-down--open": store.getters["design/getOpenShoppingCart"],
    }));
    const customer: Ref<CustomerRegisterInterface> = ref({
      documentNumber: 0,
      names: "",
      cellPhoneNumber: 0,
      email: "",
      city: "",
      address: "",
    });
    const customerInfo = (): CustomerRegisterInfoInterface => {
      return {
        documentNumber: "",
        names: "",
        cellPhoneNumber: "",
        email: "",
        city: "",
        address: "",
      };
    };
    const closeShoppingCart = () => {
      store.commit("design/closeShoppingCart");
    };
    const infoValue: Ref<CustomerRegisterInfoInterface> = ref(customerInfo());
    return {
      routes,
      open,
      hash,
      step,
      nextText,
      shoppingList,
      shoppingListCount,
      sendPrice,
      customer,
      infoValue,
      shoppingListPrice,
      goTrack: () => {
        closeShoppingCart();
        router.replace({ name: routes.track });
      },
      onBack: () => {
        nextText.value = "Siguiente";
        if (step.value > 1) step.value -= 1;
      },
      onSubmit: async () => {
        if (step.value === 2) {
          infoValue.value = customerInfo();
          const [resp, status] = await createCustomer(customer);
          if (status === RegistrationStatus.Created) {
            hash.value = resp.hash;
            step.value = 3;
          } else if (status === RegistrationStatus.NotCreated) {
            const { detail } = resp;
            detail.forEach((error) => {
              if (Object.hasOwnProperty.call(infoValue.value, error.field)) {
                const key = error.field as keyof CustomerRegisterInfoInterface;
                infoValue.value[key] = error.msg;
              }
            });
          }
        }
        if (step.value < 2) step.value += 1;
      },
      closeShoppingCart,
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
$assets: (
  close: var(--assets-close),
  shopping-cart-x: var(--assets-shopping-cart-x),
  map: var(--assets-map),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 25px;
  width: 25px;
}
.sc {
  &__default {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  }

  &__limit {
    display: grid;
    justify-items: center;
    gap: 24px;
    width: 80%;
    margin: auto;

    @media (max-width: 576px) {
      width: 100%;
    }
  }

  &__sc-button {
    border: solid 2px map-get($map: $color-palette, $key: third);
    background: none;
    border-radius: 24px;
    padding: 2em;

    &:hover,
    &:active {
      cursor: pointer;
    }

    &:hover,
    &:active > .config__shopping-cart {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__hash {
    border: solid 2px map-get($map: $color-palette, $key: third);
    background: none;
    border-radius: 24px;
    font-size: 1.4em;
    font-weight: bold;
    padding: 12px 24px;
    user-select: text;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 12px 24px;
    color: map-get($map: $color-palette, $key: second);
    box-shadow: 0px 0px 30px -15px rgb(48, 48, 48);
  }

  &__ctext {
    font-size: 1em;
    padding: 12px;
    text-align: center;
  }

  &__text {
    font-size: 1.5em;
    margin-bottom: 12px;

    &--center {
      text-align: center;
    }

    &--wo-margin {
      margin: 0px;
    }
  }

  &__product-count {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-bottom: solid 1px map-get($map: $color-palette, $key: first);
    margin-bottom: 12px;
  }

  &__product-total {
    display: flex;
    justify-content: space-between;
    padding: 12px 24px;
    background: map-get($map: $color-palette, $key: third);
    border-radius: 24px;
    margin-bottom: 24px;
  }

  &__content {
    font-size: 12px;
    height: calc(100% - 120px);
    padding: 24px;
    overflow-y: scroll;
  }

  &__footer {
    height: 66px;
    padding: 6px 0px;
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  &__close {
    @include icon();
    background-image: map-get($map: $assets, $key: close);
    height: 30px;
    width: 30px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__shopping-cart-x {
    @include icon();
    background-image: map-get($map: $assets, $key: shopping-cart-x);
    height: 8em;
    width: 8em;
  }

  &__map {
    @include icon();
    background-image: map-get($map: $assets, $key: map);
    height: 8em;
    width: 8em;
  }

  &__drop-down {
    background-color: map-get($map: $color-palette, $key: fourth);
    box-shadow: 0px 0px 25px -25px rgb(48, 48, 48);
    font-size: 16px;
    height: calc(100vh - 80px);
    justify-content: space-between;
    max-width: 500px;
    overflow-y: scroll;
    position: fixed;
    right: -100vw;
    top: 80px;
    transition: right 0.25s ease-in-out;
    user-select: none;
    width: 100%;
    z-index: 1000;

    &--open {
      right: 0px;
    }

    &-item {
      display: flex;
      height: 60px;

      &:hover,
      &:active {
        box-shadow: inset -15px 0px 25px -25px rgb(48, 48, 48);
        cursor: pointer;
      }
    }

    &-link {
      color: map-get($map: $color-palette, $key: first);
      height: 100%;
      line-height: 60px;
      text-align: center;
      width: 100%;

      &:hover,
      &:active {
        text-decoration: underline;
      }
    }
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
}
</style>
