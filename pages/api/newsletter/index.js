import { subscribeToNewsletter } from "../../../lib/services/newsletter";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email } = req.body;
    await subscribeToNewsletter(email);
    return res.status(201).json({ message: "Successfully subscribed to newsletter!" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    const statusCode = error.message.includes("Invalid") ? 422 : 500;
    return res.status(statusCode).json({
      message: error.message || "Failed to subscribe",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

export default handler;
