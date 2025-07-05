export default class CustomResponse<T> {
  statusCode: number;
  data: T | T[];

  constructor(statusCode: number, data: T | T[]) {
    this.statusCode = statusCode;
    this.data = data;
  }
}
