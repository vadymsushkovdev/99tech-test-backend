import { Express, Router } from 'express';

import { userRouter } from '@src/modules/user/user.router';

export const routers: Array<{ path: string; router: Router }> = [
  { path: '/user', router: userRouter },
];

export const applyRoutes = (app: Express) => {
  routers.forEach(({ path, router }) => app.use(path, router));
};
