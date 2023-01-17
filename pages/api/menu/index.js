import connectMongo from "../../../database/connection";
import {
  createMenu,
  getMenus,
} from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  // GET users
  const { method } = req;

  switch (method) {
    case "GET":
      getMenus(req, res);
      break;
    case "POST":
      createMenu(req, res);
      break;

    default:
      res.setHeader(
        "Allow",
        ["GET", "POST", "DELETE", "PATCH"],
        "Content-Type",
        "application/json"
      );
      res.status(405).end(`method ${method} Not allowed`);
  }
}
