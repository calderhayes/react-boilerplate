export enum HTTPStatusCode {
  OK = 200,
  MULTIPLE_CHOICES = 300,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422
}

export type FetchMethod = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
