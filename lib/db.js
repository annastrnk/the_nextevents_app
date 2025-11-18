import { MongoClient, ObjectId } from "mongodb";


export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}

export function getDatabase(client) {
  return client.db();
}

export async function insertDocument(client, collection, document) {
  const db = getDatabase(client);
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort = {}, filter = {}) {
  const db = getDatabase(client);
  const documents = await db.collection(collection).find(filter).sort(sort).toArray();
  return documents;
}

export async function getDocumentById(client, collection, id) {
  const db = getDatabase(client);
  
  try {
    const objectId = ObjectId.createFromHexString(id);
    const document = await db.collection(collection).findOne({ _id: objectId });
    return document;
  } catch (error) {
    return null;
  }
}

