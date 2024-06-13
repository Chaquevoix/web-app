class ApiError {
  code: string;
  message: string;
  reason: string;

  constructor(
    code: string,
    message: string,
    reason: string
  ) {
    this.code = code;
    this.message = message;
    this.reason = reason;
  }
}
