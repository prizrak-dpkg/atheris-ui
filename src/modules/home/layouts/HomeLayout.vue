<template>
  <router-view v-slot="{ Component }">
    <component v-bind:is="Component">
      <template v-slot:header>
        <HomeNavbar></HomeNavbar>
      </template>
      <template v-slot:footer>
        <HomeFooter></HomeFooter>
      </template>
    </component>
  </router-view>
</template>

<script lang="ts">
import HomeFooter from "../components/Footer.vue";
import HomeNavbar from "../components/Navbar.vue";

export default {
  name: "HomeLayout",
  components: {
    HomeFooter,
    HomeNavbar,
  },
};
</script>
