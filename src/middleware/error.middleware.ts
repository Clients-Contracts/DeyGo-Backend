import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/helpers';
import logger from '../utils/logger';

export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message,
  });
};
