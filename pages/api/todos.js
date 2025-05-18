import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in" });
  }

  const user = User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user doesn't exist" });
  }

  if (req.method === "POST") {
    const { title, status } = req.body;
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data" });
    }
  }

  user.todos.push({ title, status });
  user.save();

  res.status(201).json({ status: "success", message: "Todo created" });
}
