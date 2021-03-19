export default class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static internal(msg) {
    return new ApiError(500, msg);
  }

  static notAuthorized(msg) {
    return new ApiError(403, msg);
  }

  static notAuthenticated(msg) {
    return new ApiError(401, msg);
  }
}
