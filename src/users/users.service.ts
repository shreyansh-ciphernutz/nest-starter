import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { SessionService } from "@/session/session.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
    private readonly sessionService: SessionService
  ) {}
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  async findAll() {
    const currentUserCheck = await this.dataSource.query(`
      SELECT *
      FROM pg_roles
      WHERE rolname = current_user;
      `);
    console.log(currentUserCheck, "currentUserCheck******");
    const data = await this.userService.find();
    console.log("data :>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", data);
    return `This action returns all users`;
  }

  async login(email: string, password: string) {
    // TODO: remove this deletion of table data
    await this.dataSource.query("delete from public.session");
    const user = await this.userService.findOne({ where: { email, password } });
    console.log("user :>> ", user);
    const session = await this.sessionService.create(user);
    console.log(session, "session ******");
    console.log("session.id :>> ", session.id);
    const setjwt = await this.dataSource.query(
      `select set_config('jwt.claims.session_id', '${session.id}', false)`
    );
    console.log("setjwt :>> ", setjwt);
    const result = await this.dataSource.query(`SELECT current_session_id()`);
    const currUser = await this.dataSource.query(`SELECT current_user_id()`);
    console.log("jwtclaim set**************", result);
    console.log("currUser************ :>> ", currUser);
    return user;
  }

  async findOne(id: string) {
    const currentUserCheck = await this.dataSource.query(`
    SELECT *
    FROM pg_roles
    WHERE rolname = current_user;
    `);
    console.log(currentUserCheck, "currentUserCheck******");
    const result = await this.dataSource.query(`SELECT current_session_id()`);

    console.log("result**************", result);

    // return "chalra he bhai chalra he"
    return this.userService.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
