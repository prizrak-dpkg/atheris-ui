import { DesignModeEnum } from "@/modules/shared/types";
import { BodyTypeEnum, ProductMeasuresInterface, ColorsEnum } from "../types";

export default () =>
  ({
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
  } as ProductMeasuresInterface);
