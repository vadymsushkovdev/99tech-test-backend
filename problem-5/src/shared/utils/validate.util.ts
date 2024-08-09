import { ContextRunner } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errorsResult = [];

    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        const errors = result.array().reduce(
          (acc, error) => {
            if (!acc.path && (error as any)?.path) {
              acc.path = (error as any)?.path;
            }

            acc.messages.push(error.msg);

            return acc;
          },
          { messages: [] } as { path?: string; messages: string[] }
        );

        errorsResult.push(errors);
      }
    }

    if (!isEmpty(errorsResult)) {
      res.status(400).json({ errors: errorsResult });
    } else {
      next();
    }
  };
};
