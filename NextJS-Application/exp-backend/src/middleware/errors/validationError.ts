import { AppError } from './appError';

export class ValidationError extends AppError {
  constructor(public errors: string[]) {
    super('Validation Error', 422); // 422 Unprocessable Entity
  }

  serializeErrors() {
    return {
      message: this.message,
      errors: this.errors,
    };
  }
}
