import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from "./entities/session.entity";
import { Repository } from "typeorm";
import { User } from "@/users/entities/user.entity";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session, "owner")
    private readonly sessionService: Repository<Session>
  ) {}

  async create(user: User) {
    return this.sessionService.save({
      user,
    });
  }
}
