import {
  DesignModeEnum,
  ShoppingListItemInterface,
} from "@/modules/shared/types";
import { ProductInterface } from "../types";

export const getAge = (state: ProductInterface) => {
  return state.customerProfile.age;
};

export const getHeight = (state: ProductInterface) => {
  return state.customerProfile.height;
};

export const getWeight = (state: ProductInterface) => {
  return state.customerProfile.weight;
};

export const getShoeSize = (state: ProductInterface) => {
  return state.customerProfile.shoeSize;
};

export const getBodyType = (state: ProductInterface) => {
  return state.customerProfile.bodyType;
};

export const getChestWidth = (state: ProductInterface) => {
  return state.productMeasures.chestWidth.toFixed(1);
};

export const getNeckToHipHeight = (state: ProductInterface) => {
  return state.productMeasures.neckToHipHeight.toFixed(1);
};

export const getSleeveLengthHoodie = (state: ProductInterface) => {
  return state.productMeasures.sleeveLengthHoodie.toFixed(1);
};

export const getSleeveLengthShirt = (state: ProductInterface) => {
  return state.productMeasures.sleeveLengthShirt.toFixed(1);
};

export const getWaistWidth = (state: ProductInterface) => {
  return state.productMeasures.waistWidth.toFixed(1);
};

export const getPrimaryColor = (state: ProductInterface) => {
  return state.productColors.primaryColor;
};

export const getSecondColor = (state: ProductInterface) => {
  return state.productColors.secondColor;
};

export const getOpenShoppingCart = (state: ProductInterface) => {
  return state.openShoppingCart;
};

export const getShoppingList = (state: ProductInterface) => {
  return state.productList.map((item, index) => ({
    index,
    product:
      item.mode === DesignModeEnum.TShirt
        ? "Camiseta atheris"
        : "Hoodie atheris",
    color: `${item.productColors.primaryColor
      .toUpperCase()
      .replace("_", "")} & ${item.productColors.secondColor
      .toUpperCase()
      .replace("_", "")}`,
    price: item.mode === DesignModeEnum.TShirt ? 54900 : 79900,
  })) as ShoppingListItemInterface[];
};

export const getShoppingListCount = (state: ProductInterface) => {
  return state.productList.length;
};

export const getSendPrice = (state: ProductInterface) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(state.productList.length > 2 ? 0 : 8000);
};

export const getShoppingListPrice = (state: ProductInterface) => {
  const sendPrice = state.productList.length > 2 ? 0 : 8000;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.productList.reduce((previousValue, currentObject) => {
      const currentValue =
        currentObject.mode === DesignModeEnum.TShirt ? 54900 : 79900;
      return previousValue + currentValue;
    }, 0) + sendPrice
  );
};

export const getProductConfig = (state: ProductInterface) => {
  return {
    mode: state.mode,
    customerProfile: {
      age: state.customerProfile.age,
      height: state.customerProfile.height,
      weight: state.customerProfile.weight,
      shoeSize: state.customerProfile.shoeSize,
      bodyType: state.customerProfile.bodyType,
    },
    productMeasures: {
      chestWidth: state.productMeasures.chestWidth,
      waistWidth: state.productMeasures.waistWidth,
      neckToHipHeight: state.productMeasures.neckToHipHeight,
      sleeveLengthShirt: state.productMeasures.sleeveLengthShirt,
      sleeveLengthHoodie: state.productMeasures.sleeveLengthHoodie,
    },
    productColors: {
      primaryColor: state.productColors.primaryColor,
      secondColor: state.productColors.secondColor,
    },
  };
};

export const getProductList = (state: ProductInterface) => {
  return state.productList.map((item) => ({
    primaryColor: item.productColors.primaryColor,
    secondColor: item.productColors.secondColor,
    chestWidth: item.productMeasures.chestWidth,
    waistWidth: item.productMeasures.waistWidth,
    neckToHipHeight: item.productMeasures.neckToHipHeight,
    sleeveLengthShirt: item.productMeasures.sleeveLengthShirt,
    sleeveLengthHoodie: item.productMeasures.sleeveLengthHoodie,
    age: item.customerProfile.age,
    height: item.customerProfile.height,
    weight: item.customerProfile.weight,
    shoeSize: item.customerProfile.shoeSize,
    bodyType: item.customerProfile.bodyType,
  }));
};
