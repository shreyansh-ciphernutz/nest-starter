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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const session_service_1 = require("../session/session.service");
let UsersService = class UsersService {
    constructor(userService, ownerService, dataSource, sessionService) {
        this.userService = userService;
        this.ownerService = ownerService;
        this.dataSource = dataSource;
        this.sessionService = sessionService;
    }
    create(createUserDto) {
        return "This action adds a new user";
    }
    async findAll() {
        const data = await this.userService.find();
        return data;
    }
    async login(email, password) {
        await this.dataSource.query("delete from public.session");
        const user = await this.ownerService.findOne({
            where: { email, password },
        });
        console.log("user :>> ", user);
        const session = await this.sessionService.create(user);
        console.log(session, "session ******");
        console.log("session.id :>> ", session.id);
        const setjwt = await this.dataSource.query(`select set_config('jwt.claims.session_id', '${session.id}', false)`);
        console.log("setjwt :>> ", setjwt);
        const result = await this.dataSource.query(`SELECT current_session_id()`);
        const currUser = await this.dataSource.query(`SELECT current_user_id()`);
        console.log("jwtclaim set**************", result);
        console.log("currUser************ :>> ", currUser);
        return user;
    }
    async findOne(id) {
        const currentUserCheck = await this.dataSource.query(`
    SELECT *
    FROM pg_roles
    WHERE rolname = current_user;
    `);
        console.log(currentUserCheck, "currentUserCheck******");
        const result = await this.dataSource.query(`SELECT current_session_id()`);
        console.log("result**************", result);
        return this.userService.findOne({ where: { id } });
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User, "owner")),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        session_service_1.SessionService])
], UsersService);
//# sourceMappingURL=users.service.js.map