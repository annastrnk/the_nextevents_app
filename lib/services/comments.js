import { connectDatabase, getAllDocuments, insertDocument } from "../db";
import { COLLECTIONS } from "../constants";


export async function getCommentsByEventId(eventId) {
  let client;

  try {
    client = await connectDatabase();
    const comments = await getAllDocuments(
      client,
      COLLECTIONS.COMMENTS,
      { _id: -1 },
      { eventId }
    );
    return comments;
  } catch (error) {
    throw new Error(`Failed to get comments: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
}


export async function createComment(commentData) {
  const { email, name, text, eventId } = commentData;

  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address");
  }
  if (!name || name.trim() === "") {
    throw new Error("Name is required");
  }
  if (!text || text.trim() === "") {
    throw new Error("Comment text is required");
  }
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  let client;

  try {
    client = await connectDatabase();
    const newComment = {
      email: email.trim(),
      name: name.trim(),
      text: text.trim(),
      eventId,
    };

    const result = await insertDocument(client, COLLECTIONS.COMMENTS, newComment);
    return {
      ...newComment,
      _id: result.insertedId,
    };
  } catch (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

