class ApiError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}

export {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError
};