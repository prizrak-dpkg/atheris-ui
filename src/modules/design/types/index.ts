import { DesignModeEnum } from "@/modules/shared/types";

export enum BodyTypeEnum {
  WIDER = 1,
  SAME = 2,
  NARROWER = 3,
}

export enum ColorsEnum {
  BLACK = "black",
  GOLD = "gold",
  GRAY = "gray",
  NAVY_BLUE = "navy_blue",
  RED = "red",
  WHITE = "white",
}

export interface CustomerProfileInterface {
  age: number;
  height: number;
  weight: number;
  shoeSize: number;
  bodyType: BodyTypeEnum;
}

export interface MeasuresInterface {
  chestWidth: number;
  waistWidth: number;
  neckToHipHeight: number;
  sleeveLengthShirt: number;
  sleeveLengthHoodie: number;
  primaryColor: ColorsEnum;
  secondColor: ColorsEnum;
}

export interface ColorsInterface {
  primaryColor: ColorsEnum;
  secondColor: ColorsEnum;
}

export interface ProductMeasuresInterface {
  mode: DesignModeEnum;
  customerProfile: CustomerProfileInterface;
  productMeasures: MeasuresInterface;
  productColors: ColorsInterface;
}
