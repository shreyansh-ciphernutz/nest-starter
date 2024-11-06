"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserService = void 0;
class CurrentUserService {
    static setUser(user) {
        this.user = user;
    }
    static getUser() {
        return this.user;
    }
}
exports.CurrentUserService = CurrentUserService;
//# sourceMappingURL=current-user.service.js.map