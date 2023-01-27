import connectMongo from "@/database/connection";
import Users from "@/database/model/user";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // only post requests
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "No user data present" });
    }

    const { username, email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    //   check if user already exists
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }

    //   create new user
    const newUser = await Users.create({
      username,
      email,
      password: await hash(password, 16),
    });
    res.status(201).json({ success: true, data: newUser });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
