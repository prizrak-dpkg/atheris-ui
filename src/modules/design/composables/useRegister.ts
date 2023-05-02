import { Ref } from "vue";
import { useStore } from "vuex";
import { CustomerRegisterInterface } from "../../shared/types/index";
import { ErrorResponseInterface, isErrorResponse } from "@/modules/shared/api";

export enum RegistrationStatus {
  Created = "CREATED",
  NotCreated = "NOTCREATED",
  UnexpectedError = "UNEXPECTEDERROR",
}

type CreateUserReturnType =
  | [SuccessfulResponseInterface, RegistrationStatus.Created]
  | [ErrorResponseInterface, RegistrationStatus.NotCreated]
  | [null, RegistrationStatus.UnexpectedError];

type CreateUserFunction = (
  user: Ref<CustomerRegisterInterface>
) => Promise<CreateUserReturnType>;

export interface SuccessfulResponseInterface {
  hash: string;
}

export const isSuccessfulResponse = (
  resp: unknown
): resp is SuccessfulResponseInterface => {
  if (typeof resp !== "object" || resp === null) {
    return false;
  }
  if (!Object.hasOwnProperty.call(resp, "hash")) {
    return false;
  }
  const successfulResponse = resp as SuccessfulResponseInterface;
  return typeof successfulResponse.hash === "string";
};

export default () => {
  const store = useStore();
  const createCustomer: CreateUserFunction = async (
    customer: Ref<CustomerRegisterInterface>
  ) => {
    const resp = await store.dispatch(
      "design/createCustomerAsync",
      customer.value
    );
    if (isSuccessfulResponse(resp)) {
      return [resp, RegistrationStatus.Created];
    } else if (isErrorResponse(resp)) {
      return [resp, RegistrationStatus.NotCreated];
    } else {
      return [null, RegistrationStatus.UnexpectedError];
    }
  };
  return {
    createCustomer,
  };
};
