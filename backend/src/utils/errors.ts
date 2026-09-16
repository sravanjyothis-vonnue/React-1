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
  constructor(message: string = "authentication failed") {
    super(message, 403, "UNAUTHORIZED");
  }
}

export class BadRequestError extends appError {
  constructor(message: string = "Validation error") {
    super(message, 400, "BAD_REQUEST");
  }
}

export class InvalidLinkError extends appError {
  constructor(message: string = "Link is either invalid or expired") {
    super(message, 404, "NOT_FOUND");
  }
}

export class FailedSearchError extends appError {
  constructor(
    message: string = "Searched Entry is not found in available resources",
  ) {
    super(message, 404, "NOT_FOUND");
  }
}
