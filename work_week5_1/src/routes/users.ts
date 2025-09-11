// นำเข้า Router, Request, Response จาก express
import { Router, Request, Response } from "express";
import { upload } from "../utils/uploads";
// นำเข้า userModel สำหรับจัดการข้อมูลผู้ใช้
import userModel from "../models/userModel";

// สร้าง Router สำหรับจัดการเส้นทางเกี่ยวกับผู้ใช้
const router = Router();
import { verifyToken } from "../middlewares/auth";

/**
 * GET /user/name
 * ดึง fname และ lname ของผู้ใช้ทั้งหมด
 */
router.get("/user/name/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid ID" });
  }
  const user = await userModel.getUserById(id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  res.status(200).json({ status: "ok", data: { fname: user.us_fname, lname: user.us_lname } });
});

/**
 * GET /users2
 * ดึงข้อมูลผู้ใช้ทั้งหมด พร้อม URL รูปภาพ
 */
router.get("/users2", async (req: Request, res: Response) => {
  const users = await userModel.getUserAll();
  // เพิ่ม url รูปภาพให้แต่ละ user
  const usersWithAvatar = users.map((user: any) => ({
    ...user,
    avatar_url: user.us_avatar ? `${req.protocol}://${req.get('host')}/file/${user.us_avatar}` : null
  }));
  res.status(200).json({ status: "ok", data: usersWithAvatar });
});

/**
 * POST /users
 * สร้างผู้ใช้ใหม่
 */
router.post("/users", upload.single("us_avatar"), async (req: Request, res: Response) => {
  const { us_tit_id, us_fname, us_lname, us_username, us_password } = req.body;
  let us_avatar = null;
  if (req.file) {
    us_avatar = req.file.filename;
  }
  if (!us_username || !us_password) {
    return res.status(400).json({ status: "error", message: "Username and password are required" });
  }
  // เช็ค username ซ้ำ
  const isExists = await userModel.isUsernameExists(us_username);
  if (isExists) {
    return res.status(409).json({ status: "error", message: "Username already exists" });
  }
  
  const result = await userModel.createUser({ us_tit_id, us_fname, us_lname, us_avatar, us_username, us_password });
  res.status(201).json({ status: "ok", insertId: result.insertId });
});

// หลังจากนี้ทุก route จะถูกตรวจสอบ token
router.use(verifyToken);

/**
 * GET /users
 * ดึงข้อมูลผู้ใช้ทั้งหมด พร้อมชื่อคำนำหน้า
 */
/*
Login ก่อน

ส่ง POST ไปที่ /login พร้อมข้อมูล username และ password
รับ token จาก response
เรียก GET /users

สร้าง request แบบ GET ไปที่ http://localhost:3000/users ใน Postman
ที่แท็บ Headers ให้เพิ่ม
Key: Authorization
Value: Bearer <token> (แทนที่ <token> ด้วย token ที่ได้จาก login)
กด Send

ถ้า token ถูกต้อง จะได้ข้อมูลผู้ใช้ทั้งหมด
ถ้าไม่มีหรือ token ไม่ถูกต้อง จะถูกปฏิเสธ
*/
router.get("/users", async (req: Request, res: Response) => {
  const users = await userModel.getUserAll();
  res.status(200).json({ status: "ok", data: users });
});

/**
 * GET /users/:id
 * ดึงข้อมูลผู้ใช้ตาม id พร้อมชื่อคำนำหน้า
 */
router.get("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid ID" });
  }
  const user = await userModel.getUserById(id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  res.json({ status: "ok", data: user });
});


/**
 * PUT /users/:id
 * อัปเดตข้อมูลผู้ใช้ตาม id
 */
router.put("/users/:id", upload.single("us_avatar"), async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid ID" });
  }
  const user = await userModel.getUserById(id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  // กรองเฉพาะ field ที่อนุญาตให้แก้ไข
  const allowedFields = ["us_tit_id", "us_fname", "us_lname", "us_avatar", "us_username", "us_password"];
  const updateData: any = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      updateData[key] = req.body[key];
    }
  }
  if (req.file) {
    updateData.us_avatar = req.file.filename;
  }
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ status: "error", message: "No fields to update" });
  }
  const result = await userModel.updateUser(id, updateData);
  res.json({ status: "ok", affectedRows: result.affectedRows });
});

/**
 * DELETE /users/:id
 * ลบผู้ใช้ตาม id
 */
router.delete("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid ID" });
  }
  const user = await userModel.getUserById(id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  const result = await userModel.deleteUser(id);
  res.json({ status: "ok", affectedRows: result.affectedRows });
});

// ส่งออก router เพื่อใช้ใน main.ts
export default router;
