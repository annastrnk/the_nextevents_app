import { getCommentsByEventId, createComment } from "../../../lib/services/comments";

async function handler(req, res) {
  const { eventId } = req.query;

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  if (req.method === "GET") {
    try {
      const comments = await getCommentsByEventId(eventId);
      return res.status(200).json({ comments });
    } catch (error) {
      console.error("Error getting comments:", error);
      return res.status(500).json({
        message: "Failed to get comments",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { email, name, text } = req.body;
      const comment = await createComment({ email, name, text, eventId });
      return res.status(201).json({
        message: "Comment added successfully",
        comment,
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      const statusCode = error.message.includes("Invalid") || error.message.includes("required") ? 422 : 500;
      return res.status(statusCode).json({
        message: error.message || "Failed to create comment",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default handler;
