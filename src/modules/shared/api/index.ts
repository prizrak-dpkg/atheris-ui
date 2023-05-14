import axios from "axios";

export interface ErrorResponseInterface {
  detail: {
    field: string;
    msg: string;
  }[];
}

export interface SlideInterface {
  id: string;
  title: string;
  desc: string;
  banner: string;
  slideInfo: {
    slide_title: string;
    slide_desc: string;
    specifications: {
      specification_title: string;
      specification_desc: string;
    }[];
  };
}

export interface RatingInterface {
  id: string;
  comment: string;
  qualification: number;
  average: number;
}

export interface PagedSlideInterface {
  total: number;
  num_pages: number;
  current_page: number;
  per_page: number;
  results: SlideInterface[];
}

export interface PagedRatingInterface {
  total: number;
  num_pages: number;
  current_page: number;
  per_page: number;
  results: RatingInterface[];
}

export interface TrackStatusInterface {
  total: number;
  ready: number;
  status: number;
  rating: boolean;
}

export const isErrorResponse = (
  resp: unknown
): resp is ErrorResponseInterface => {
  if (typeof resp !== "object" || resp === null) {
    return false;
  }
  if (!Object.hasOwnProperty.call(resp, "detail")) {
    return false;
  }
  const errorResponse = resp as ErrorResponseInterface;
  if (
    typeof errorResponse.detail !== "object" ||
    errorResponse.detail === null
  ) {
    return false;
  }
  if (!Array.isArray(errorResponse.detail)) {
    return false;
  }
  for (const item of errorResponse.detail) {
    if (
      typeof item !== "object" ||
      typeof item.field !== "string" ||
      typeof item.msg !== "string"
    ) {
      return false;
    }
  }
  return true;
};

export default axios.create({
  baseURL: "http://localhost:8888/api",
});
