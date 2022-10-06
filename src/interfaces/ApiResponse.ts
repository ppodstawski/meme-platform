export interface IFlashMessage {
  result: string;
  message: string;
}

export interface IApiResponse {
  ok: boolean;
  status: number;
  flash: IFlashMessage;
  body?: any;
}
