export default {
  name: "design",
  component: () =>
    import(
      /* webpackChunkName: "Design Layout" */ "@/modules/design/layouts/DesignLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "design-page",
      component: () =>
        import(
          /* webpackChunkName: "Design Layout" */ "@/modules/design/views/DesignPage.vue"
        ),
    },
  ],
};
