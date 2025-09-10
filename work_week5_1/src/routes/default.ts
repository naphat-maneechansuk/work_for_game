// import express from "express";
// ไฟล์นี้เป็น route หลักของระบบ เช่น upload, login, ตรวจสอบ token
import { Router, type Request, type Response } from "express"; // นำเข้า Router, Request, Response จาก express
import { upload } from "../utils/uploads"; // นำเข้า middleware สำหรับอัปโหลดไฟล์

import { generateToken, checkToken } from "../utils/token"; // ฟังก์ชันเกี่ยวกับ token
import { verifyToken } from "../middlewares/auth"; // middleware ตรวจสอบ token

// const router = express.Router(); // ตัวอย่างการสร้าง router แบบ express
const router = Router(); // สร้าง router แบบ express

// route แสดงข้อความ Hello World
router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});


/**
วิธีทดสอบ upload ไฟล์ด้วย Postman:
เปิด Postman และสร้าง request แบบ POST
ใส่ URL เช่น http://localhost:3000/upload
ไปที่แท็บ Body เลือก form-data
เพิ่ม key ชื่อ image (ต้องตรงกับในโค้ด) และเลือก type เป็น File
เลือกไฟล์ที่ต้องการอัปโหลดจากเครื่อง
กด Send */

// route สำหรับอัปโหลดไฟล์ภาพ
/*
router.post("/upload", verifyToken, upload.single("image"), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }
    res.json({ status: 'ok', filename: req.file.filename });
});
*/
router.post("/upload",upload.single("image"), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }
    res.json({ status: 'ok', filename: req.file.filename });
});


// route สำหรับดึงไฟล์ภาพที่อัปโหลด
router.get("/file/:filename", (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = `uploads/${filename}`;
    res.sendFile(filePath, { root: '.' }, (err) => {
        if (err) { 
            console.error(err);
        }
    });
});

// route สำหรับ login และส่ง token กลับไปให้ผู้ใช้
router.post("/login", (req: Request, res: Response) => {
    let { username, password } = req.body;
    let token = generateToken(username);
    res.json({ status: 'ok', username, password, token });
});

// route สำหรับทดสอบ token ว่าใช้งานได้หรือไม่
router.get('/test-token', verifyToken, (req: Request, res: Response) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    let token = authHeader.split(" ")[1] || ""; // Expect: "Bearer <token>"

    if (checkToken(token)) {
        res.json({ status: 'ok', message: "Token is valid" });
    }else{
        res.json({ status: 'error', message: "Token is invalid" });
    }
});

// ส่งออก router นี้ไปใช้งานใน main.ts
export default router;