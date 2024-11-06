import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../base/base.entity';
export declare class Session extends BaseEntity {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    user: User;
}
