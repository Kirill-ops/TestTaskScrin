import { ApiErrorCode } from '.';

class ApiError extends Error {
  readonly code: ApiErrorCode;

  constructor(code: ApiErrorCode, message?: string) {
    super(message);

    this.code = code;
  }
}

export default ApiError;
