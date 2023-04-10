export default {
  name: "home",
  component: () =>
    import(
      /* webpackChunkName: "Home Layout" */ "@/modules/home/layouts/HomeLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "home-page",
      component: () =>
        import(
          /* webpackChunkName: "Home Layout" */ "@/modules/home/views/HomePage.vue"
        ),
    },
  ],
};
