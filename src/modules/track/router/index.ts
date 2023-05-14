export default {
  name: "track",
  component: () =>
    import(
      /* webpackChunkName: "Home Layout" */ "@/modules/shared/layouts/SharedLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "track-page",
      component: () =>
        import(
          /* webpackChunkName: "Home Page" */ "@/modules/track/views/TrackPage.vue"
        ),
    },
    {
      path: ":trackId",
      name: "track-item",
      component: () =>
        import(
          /* webpackChunkName: "Requests List" */ "@/modules/track/views/TrackItem.vue"
        ),
    },
  ],
};
