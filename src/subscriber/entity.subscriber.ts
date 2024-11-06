import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { CurrentUserService } from '../helper/current-user.service';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@EventSubscriber()
@Injectable()
export class EntitySubscriber implements EntitySubscriberInterface<User> {
  constructor(private connection: Connection) {}
  beforeInsert(event: InsertEvent<any>) {
    const user = CurrentUserService.getUser();
    event.entity.createdBy = user?.id;
  }
  beforeUpdate(event: UpdateEvent<any>) {
    if (event.entity) {
      event.entity.updatedBy = CurrentUserService.getUser()?.id;
    }
  }
}
