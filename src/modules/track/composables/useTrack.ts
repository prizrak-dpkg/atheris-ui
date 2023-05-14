import api, { TrackStatusInterface } from "@/modules/shared/api";
import { Ref, ref } from "vue";
import { AxiosResponse } from "axios";

export default () => {
  const getData = async (track: string): Promise<TrackStatusInterface> => {
    const { data }: AxiosResponse<TrackStatusInterface> = await api.get(
      "/track",
      {
        params: {
          track,
        },
      }
    );
    return data;
  };
  const trackStatus: Ref<TrackStatusInterface> = ref({
    total: 0,
    ready: 0,
    status: 0,
    rating: true,
  });
  const loadData = async (track: string) => {
    const status = await getData(track);
    trackStatus.value = status;
  };
  return {
    trackStatus,
    loadData,
  };
};
