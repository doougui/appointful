export type HttpResponse<T = undefined> = {
  statusCode: number;
  body: T | undefined | { error: string };
};

export function ok<T = undefined>(dto?: T): HttpResponse<T> {
  return {
    statusCode: 200,
    body: dto,
  };
}

export function created<T = undefined>(dto?: T): HttpResponse<T> {
  return {
    statusCode: 201,
    body: dto,
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  };
}

export function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  };
}

export function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  };
}

export function tooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  };
}

export function fail(error: unknown) {
  console.error(error);

  return {
    statusCode: 500,
    body: {
      error: 'An unexpected error has occurred.',
    },
  };
}
