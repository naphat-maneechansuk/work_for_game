import { Router, type Request, type Response } from "express";
import titleModel from "../models/titleModel";

const router = Router();

router.get("/titles", async (req: Request, res: Response) => {
    let result = await titleModel.getTitleAll();
    if (result.length > 0) {
        res.json({ status: 'ok', data: result[0] });
    } else {
        res.json({ status: 'error', data: [] });
    }

});

router.get("/title/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ status: 'error', message: 'Invalid ID' });
        return;
    }
    let result = await titleModel.getTitleById(id);
    if (result.length > 0) {
        res.json({ status: 'ok', data: result[0] });
    } else {
        res.json({ status: 'error', data: [] });
    }
});

router.post("/title", async (req: Request, res: Response) => {
    const { id, name } = req.body;
    if (!id || !name) {
        res.status(400).json({ status: 'error', message: 'ID and Name are required' });
        return;
    }
    await titleModel.postTitle(id, name);
    res.json({ status: 'ok', message: 'Title added successfully' });
});

router.put("/title/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (isNaN(id)) {
        res.status(400).json({ status: 'error', message: 'Invalid ID' });
        return;
    }
    if (!name) {
        res.status(400).json({ status: 'error', message: 'Name is required' });
        return;
    }
    await titleModel.updateTitle(id, name);
    res.json({ status: 'ok', message: 'Title updated successfully' });
});

router.delete("/title/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ status: 'error', message: 'Invalid ID' });
        return;
    }
    await titleModel.deleteTitle(id);
    res.json({ status: 'ok', message: 'Title deleted successfully' });
});

export default router;