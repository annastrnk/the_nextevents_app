const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });

const SEED_EVENTS = [
  {
    title: "Programming for everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },
  {
    title: "Networking for introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "images/introvert-event.jpg",
    isFeatured: true,
  },
  {
    title: "Networking for extroverts",
    description:
      "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "images/extrovert-event.jpg",
    isFeatured: true,
  },
];

const COLLECTIONS = {
  EVENTS: "events",
};

async function seedEvents() {
  if (!process.env.MONGODB_URI) {
    console.error(" MONGODB_URI is not set in .env.local");
    process.exit(1);
  }

  let client;

  try {
    console.log("🔌 Connecting to MongoDB...");
    client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const db = client.db();
    const eventsCollection = db.collection(COLLECTIONS.EVENTS);

    const existingEvents = await eventsCollection.countDocuments();
    if (existingEvents > 0) {
      console.log(`Found ${existingEvents} existing events. Clearing collection...`);
      await eventsCollection.deleteMany({});
    }

    console.log("Inserting events...");
    const results = [];
    for (const event of SEED_EVENTS) {
      const result = await eventsCollection.insertOne(event);
      results.push(result);
    }
    console.log(`Successfully inserted ${results.length} events`);

    const count = await eventsCollection.countDocuments();
    console.log(`Total events in database: ${count}`);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("Connection closed");
    }
  }
}

seedEvents();
