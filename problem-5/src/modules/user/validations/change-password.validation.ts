import { body, ContextRunner } from 'express-validator';

export const changePasswordValidation: ContextRunner[] = [
  body('oldPassword').isString(),
  body('newPassword')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
];
