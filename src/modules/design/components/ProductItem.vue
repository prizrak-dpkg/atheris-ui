<template>
  <li class="product-container">
    <div class="product-container__info">
      <span class="product-container__info-text">{{ props.product }}</span>
      <span class="product-container__info-text">{{ props.color }}</span>
      <span class="product-container__info-text">{{ formattedValue }}</span>
    </div>
    <div class="product-container__options">
      <i class="product-container__delete" @click="removeInvoice"></i>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "ProductItem",
  props: {
    index: {
      type: Number,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    return {
      props,
      formattedValue: computed(() => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(props.price);
      }),
      removeInvoice: () => {
        store.commit("design/removeProduct", props.index);
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
$assets: (
  delete: var(--assets-delete),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 24px;
  width: 24px;
}
.product-container {
  position: relative;
  display: grid;
  border: 2px solid map-get($map: $color-palette, $key: second);
  grid-template-columns: calc(100% - 3.6rem) 3.2rem;
  border-radius: 0.8rem;
  height: 14rem;
  margin: 1.6rem 0;
  padding: 0.8rem;
  align-items: center;

  &__info {
    display: flex;
    flex-direction: column;
    color: map-get($map: $color-palette, $key: fourth);
    font-weight: 600;
    padding: 1.2rem;

    &-text {
      color: map-get($map: $color-palette, $key: first);
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      white-space: nowrap;
    }
  }

  &__delete {
    @include icon();
    background-image: map-get($map: $assets, $key: delete);
    width: 3.2rem;
    height: 3.2rem;

    &:hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    width: 3.2rem;
    height: 100%;
    justify-content: space-evenly;
  }
}
</style>
