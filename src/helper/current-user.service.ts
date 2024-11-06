import { User } from '../users/entities/user.entity';

export class CurrentUserService {
  static user: User;
  static setUser(user: User) {
    this.user = user;
  }
  static getUser(): User {
    return this.user;
  }
}
