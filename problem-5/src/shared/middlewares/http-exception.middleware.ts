import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@src/shared/exception/http-exception';

export const httpExceptionMiddleware = (
  err: Error | HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err instanceof HttpException ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};
