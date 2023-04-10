<template>
  <nav>
    <div class="navbar__container">
      <router-link
        :to="{ name: routes.home }"
        @dragstart.prevent=""
        :replace="true"
        ><i class="navbar__logo navbar__logo-toggle" @click="hideMenu"></i
      ></router-link>
      <div class="navbar__right-options">
        <i class="navbar__shopping-cart" @click="hideMenu"></i>
        <span class="navbar__counter">+9</span>
        <i
          ref="toggleButtonRef"
          :class="dropMenu"
          @click="() => (openDropMenu = !openDropMenu)"
        ></i>
      </div>
    </div>
    <ul class="navbar__drop-down" :class="open" ref="navigationRef">
      <div ref="firstGroupRef">
        <li class="navbar__drop-down-item">
          <router-link
            :to="{ name: routes.design }"
            class="navbar__drop-down-link"
            @click="hideMenu"
            @dragstart.prevent=""
            :replace="true"
            >Diseña tu producto</router-link
          >
        </li>
        <li class="navbar__drop-down-item">
          <router-link
            :to="{ name: routes.community }"
            class="navbar__drop-down-link"
            @click="hideMenu"
            @dragstart.prevent=""
            :replace="true"
            >Diseños de la comunidad</router-link
          >
        </li>
        <li class="navbar__drop-down-item">
          <router-link
            :to="{ name: routes.news }"
            class="navbar__drop-down-link"
            @click="hideMenu"
            @dragstart.prevent=""
            :replace="true"
            >Noticias</router-link
          >
        </li>
        <li class="navbar__drop-down-item">
          <router-link
            :to="{ name: routes.terms }"
            class="navbar__drop-down-link"
            @click="hideMenu"
            @dragstart.prevent=""
            :replace="true"
            >Términos y condiciones</router-link
          >
        </li>
        <li class="navbar__drop-down-item">
          <router-link
            :to="{ name: routes.about }"
            class="navbar__drop-down-link"
            @click="hideMenu"
            @dragstart.prevent=""
            :replace="true"
            >Acerca de</router-link
          >
        </li>
      </div>
      <div ref="secondGroupRef" :style="marginTop">
        <li class="navbar__drop-down-item">
          <router-link
            :to="{ name: routes.track }"
            class="navbar__drop-down-link"
            @click="hideMenu"
            @dragstart.prevent=""
            :replace="true"
            >Seguimiento de su producto</router-link
          >
        </li>
      </div>
    </ul>
  </nav>
</template>

<script lang="ts">
import {
  Ref,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  computed,
} from "vue";
import useClickOutside from "../composables/useClickOutside";
import routes from "@/routes";

export default defineComponent({
  name: "HomeNavbar",
  setup() {
    let onClickOutsideNavigation = (event: Event) => {
      event;
    };
    const openDropMenu = ref(false);
    const height = ref(0);
    const toggleButtonRef: Ref<HTMLElement | undefined> = ref();
    const navigationRef: Ref<HTMLUListElement | undefined> = ref();
    const firstGroupRef: Ref<HTMLDivElement | undefined> = ref();
    const secondGroupRef: Ref<HTMLDivElement | undefined> = ref();
    const handleResize = () => {
      height.value = window.innerHeight;
    };
    const calculateTopMargin = (height: number) => {
      if (
        firstGroupRef.value !== undefined &&
        secondGroupRef.value !== undefined
      ) {
        const heightItem = 60;
        const margin = 80;
        const childsFirstGroup = firstGroupRef.value.childElementCount;
        const childsSecondGroup = secondGroupRef.value.childElementCount;
        const marginTop =
          height -
          (childsFirstGroup * heightItem +
            childsSecondGroup * heightItem +
            margin);
        return { "margin-top": `${marginTop > 0 ? marginTop : 0}px` };
      }
      return { "margin-top": "0px" };
    };
    const open = computed(() => ({
      "navbar__drop-down--open": openDropMenu.value,
    }));
    const dropMenu = computed(() => ({
      "navbar__menu-list": !openDropMenu.value,
      "navbar__up-right": openDropMenu.value,
    }));
    const marginTop = computed(() => calculateTopMargin(height.value));
    onMounted(() => {
      const { onClickOutside } = useClickOutside(toggleButtonRef);
      const { onClickOutside: onClickOutsideNav } =
        useClickOutside(navigationRef);
      onClickOutsideNavigation = (event: Event) => {
        if (onClickOutside(event) && onClickOutsideNav(event))
          openDropMenu.value = false;
      };
      document.addEventListener("mousedown", onClickOutsideNavigation);
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      document.removeEventListener("mousedown", onClickOutsideNavigation);
      window.removeEventListener("resize", handleResize);
    });
    return {
      open,
      dropMenu,
      openDropMenu,
      marginTop,
      toggleButtonRef,
      navigationRef,
      firstGroupRef,
      secondGroupRef,
      routes,
      hideMenu: () => {
        openDropMenu.value = false;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
$color-palette: (
  first: var(--colors-first),
  second: var(--colors-second),
  fourth: var(--colors-fourth),
);
$assets: (
  atheris-hover: var(--assets-atheris-hover),
  atheris-min-hover: var(--assets-atheris-min-hover),
  atheris-min: var(--assets-atheris-min),
  atheris: var(--assets-atheris),
  drop-down-menu: var(--assets-drop-down-menu),
  right-arrow: var(--assets-right-arrow),
  shopping-cart: var(--assets-shopping-cart),
);
@mixin icon() {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 25px;
  width: 25px;
}
.navbar {
  &__container {
    align-items: center;
    background: map-get($map: $color-palette, $key: fourth);
    box-shadow: 0px 0px 30px -30px rgba(48, 48, 48, 1);
    display: flex;
    justify-content: space-between;
    left: 0;
    padding: 0px 32px;
    position: sticky;
    top: 0;
    user-select: none;
    width: 100%;
    z-index: 1000;
  }

  &__logo {
    @include icon();
    background-image: map-get($map: $assets, $key: atheris);
    height: 25px;
    width: 215px;

    &-toggle:hover,
    &-toggle:active {
      background-image: map-get($map: $assets, $key: atheris-hover);
    }

    @media (max-width: 576px) {
      background-image: map-get($map: $assets, $key: atheris-min);
      height: 30px;
      width: 35px;

      &-toggle:hover,
      &-toggle:active {
        background-image: map-get($map: $assets, $key: atheris-min-hover);
      }
    }
  }

  &__shopping-cart {
    @include icon();
    background-image: map-get($map: $assets, $key: shopping-cart);
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__menu-list {
    @include icon();
    background-image: map-get($map: $assets, $key: drop-down-menu);
    width: 30px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__up-right {
    @include icon();
    background-image: map-get($map: $assets, $key: right-arrow);
    height: 30px;
    width: 30px;
    &:hover,
    &:active {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  &__right-options {
    align-items: center;
    column-gap: 50px;
    display: grid;
    grid-template-columns: auto auto;
    height: 80px;
    position: relative;
  }

  &__counter {
    background: map-get($map: $color-palette, $key: second);
    border-radius: 50%;
    display: block;
    font-size: x-small;
    height: 20px;
    left: 15px;
    line-height: 20px;
    position: absolute;
    text-align: center;
    top: 15px;
    width: 25px;
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
    z-index: 100;

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
}
</style>
