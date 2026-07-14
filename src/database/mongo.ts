import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI ?? process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB_NAME ?? 'birthday_bot';

let client: MongoClient | null = null;

export async function connectToMongo() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client.db(dbName);
}

export async function closeMongo(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}
