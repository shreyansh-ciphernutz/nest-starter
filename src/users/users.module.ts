import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

import { SessionModule } from "@/session/session.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([User], "owner"),
    SessionModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
