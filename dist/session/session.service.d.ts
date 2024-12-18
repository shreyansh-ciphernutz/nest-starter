import { Session } from "./entities/session.entity";
import { Repository } from "typeorm";
import { User } from "@/users/entities/user.entity";
export declare class SessionService {
    private readonly sessionService;
    constructor(sessionService: Repository<Session>);
    create(user: User): Promise<{
        user: User;
    } & Session>;
}
