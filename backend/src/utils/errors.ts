class appError extends Error {
  public readonly code: number;
  public readonly error: string;
  constructor(message: string, code: number, error: string) {
    super(message);
    this.code = code;
    this.error = error;
  }
}

export class authenticationError extends appError {
  constructor(message: "authentication failed") {
    super(message, 403, "UNAUTHORIZED");
  }
}

export class BadRequestError extends appError {
  constructor(message: "Validation error") {
    super(message, 400, "BAD_REQUEST");
  }
}
