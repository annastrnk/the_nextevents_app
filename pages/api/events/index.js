import { getAllEvents } from "../../../lib/services/events";

async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const events = await getAllEvents();
    return res.status(200).json({ events });
  } catch (error) {
    console.error("Error getting events:", error);
    return res.status(500).json({
      message: "Failed to get events",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

export default handler;
