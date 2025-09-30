import { MongoClient } from "mongodb";

export async function connectDataBase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export async function inserDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const documents = await db.collection(collection).find(filter).sort(sort).toArray();

  return documents;
}
