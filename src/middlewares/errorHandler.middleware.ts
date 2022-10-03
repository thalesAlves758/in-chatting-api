import { NextFunction, Request, Response } from 'express';
import { HttpErrorType, HttpException, HttpStatus } from '../types/http.types';

function getStatusCodeByErrorType(errorType: HttpErrorType): HttpStatus {
  let status: HttpStatus;

  switch (errorType) {
    case HttpErrorType.BAD_REQUEST:
      status = HttpStatus.BAD_REQUEST;
      break;

    case HttpErrorType.UNAUTHORIZED:
      status = HttpStatus.UNAUTHORIZED;
      break;

    case HttpErrorType.NOT_FOUND:
      status = HttpStatus.NOT_FOUND;
      break;

    case HttpErrorType.CONFLICT:
      status = HttpStatus.CONFLICT;
      break;

    case HttpErrorType.UNPROCESSABLE_ENTITY:
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      break;

    case HttpErrorType.INTERNAL_SERVER_ERROR:
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      break;
  }

  return status;
}

function errorHandler(
  error: HttpException | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type) {
    const status: HttpStatus = getStatusCodeByErrorType(error.type);

    return res.status(status).send(error.message);
  }

  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send(error.message ?? HttpErrorType.INTERNAL_SERVER_ERROR);
}

export default errorHandler;
