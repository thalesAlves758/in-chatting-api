import { HttpErrorType } from '../types/http.types';

export function badRequestError(message?: string) {
  return {
    type: HttpErrorType.BAD_REQUEST,
    message: message ?? HttpErrorType.BAD_REQUEST,
  };
}

export function unauthorizedError(message?: string) {
  return {
    type: HttpErrorType.UNAUTHORIZED,
    message: message ?? HttpErrorType.UNAUTHORIZED,
  };
}

export function notFoundError(message?: string) {
  return {
    type: HttpErrorType.NOT_FOUND,
    message: message ?? HttpErrorType.NOT_FOUND,
  };
}

export function conflictError(message?: string) {
  return {
    type: HttpErrorType.CONFLICT,
    message: message ?? HttpErrorType.CONFLICT,
  };
}

export function unprocessableEntityError(message?: string) {
  return {
    type: HttpErrorType.UNPROCESSABLE_ENTITY,
    message: message ?? HttpErrorType.UNPROCESSABLE_ENTITY,
  };
}

export function internalServerError(message?: string) {
  return {
    type: HttpErrorType.INTERNAL_SERVER_ERROR,
    message: message ?? HttpErrorType.INTERNAL_SERVER_ERROR,
  };
}
