import { DesignModeEnum } from "@/modules/shared/types";
import { BodyTypeEnum, ProductMeasuresInterface } from "../types";

export const setProductMeasures = (
  state: ProductMeasuresInterface,
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
  state: ProductMeasuresInterface,
  payload: ProductMeasuresInterface["customerProfile"]
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
  state: ProductMeasuresInterface,
  payload: ProductMeasuresInterface["mode"]
) => {
  state.mode = payload ? payload : state.mode;
};

export const setColors = (
  state: ProductMeasuresInterface,
  payload: ProductMeasuresInterface["productColors"]
) => {
  console.log(payload);
  state.productColors = payload ? payload : state.productColors;
};
