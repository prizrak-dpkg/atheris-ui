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
}

export interface ColorsInterface {
  primaryColor: ColorsEnum;
  secondColor: ColorsEnum;
}

export interface ProductConfigInterface {
  mode: DesignModeEnum;
  customerProfile: CustomerProfileInterface;
  productMeasures: MeasuresInterface;
  productColors: ColorsInterface;
}

export interface ProductListInterface {
  primaryColor: string;
  secondColor: string;
  chestWidth: number;
  waistWidth: number;
  neckToHipHeight: number;
  sleeveLengthShirt: number;
  sleeveLengthHoodie: number;
  age: number;
  height: number;
  weight: number;
  shoeSize: number;
  bodyType: number;
}

export interface ProductInterface extends ProductConfigInterface {
  openShoppingCart: boolean;
  productList: ProductConfigInterface[];
}
