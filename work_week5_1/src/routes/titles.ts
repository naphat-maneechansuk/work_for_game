import { Router, type Request, type Response } from "express";
import titleModel from "../models/titleModel";


const router = Router();



/**
 * Login ก่อน
ส่ง POST ไปที่ /login พร้อมข้อมูล username และ password
รับ token จาก response
เรียก GET /titles

สร้าง request แบบ GET ไปที่ http://localhost:3000/titles ใน Postman
ที่แท็บ Headers ให้เพิ่ม
Key: Authorization
Value: Bearer <token> (แทนที่ <token> ด้วย token ที่ได้จาก login)
กด Send

ถ้า token ถูกต้อง จะได้ข้อมูล title
ถ้าไม่มีหรือ token ไม่ถูกต้อง จะถูกปฏิเสธ
 */
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
    if (result && result.length > 0) {
        res.json({ status: 'ok', data: result[0] });
    } else {
        res.status(404).json({ status: 'error', message: 'Title not found' });
    }
});



router.post("/title", async (req: Request, res: Response) => {
    const { id, name } = req.body;
    if (!id || !name) {
        res.status(400).json({ status: 'error', message: 'ID and Name are required' });
        return;
    }
    // เช็ค id ซ้ำ
    const result = await titleModel.getTitleById(id);
    if (result && result.length > 0) {
        res.status(409).json({ status: 'error', message: 'ID already exists' });
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
    // เช็คก่อนว่ามี title นี้ไหม
    const result = await titleModel.getTitleById(id);
    if (!result || result.length === 0) {
        res.status(404).json({ status: 'error', message: 'Title not found' });
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
    // เช็คก่อนว่ามี title นี้ไหม
    const result = await titleModel.getTitleById(id);
    if (!result || result.length === 0) {
        res.status(404).json({ status: 'error', message: 'Title not found' });
        return;
    }
    await titleModel.deleteTitle(id);
    res.json({ status: 'ok', message: 'Title deleted successfully' });
});

export default router;