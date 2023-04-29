import { ProductMeasuresInterface } from "../types";

export const getAge = (state: ProductMeasuresInterface) => {
  return state.customerProfile.age;
};

export const getHeight = (state: ProductMeasuresInterface) => {
  return state.customerProfile.height;
};

export const getWeight = (state: ProductMeasuresInterface) => {
  return state.customerProfile.weight;
};

export const getShoeSize = (state: ProductMeasuresInterface) => {
  return state.customerProfile.shoeSize;
};

export const getBodyType = (state: ProductMeasuresInterface) => {
  return state.customerProfile.bodyType;
};

export const getChestWidth = (state: ProductMeasuresInterface) => {
  return state.productMeasures.chestWidth.toFixed(1);
};

export const getNeckToHipHeight = (state: ProductMeasuresInterface) => {
  return state.productMeasures.neckToHipHeight.toFixed(1);
};

export const getSleeveLengthHoodie = (state: ProductMeasuresInterface) => {
  return state.productMeasures.sleeveLengthHoodie.toFixed(1);
};

export const getSleeveLengthShirt = (state: ProductMeasuresInterface) => {
  return state.productMeasures.sleeveLengthShirt.toFixed(1);
};

export const getWaistWidth = (state: ProductMeasuresInterface) => {
  return state.productMeasures.waistWidth.toFixed(1);
};

export const getPrimaryColor = (state: ProductMeasuresInterface) => {
  return state.productColors.primaryColor;
};

export const getSecondColor = (state: ProductMeasuresInterface) => {
  return state.productColors.secondColor;
};
