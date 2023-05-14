export enum DesignModeEnum {
  TShirt = "t-shirt",
  Hoodie = "hoodie",
}

export interface ShoppingListItemInterface {
  index: number;
  product: string;
  color: string;
  price: number;
}

export interface CustomerRegisterInfoInterface {
  documentNumber: string;
  names: string;
  cellPhoneNumber: string;
  email: string;
  city: string;
  address: string;
}

export interface CustomerRegisterInterface {
  documentNumber: number;
  names: string;
  cellPhoneNumber: number;
  email: string;
  city: string;
  address: string;
}

export interface RatingRegisterInterface {
  comment: string;
  qualification: number;
  owner: string;
}
