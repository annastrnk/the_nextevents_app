import { connectDatabase, insertDocument } from "../../../lib/db";
import { SEED_EVENTS, COLLECTIONS } from "../../../lib/constants";

async function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Seeding is not allowed in production" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  let client;

  try {
    client = await connectDatabase();
    const db = client.db();
    const eventsCollection = db.collection(COLLECTIONS.EVENTS);

    const existingCount = await eventsCollection.countDocuments();
    if (existingCount > 0) {
      await eventsCollection.deleteMany({});
    }

    const results = [];
    for (const event of SEED_EVENTS) {
      const result = await insertDocument(client, COLLECTIONS.EVENTS, event);
      results.push(result);
    }

    return res.status(201).json({
      message: `Successfully seeded ${results.length} events`,
      count: results.length,
    });
  } catch (error) {
    console.error("Error seeding events:", error);
    return res.status(500).json({
      message: "Failed to seed events",
      error: error.message,
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export default handler;
