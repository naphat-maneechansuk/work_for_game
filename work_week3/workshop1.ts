import 'dotenv/config';
import express ,{type Express,type Request,type Response} from 'express'

const app : Express = express();
const port = process.env.PORT || 3000;

app.get("/titles", (req: Request, res: Response) => {
  res.send("Hello get!");
});

app.get("/title/:id", (req: Request, res: Response) => {
    let id = req.params.id;
    console.log(`ID: ${id}`);
  res.send(`Hello get! Your ID is ${id}`);
});

app.post("/title", (req: Request, res: Response) => {
  res.send("Hello Post!");
});

app.put('/title/:id', (req: Request, res: Response) => {
    res.send(`Hello put! Your ID is ${req.params.id}`);
});

app.delete('/title/:id', (req: Request, res: Response) => {
    res.send(`Hello delete! Your ID is ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});