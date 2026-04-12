export class ResponseError extends Error {

  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }

  public static badRequest(message: string) {
    return new ResponseError(400, message);
  }

  public static unauthorized(message: string) {
    return new ResponseError(401, message);
  }

  public static forbidden(message: string) {
    return new ResponseError(401, message);
  }

  public static notFound(message: string) {
    return new ResponseError(404, message);
  }

  public static internalServerError(message: string = 'Internal server error') {
    return new ResponseError(500, message);
  }
}
