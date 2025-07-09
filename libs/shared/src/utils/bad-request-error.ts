import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  constructor(errorCode: string) {
    super(400, errorCode);
  }
}
