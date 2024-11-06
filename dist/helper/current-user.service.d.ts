import { User } from '../users/entities/user.entity';
export declare class CurrentUserService {
    static user: User;
    static setUser(user: User): void;
    static getUser(): User;
}
