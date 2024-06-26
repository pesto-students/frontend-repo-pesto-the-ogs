export interface IApiFailureResponse {
  errorMessage: string;
  errorCode: number;
}

export interface IObject {
  [key: string]: any;
}

export interface INavItem {
  label: string;
  linkTo: string;
  inSameTab: boolean;
}
