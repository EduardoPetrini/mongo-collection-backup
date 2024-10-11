import { Db, Document, MongoClient } from 'mongodb';

export class MongoConn {
  private conn: MongoClient;
  private db: Db;
  constructor(conn: MongoClient, dbname: string) {
    this.conn = conn;
    this.db = conn.db(dbname);
  }

  static async getMongoConnection(url: string, dbname: string) {
    const client = new MongoClient(url);
    await client.connect();

    return new MongoConn(client, dbname);
  }

  getReadStream(collection: string) {
    return this.db.collection(collection).find().stream();
  }

  writeData(doc: Document, collection: string) {
    return this.db.collection(collection).insertOne(doc);
  }
}
