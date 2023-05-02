import api, {
  PagedSlideInterface,
  SlideInterface as ApiSlideInterface,
} from "@/modules/shared/api";
import { Ref, ref } from "vue";
import { AxiosResponse } from "axios";
import { SlideInterface } from "../components/Slide.vue";
import routes from "@/routes";

export default () => {
  const getData = async (): Promise<ApiSlideInterface[]> => {
    const { data }: AxiosResponse<PagedSlideInterface> = await api.get(
      "/product_slide"
    );
    return data.results;
  };
  const slides: Ref<SlideInterface[]> = ref([]);
  const loadData = async () => {
    const slideData = await getData();
    slides.value = slideData.map(
      (slide): SlideInterface => ({
        title: slide.title,
        desc: slide.desc,
        banner: `${api.getUri()}${slide.banner}`,
        link: {
          desc:
            slide.title === "Camisetas"
              ? "¡Diseña la tuya!"
              : "¡Diseña el tuyo!",
          to: routes.design,
        },
        slideInfo: {
          classIcon: [
            slide.title === "Camisetas" ? "slide__t-shirt" : "slide__hoodie",
          ],
          title: slide.slideInfo.slide_title,
          desc: slide.slideInfo.slide_desc,
          specifications: slide.slideInfo.specifications.map(
            (specification) => ({
              title: specification.specification_title,
              desc: specification.specification_desc,
            })
          ),
        },
      })
    );
  };
  return {
    slides,
    loadData,
  };
};
