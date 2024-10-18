import { Response } from 'express';

export const sendResponse = (res: Response, statusCode: number, message: string, data: any = {}) => {
  return res.status(statusCode).json({
    status: statusCode < 400 ? 'success' : 'error',
    message,
    data
  });
};
