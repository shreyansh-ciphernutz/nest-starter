import { Module } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";
import { Session } from "./entities/session.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Session], "owner")],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
