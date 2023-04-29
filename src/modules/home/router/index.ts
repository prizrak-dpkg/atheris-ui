export default {
  name: "home",
  component: () =>
    import(
      /* webpackChunkName: "Home Layout" */ "@/modules/shared/layouts/SharedLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "home-page",
      component: () =>
        import(
          /* webpackChunkName: "Home Page" */ "@/modules/home/views/HomePage.vue"
        ),
    },
  ],
};
