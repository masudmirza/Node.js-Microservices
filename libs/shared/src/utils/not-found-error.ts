import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  constructor(errorCode: string) {
    super(404, errorCode);
  }
}
