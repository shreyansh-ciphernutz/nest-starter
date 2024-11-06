"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySubscriber = void 0;
const typeorm_1 = require("typeorm");
const current_user_service_1 = require("../helper/current-user.service");
const common_1 = require("@nestjs/common");
let EntitySubscriber = class EntitySubscriber {
    constructor(connection) {
        this.connection = connection;
    }
    beforeInsert(event) {
        const user = current_user_service_1.CurrentUserService.getUser();
        event.entity.createdBy = user?.id;
    }
    beforeUpdate(event) {
        if (event.entity) {
            event.entity.updatedBy = current_user_service_1.CurrentUserService.getUser()?.id;
        }
    }
};
exports.EntitySubscriber = EntitySubscriber;
exports.EntitySubscriber = EntitySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], EntitySubscriber);
//# sourceMappingURL=entity.subscriber.js.map