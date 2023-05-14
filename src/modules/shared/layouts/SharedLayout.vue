<template>
  <router-view v-slot="{ Component }">
    <component v-bind:is="Component">
      <template v-slot:header>
        <SharedNavbar></SharedNavbar>
      </template>
      <template v-slot:footer>
        <SharedFooter></SharedFooter>
      </template>
    </component>
  </router-view>
</template>

<script lang="ts">
import SharedFooter from "../components/Footer.vue";
import SharedNavbar from "../components/Navbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SharedLayout",
  components: {
    SharedFooter,
    SharedNavbar,
  },
});
</script>
