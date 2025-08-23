import "dotenv/config";
import  express,{type Express, type Request, type Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    console.log("GET request received");
  res.send("Hello World!");
});

app.get("/:id", (req: Request, res: Response) => {
    console.log("GET request received");
    let id = req.params.id;
    console.log(`ID: ${id}`);
  res.send(`Hello World! Your ID is ${id}`);
});

app.post("/", (req: Request, res: Response) => {
  res.send("Hello Post!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});