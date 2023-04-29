import { DesignModeEnum } from "@/modules/shared/types";

export default {
  name: "design",
  component: () =>
    import(
      /* webpackChunkName: "Design Layout" */ "@/modules/shared/layouts/SharedLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "design-page",
      component: () =>
        import(
          /* webpackChunkName: "Design Navigation" */ "@/modules/design/views/DesignNavigation.vue"
        ),
    },
    {
      path: "",
      name: "design-t-shirt",
      component: () =>
        import(
          /* webpackChunkName: "Design T-Shirt" */ "@/modules/design/views/DesignPage.vue"
        ),
      props: {
        mode: DesignModeEnum.TShirt,
      },
    },
    {
      path: "",
      name: "design-hoodie",
      component: () =>
        import(
          /* webpackChunkName: "Design Hoodie" */ "@/modules/design/views/DesignPage.vue"
        ),
      props: {
        mode: DesignModeEnum.Hoodie,
      },
    },
  ],
};
