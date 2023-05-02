import { ActionContext } from "vuex";
import { isAxiosError } from "axios";
import { CustomerRegisterInterface } from "@/modules/shared/types";
import { ProductInterface, ProductListInterface } from "../types";
import api from "@/modules/shared/api";
import store from "@/store";

export const createCustomerAsync = async (
  context: ActionContext<ProductInterface, ProductInterface>,
  customer: CustomerRegisterInterface
) => {
  const { commit } = context;
  const { documentNumber, names, email, cellPhoneNumber, city, address } =
    customer;
  try {
    const productList: ProductListInterface =
      store.getters["design/getProductList"];
    const { data } = await api.post("/customer", {
      customer: {
        documentNumber,
        names,
        cellPhoneNumber,
        email,
        city,
        address,
      },
      productList,
    });
    commit("resetState");
    commit("resetShoppingList");
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
