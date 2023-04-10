export interface OptionInterface {
  value: string;
  label: string;
}
export interface OtpInterface {
  otp: string;
  hash: string;
}

export interface UserRegisterInfoInterface {
  documentType: string;
  documentNumber: string;
  names: string;
  surnames: string;
  genre: string;
  dateOfBirth: string;
  email: string;
  cellPhoneNumber: string;
  address: string;
  neighborhood: string;
  generalScope: string;
}

export interface UserRegisterInterface {
  documentType: OptionInterface;
  documentNumber: string;
  names: string;
  surnames: string;
  genre: OptionInterface;
  dateOfBirth: string;
  email: string;
  cellPhoneNumber: string;
  address: string;
  neighborhood: OptionInterface;
  hash?: string;
}
