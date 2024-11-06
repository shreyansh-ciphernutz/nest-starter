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
    const getData = await this.dataSource.query(`
      SELECT *
      FROM public.user
      `);
    console.log(getData, "DATA  ******");

    return `This action returns all users`;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOne({ where: { email, password } });
    const session = await this.sessionService.create(user);
    console.log(session, "session ******");

    await this.dataSource.query(
      `select set_config('jwt.session_id', '${session.id}', false)`
    );
  }
  async findOne(id: string) {
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
