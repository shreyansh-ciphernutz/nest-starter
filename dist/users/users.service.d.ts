import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { SessionService } from "@/session/session.service";
export declare class UsersService {
    private readonly userService;
    private readonly ownerService;
    private dataSource;
    private readonly sessionService;
    constructor(userService: Repository<User>, ownerService: Repository<User>, dataSource: DataSource, sessionService: SessionService);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<User[]>;
    login(email: string, password: string): Promise<User>;
    findOne(id: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
