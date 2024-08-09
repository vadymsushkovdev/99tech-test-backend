import { ContextRunner, param } from 'express-validator';

export const idValidation: ContextRunner[] = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
];
