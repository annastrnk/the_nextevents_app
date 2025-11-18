import { connectDatabase, insertDocument } from "../db";
import { COLLECTIONS } from "../constants";


export async function subscribeToNewsletter(email) {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  let client;

  try {
    client = await connectDatabase();
    const result = await insertDocument(client, COLLECTIONS.NEWSLETTER, { 
      email: email.trim() 
    });
    return {
      email: email.trim(),
      _id: result.insertedId,
    };
  } catch (error) {
    throw new Error(`Failed to subscribe to newsletter: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

