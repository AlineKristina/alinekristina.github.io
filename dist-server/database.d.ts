import { Db, Collection } from 'mongodb';
declare class Database {
    private client;
    private db;
    constructor();
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getDb(): Db;
    getCollection(name: string): Collection;
    ping(): Promise<boolean>;
}
declare const _default: Database;
export default _default;
