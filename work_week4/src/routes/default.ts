// import express from "express";
import { Router, type Request, type Response } from "express";

// const router = express.Router();
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

export default router;