import { DesignModeEnum } from "@/modules/shared/types";
import {
  BodyTypeEnum,
  ProductConfigInterface,
  ProductInterface,
} from "../types";
import { InitialState } from "./state";

export const setProductMeasures = (
  state: ProductInterface,
  payload: number
) => {
  const mode = state.mode === DesignModeEnum.TShirt ? 1.5 : 1.6;
  const { height, weight, age, shoeSize, bodyType } = state.customerProfile;
  let lossPercentage = 0;
  if (age > 30) {
    const decades = Math.floor((age - 30) / 10);
    lossPercentage = (0.8 * decades) / height;
  }
  const maxBmi = 60;
  const minBmi = 16;
  const offset = mode + payload / 10;
  const headMeasure = (22.5 * height) / 180;
  const neckToHipHeight = Math.ceil(headMeasure * 3.2);
  const bmiRounded = Math.round(weight / ((height / 100) * (height / 100)));
  const bmiLevel =
    bmiRounded > maxBmi ? maxBmi : bmiRounded < minBmi ? minBmi : bmiRounded;
  const bmiScale = offset / (maxBmi - minBmi - 1);
  const widthMultiplier = offset + bmiLevel * bmiScale;
  const chestWidth = Math.round(headMeasure * widthMultiplier);
  const cmShoeSize = shoeSize / 1.5;
  const hoodieSleeve = Math.ceil(cmShoeSize * 2.2);
  const tShirtSleeve = Math.ceil(cmShoeSize * 0.6);
  let waistWidth;
  if (bodyType === BodyTypeEnum.WIDER) {
    waistWidth = chestWidth * 0.91;
  } else if (bodyType === BodyTypeEnum.SAME) {
    waistWidth = chestWidth * 0.98;
  } else {
    waistWidth = chestWidth * 1.05;
  }
  state.productMeasures.chestWidth = Math.round(
    chestWidth - chestWidth * lossPercentage
  );
  state.productMeasures.waistWidth = Math.round(
    waistWidth - waistWidth * lossPercentage
  );
  state.productMeasures.neckToHipHeight = Math.round(neckToHipHeight);
  state.productMeasures.sleeveLengthShirt = Math.round(tShirtSleeve);
  state.productMeasures.sleeveLengthHoodie = Math.round(hoodieSleeve);
};

export const setCustomerProfile = (
  state: ProductInterface,
  payload: ProductInterface["customerProfile"]
) => {
  state.customerProfile.age = payload.age
    ? payload.age
    : state.customerProfile.age;
  state.customerProfile.height = payload.height
    ? payload.height
    : state.customerProfile.height;
  state.customerProfile.weight = payload.weight
    ? payload.weight
    : state.customerProfile.weight;
  state.customerProfile.shoeSize = payload.shoeSize
    ? payload.shoeSize
    : state.customerProfile.shoeSize;
  state.customerProfile.bodyType = payload.bodyType
    ? payload.bodyType
    : state.customerProfile.bodyType;
};

export const setMode = (
  state: ProductInterface,
  payload: ProductInterface["mode"]
) => {
  state.mode = payload ? payload : state.mode;
};

export const setColors = (
  state: ProductInterface,
  payload: ProductInterface["productColors"]
) => {
  state.productColors = payload ? payload : state.productColors;
};

export const resetState = (state: ProductInterface) => {
  state.mode = InitialState.mode;
  state.customerProfile = {
    age: InitialState.customerProfile.age,
    height: InitialState.customerProfile.height,
    weight: InitialState.customerProfile.weight,
    shoeSize: InitialState.customerProfile.shoeSize,
    bodyType: InitialState.customerProfile.bodyType,
  };
  state.productMeasures = {
    chestWidth: InitialState.productMeasures.chestWidth,
    waistWidth: InitialState.productMeasures.waistWidth,
    neckToHipHeight: InitialState.productMeasures.neckToHipHeight,
    sleeveLengthShirt: InitialState.productMeasures.sleeveLengthShirt,
    sleeveLengthHoodie: InitialState.productMeasures.sleeveLengthHoodie,
  };
  state.productColors = {
    primaryColor: InitialState.productColors.primaryColor,
    secondColor: InitialState.productColors.secondColor,
  };
};

export const resetShoppingList = (state: ProductInterface) => {
  state.productList = [];
};

export const closeShoppingCart = (state: ProductInterface) => {
  state.openShoppingCart = false;
};

export const openShoppingCart = (state: ProductInterface) => {
  state.openShoppingCart = true;
};

export const toggleShoppingCart = (state: ProductInterface) => {
  state.openShoppingCart = !state.openShoppingCart;
};

export const addProduct = (
  state: ProductInterface,
  payload: ProductConfigInterface
) => {
  state.productList.push(payload);
};

export const removeProduct = (state: ProductInterface, payload: number) => {
  if (payload >= 0 && payload < state.productList.length) {
    state.productList.splice(payload, 1);
  }
};
