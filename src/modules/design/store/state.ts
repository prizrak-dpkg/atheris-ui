import { DesignModeEnum } from "@/modules/shared/types";
import { BodyTypeEnum, ProductInterface, ColorsEnum } from "../types";

export const InitialState = {
  mode: DesignModeEnum.TShirt,
  customerProfile: {
    age: 25,
    height: 172,
    weight: 68,
    shoeSize: 42,
    bodyType: BodyTypeEnum.SAME,
  },
  productMeasures: {
    chestWidth: 0.0,
    waistWidth: 0.0,
    neckToHipHeight: 0.0,
    sleeveLengthShirt: 0.0,
    sleeveLengthHoodie: 0.0,
  },
  productColors: {
    primaryColor: ColorsEnum.BLACK,
    secondColor: ColorsEnum.WHITE,
  },
} as ProductInterface;

export default () =>
  ({
    mode: InitialState.mode,
    openShoppingCart: false,
    customerProfile: {
      age: InitialState.customerProfile.age,
      height: InitialState.customerProfile.height,
      weight: InitialState.customerProfile.weight,
      shoeSize: InitialState.customerProfile.shoeSize,
      bodyType: InitialState.customerProfile.bodyType,
    },
    productMeasures: {
      chestWidth: InitialState.productMeasures.chestWidth,
      waistWidth: InitialState.productMeasures.waistWidth,
      neckToHipHeight: InitialState.productMeasures.neckToHipHeight,
      sleeveLengthShirt: InitialState.productMeasures.sleeveLengthShirt,
      sleeveLengthHoodie: InitialState.productMeasures.sleeveLengthHoodie,
    },
    productColors: {
      primaryColor: InitialState.productColors.primaryColor,
      secondColor: InitialState.productColors.secondColor,
    },
    productList: [],
  } as ProductInterface);
