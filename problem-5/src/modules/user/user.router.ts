import { Router } from 'express';

import { validate } from '@src/shared/utils/validate.util';
import {
  changePassword,
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
} from '@src/modules/user/user.service';
import { asyncHandler } from '@src/shared/utils/ async-handler.util';
import { createUserValidation } from '@src/modules/user/validations/create-user.validation';
import { changePasswordValidation } from '@src/modules/user/validations/change-password.validation';
import { idValidation } from '@src/modules/user/validations/id.validation';

export const userRouter: Router = Router();

userRouter.post(
  '/',
  validate(createUserValidation),
  asyncHandler(async (req, res) => {
    await createUser(req.body);

    res.status(200).json({ message: 'User successfully created' });
  })
);

userRouter.get(
  '/',
  asyncHandler(async (_, res) => {
    const users = await findAllUsers();

    res.status(200).json({ users });
  })
);

userRouter.get(
  '/:id',
  validate(idValidation),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await findUserById(Number(id));

    res.status(200).json({ user });
  })
);

userRouter.patch(
  '/password',
  validate(changePasswordValidation),
  asyncHandler(async (req, res) => {
    await changePassword(req.body);

    res
      .status(200)
      .json({ message: 'Password successfully changed' });
  })
);

userRouter.delete(
  '/:id',
  validate(idValidation),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await deleteUser(Number(id));

    res.status(200).json({ message: 'User successfully deleted' });
  })
);
