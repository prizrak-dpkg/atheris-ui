import { isAxiosError } from "axios";
import { RatingRegisterInterface } from "@/modules/shared/types";
import api, {
  ErrorResponseInterface,
  isErrorResponse,
} from "@/modules/shared/api";

export enum RegistrationStatus {
  Created = "CREATED",
  NotCreated = "NOTCREATED",
  UnexpectedError = "UNEXPECTEDERROR",
}

type CreateRatingReturnType =
  | [SuccessfulResponseInterface, RegistrationStatus.Created]
  | [ErrorResponseInterface, RegistrationStatus.NotCreated]
  | [null, RegistrationStatus.UnexpectedError];

type CreateRatingFunction = (
  rating: RatingRegisterInterface
) => Promise<CreateRatingReturnType>;

export interface SuccessfulResponseInterface {
  rating: string;
}

export const isSuccessfulResponse = (
  resp: unknown
): resp is SuccessfulResponseInterface => {
  if (typeof resp !== "object" || resp === null) {
    return false;
  }
  if (!Object.hasOwnProperty.call(resp, "rating")) {
    return false;
  }
  const successfulResponse = resp as SuccessfulResponseInterface;
  return typeof successfulResponse.rating === "string";
};

export default () => {
  const createRatingAsync = async (rating: RatingRegisterInterface) => {
    const { comment, qualification, owner } = rating;
    try {
      const { data } = await api.post("/rating", {
        comment,
        qualification,
        owner,
      });
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response) {
          return error.response.data;
        } else if (error.request) {
          return error.request;
        } else {
          return error;
        }
      }
      return error;
    }
  };
  const setRatingAsync: CreateRatingFunction = async (
    rating: RatingRegisterInterface
  ) => {
    const resp = await createRatingAsync(rating);
    if (isSuccessfulResponse(resp)) {
      return [resp, RegistrationStatus.Created];
    } else if (isErrorResponse(resp)) {
      return [resp, RegistrationStatus.NotCreated];
    } else {
      return [null, RegistrationStatus.UnexpectedError];
    }
  };

  return {
    setRatingAsync,
  };
};
