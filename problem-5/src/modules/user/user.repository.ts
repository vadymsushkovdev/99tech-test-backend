import { AppDataSource } from '@src/config/database/datasource';
import { User } from '@src/modules/user/user.entity';

export const userRepository = AppDataSource.getRepository(User);
