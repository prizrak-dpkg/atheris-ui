import api, {
  PagedRatingInterface,
  RatingInterface as ApiRatingInterface,
} from "@/modules/home/api";
import { Ref, ref } from "vue";
import { AxiosResponse } from "axios";
import { RatingInterface } from "../components/Rating.vue";

export default () => {
  const getData = async (
    page: number
  ): Promise<[ApiRatingInterface, number, number]> => {
    const { data }: AxiosResponse<PagedRatingInterface> = await api.get(
      "/rating",
      {
        params: {
          limit: 1,
          page,
        },
      }
    );
    return [
      data.results.length > 0
        ? data.results[0]
        : { id: "", comment: "", qualification: 0, average: 0 },
      data.num_pages,
      data.current_page,
    ];
  };
  const rating: Ref<RatingInterface> = ref({
    total: 0,
    average: 0,
    consecutive: 0,
    comment: "",
    qual: 0,
  });
  const loadData = async (page = 1) => {
    const [ratingData, total, consecutive] = await getData(page);
    rating.value = {
      total,
      average: ratingData.average,
      consecutive,
      comment: ratingData.comment,
      qual: ratingData.qualification,
    };
  };
  return {
    rating,
    loadData,
  };
};
