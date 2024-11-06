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
    constructor(userService, dataSource, sessionService) {
        this.userService = userService;
        this.dataSource = dataSource;
        this.sessionService = sessionService;
    }
    create(createUserDto) {
        return "This action adds a new user";
    }
    async findAll() {
        const currentUserCheck = await this.dataSource.query(`
      SELECT *
      FROM pg_roles
      WHERE rolname = current_user;
      
      `);
        console.log(currentUserCheck, "currentUserCheck******");
        const getData = await this.dataSource.query(`
      SELECT *
      FROM public.user
      `);
        console.log(getData, "DATA  ******");
        return `This action returns all users`;
    }
    async login(email, password) {
        const user = await this.userService.findOne({ where: { email, password } });
        const session = await this.sessionService.create(user);
        console.log(session, "session ******");
        await this.dataSource.query(`select set_config('jwt.session_id', '${session.id}', false)`);
    }
    async findOne(id) {
        const currentUserCheck = await this.dataSource.query(`
    SELECT *
    FROM pg_roles
    WHERE rolname = current_user;
    
    `);
        console.log(currentUserCheck, "currentUserCheck******");
        const check = await this.dataSource.query(`
    -- Set the session ID
SELECT set_config('jwt.session_id', '1074217a-8ec8-46e9-b0b6-8c398864c7e9', false);

-- Raise the current user ID
DO $$
DECLARE
    current_id uuid;  -- Variable to hold current user ID
    user_record RECORD;  -- Record variable to hold user data
    test_user public."user";  -- Record variable to hold test user data
    -- give postgres user type below variable
    current_test_user text ;  -- current user
BEGIN
    -- Get the current user ID
    SELECT current_user_id() INTO current_id;

    select current_user into current_test_user;
    RAISE exception 'Current User ID: %', current_test_user;
    -- Raise a notice to show the current user ID
     RAISE exception 'Current User ID: %', select current_user;
    select * from public."user" where id = 'a637a11a-d602-4557-b23d-7f129d5946bb' into test_user;
    RAISE exception 'Current User get or not : %', test_user;
    

    -- Fetch the user list
    -- RAISE exception 'User List:';
    
    FOR user_record IN SELECT * FROM public."user" ORDER BY id LOOP
        RAISE exception 'User ID: %, Email: %, Name: %', user_record.id, user_record.email, user_record.name;
    END LOOP;
END $$;

-- Additionally, you can run the current_user_id() separately to see its value
SELECT current_user_id();

    `);
        console.log(check, "check ********");
        const user = await this.dataSource.query(`select current_user_id()`);
        console.log(user, "suer*****");
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
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        session_service_1.SessionService])
], UsersService);
//# sourceMappingURL=users.service.js.map