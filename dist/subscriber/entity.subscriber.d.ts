import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from '../users/entities/user.entity';
export declare class EntitySubscriber implements EntitySubscriberInterface<User> {
    private connection;
    constructor(connection: Connection);
    beforeInsert(event: InsertEvent<any>): void;
    beforeUpdate(event: UpdateEvent<any>): void;
}
