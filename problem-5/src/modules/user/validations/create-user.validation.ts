import { ContextRunner, body } from 'express-validator';

export const createUserValidation: ContextRunner[] = [
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address'),

  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
];
