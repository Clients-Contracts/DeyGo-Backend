import { v4 as uuidv4 } from 'uuid';

// Generate a unique ID
export const generateUniqueId = (): string => {
  return uuidv4();
};

// Standardize API responses
export const formatResponse = (status: string, data: any, message?: string) => {
  return {
    status,
    data,
    message,
  };
};

// Centralized Error Handler
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
